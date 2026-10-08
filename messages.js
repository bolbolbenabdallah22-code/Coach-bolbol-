/* =========================================================
   COACH BOLBOL — MESSAGES
   ========================================================= */

(function () {

  "use strict";


  const LOCAL_KEY = "coach_bolbol_messages";


  /* =======================================================
     LOCAL HELPERS
     ======================================================= */

  function getLocalMessages() {

    try {

      const data =
        localStorage.getItem(LOCAL_KEY);

      return data
        ? JSON.parse(data)
        : [];

    } catch (error) {

      return [];

    }

  }


  function saveLocalMessages(messages) {

    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify(messages)
    );

  }


  /* =======================================================
     GET CURRENT USER
     ======================================================= */

  async function getUser() {

    if (!window.CoachBolbolAuth) {
      return null;
    }

    return await
      window.CoachBolbolAuth.getCurrentUser();

  }


  /* =======================================================
     SEND MESSAGE
     ======================================================= */

  async function sendMessage(
    receiverId,
    message,
    type = "text"
  ) {

    if (!message || !message.trim()) {

      return {
        success: false,
        error: "Message cannot be empty."
      };

    }


    const user =
      await getUser();


    /* -----------------------------------------------------
       CLOUD
       ----------------------------------------------------- */

    if (
      user &&
      window.CoachBolbolSupabase
    ) {

      const client =
        window.CoachBolbolSupabase.getClient();


      if (client) {

        try {

          const {
            data,
            error
          } = await client
            .from("messages")
            .insert({

              sender_id:
                user.id,

              receiver_id:
                receiverId,

              message:
                message.trim(),

              message_type:
                type

            })
            .select()
            .single();


          if (!error) {

            return {

              success: true,

              data

            };

          }

        } catch (error) {

          console.warn(
            "Cloud message failed:",
            error
          );

        }

      }

    }


    /* -----------------------------------------------------
       LOCAL FALLBACK
       ----------------------------------------------------- */

    const messages =
      getLocalMessages();


    const newMessage = {

      id:
        "local_" +
        Date.now(),

      sender_id:
        user?.id || "local_user",

      receiver_id:
        receiverId || "coach",

      message:
        message.trim(),

      message_type:
        type,

      read:
        false,

      created_at:
        new Date().toISOString()

    };


    messages.push(
      newMessage
    );


    saveLocalMessages(
      messages
    );


    return {

      success: true,

      data:
        newMessage,

      local: true

    };

  }


  /* =======================================================
     GET CONVERSATION
     ======================================================= */

  async function getConversation(
    otherUserId
  ) {

    const user =
      await getUser();


    /* -----------------------------------------------------
       CLOUD
       ----------------------------------------------------- */

    if (
      user &&
      otherUserId &&
      window.CoachBolbolSupabase
    ) {

      const client =
        window.CoachBolbolSupabase.getClient();


      if (client) {

        try {

          const {
            data,
            error
          } = await client
            .from("messages")
            .select("*")
            .or(
              "and(sender_id.eq." +
              user.id +
              ",receiver_id.eq." +
              otherUserId +
              ")," +
              "and(sender_id.eq." +
              otherUserId +
              ",receiver_id.eq." +
              user.id +
              ")"
            )
            .order(
              "created_at",
              {
                ascending: true
              }
            );


          if (!error) {

            return data || [];

          }

        } catch (error) {

          console.warn(
            "Cloud conversation failed:",
            error
          );

        }

      }

    }


    /* -----------------------------------------------------
       LOCAL
       ----------------------------------------------------- */

    const messages =
      getLocalMessages();


    if (!user) {

      return messages;

    }


    return messages.filter(
      item =>

        (
          item.sender_id === user.id &&
          item.receiver_id === otherUserId
        )

        ||

        (
          item.sender_id === otherUserId &&
          item.receiver_id === user.id
        )

    );

  }


  /* =======================================================
     GET INBOX
     ======================================================= */

  async function getInbox() {

    const user =
      await getUser();


    if (!user) {

      return [];

    }


    if (
      window.CoachBolbolSupabase
    ) {

      const client =
        window.CoachBolbolSupabase.getClient();


      if (client) {

        try {

          const {
            data,
            error
          } = await client
            .from("messages")
            .select("*")
            .or(
              "sender_id.eq." +
              user.id +
              ",receiver_id.eq." +
              user.id
            )
            .order(
              "created_at",
              {
                ascending: false
              }
            );


          if (!error) {

            return data || [];

          }

        } catch (error) {

          console.warn(
            "Inbox error:",
            error
          );

        }

      }

    }


    const messages =
      getLocalMessages();


    return messages.filter(
      item =>

        item.sender_id === user.id

        ||

        item.receiver_id === user.id

    );

  }


  /* =======================================================
     UNREAD COUNT
     ======================================================= */

  async function getUnreadCount() {

    const user =
      await getUser();


    if (!user) {
      return 0;
    }


    if (
      window.CoachBolbolSupabase
    ) {

      const client =
        window.CoachBolbolSupabase.getClient();


      if (client) {

        try {

          const {
            count,
            error
          } = await client
            .from("messages")
            .select(
              "*",
              {
                count: "exact",
                head: true
              }
            )
            .eq(
              "receiver_id",
              user.id
            )
            .eq(
              "read",
              false
            );


          if (!error) {

            return count || 0;

          }

        } catch (error) {}

      }

    }


    const messages =
      getLocalMessages();


    return messages.filter(
      item =>

        item.receiver_id === user.id &&
        item.read === false

    ).length;

  }


  /* =======================================================
     MARK MESSAGE AS READ
     ======================================================= */

  async function markAsRead(
    messageId
  ) {

    if (!messageId) {
      return false;
    }


    if (
      window.CoachBolbolSupabase
    ) {

      const client =
        window.CoachBolbolSupabase.getClient();


      if (client) {

        try {

          const {
            error
          } = await client
            .from("messages")
            .update({
              read: true
            })
            .eq(
              "id",
              messageId
            );


          if (!error) {
            return true;
          }

        } catch (error) {}

      }

    }


    const messages =
      getLocalMessages();


    const index =
      messages.findIndex(
        item =>
          item.id === messageId
      );


    if (index !== -1) {

      messages[index].read = true;

      saveLocalMessages(
        messages
      );

      return true;

    }


    return false;

  }


  /* =======================================================
     MARK CONVERSATION READ
     ======================================================= */

  async function markConversationRead(
    otherUserId
  ) {

    const user =
      await getUser();


    if (!user) {
      return false;
    }


    const messages =
      await getConversation(
        otherUserId
      );


    for (
      const message of messages
    ) {

      if (
        message.receiver_id === user.id &&
        !message.read
      ) {

        await markAsRead(
          message.id
        );

      }

    }


    return true;

  }


  /* =======================================================
     DELETE LOCAL MESSAGE
     ======================================================= */

  function deleteLocalMessage(
    messageId
  ) {

    const messages =
      getLocalMessages();


    const filtered =
      messages.filter(
        item =>
          item.id !== messageId
      );


    saveLocalMessages(
      filtered
    );


    return true;

  }


  /* =======================================================
     FORMAT DATE
     ======================================================= */

  function formatMessageDate(
    date
  ) {

    if (!date) {
      return "";
    }


    const value =
      new Date(date);


    if (
      Number.isNaN(
        value.getTime()
      )
    ) {

      return "";

    }


    return value.toLocaleString(
      undefined,
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolMessages = {

    sendMessage,

    getConversation,

    getInbox,

    getUnreadCount,

    markAsRead,

    markConversationRead,

    deleteLocalMessage,

    formatMessageDate

  };


})();
