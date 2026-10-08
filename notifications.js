/* =========================================================
   COACH BOLBOL — NOTIFICATIONS
   ========================================================= */

(function () {

  "use strict";

  const LOCAL_KEY = "coach_bolbol_notifications";


  /* =======================================================
     LOCAL STORAGE
     ======================================================= */

  function getLocalNotifications() {

    try {

      return JSON.parse(
        localStorage.getItem(LOCAL_KEY) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  function saveLocalNotifications(items) {

    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify(items)
    );

  }


  /* =======================================================
     CREATE NOTIFICATION
     ======================================================= */

  async function createNotification(
    userId,
    title,
    message,
    type = "general"
  ) {

    if (!title || !message) {

      return {
        success: false,
        error: "Title and message are required."
      };

    }


    const supabase =
      window.CoachBolbolSupabase?.getClient();


    /* -----------------------------------------------------
       CLOUD
       ----------------------------------------------------- */

    if (supabase && userId) {

      try {

        const {
          data,
          error
        } = await supabase
          .from("notifications")
          .insert({

            user_id: userId,

            title: title.trim(),

            message: message.trim(),

            type: type,

            read: false

          })
          .select()
          .single();


        if (!error) {

          return {
            success: true,
            data: data
          };

        }

      } catch (error) {

        console.warn(
          "Cloud notification failed:",
          error
        );

      }

    }


    /* -----------------------------------------------------
       LOCAL FALLBACK
       ----------------------------------------------------- */

    const notifications =
      getLocalNotifications();


    const notification = {

      id:
        "local_notification_" +
        Date.now(),

      user_id:
        userId || "local_user",

      title:
        title.trim(),

      message:
        message.trim(),

      type:
        type,

      read:
        false,

      created_at:
        new Date().toISOString()

    };


    notifications.unshift(
      notification
    );


    saveLocalNotifications(
      notifications
    );


    return {

      success: true,

      data:
        notification,

      local: true

    };

  }


  /* =======================================================
     GET NOTIFICATIONS
     ======================================================= */

  async function getNotifications(
    userId
  ) {

    if (!userId) {
      return [];
    }


    const supabase =
      window.CoachBolbolSupabase?.getClient();


    if (supabase) {

      try {

        const {
          data,
          error
        } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userId)
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
          "Notifications error:",
          error
        );

      }

    }


    return getLocalNotifications()
      .filter(
        item =>
          item.user_id === userId
      );

  }


  /* =======================================================
     UNREAD COUNT
     ======================================================= */

  async function getUnreadCount(
    userId
  ) {

    if (!userId) {
      return 0;
    }


    const supabase =
      window.CoachBolbolSupabase?.getClient();


    if (supabase) {

      try {

        const {
          count,
          error
        } = await supabase
          .from("notifications")
          .select(
            "*",
            {
              count: "exact",
              head: true
            }
          )
          .eq(
            "user_id",
            userId
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


    return getLocalNotifications()
      .filter(
        item =>
          item.user_id === userId &&
          item.read === false
      )
      .length;

  }


  /* =======================================================
     MARK AS READ
     ======================================================= */

  async function markAsRead(
    notificationId
  ) {

    if (!notificationId) {
      return false;
    }


    const supabase =
      window.CoachBolbolSupabase?.getClient();


    if (
      supabase &&
      !String(notificationId)
        .startsWith("local_")
    ) {

      try {

        const {
          error
        } = await supabase
          .from("notifications")
          .update({
            read: true
          })
          .eq(
            "id",
            notificationId
          );


        if (!error) {
          return true;
        }

      } catch (error) {}

    }


    const notifications =
      getLocalNotifications();


    const index =
      notifications.findIndex(
        item =>
          item.id === notificationId
      );


    if (index === -1) {
      return false;
    }


    notifications[index].read = true;


    saveLocalNotifications(
      notifications
    );


    return true;

  }


  /* =======================================================
     MARK ALL AS READ
     ======================================================= */

  async function markAllAsRead(
    userId
  ) {

    if (!userId) {
      return false;
    }


    const supabase =
      window.CoachBolbolSupabase?.getClient();


    if (supabase) {

      try {

        const {
          error
        } = await supabase
          .from("notifications")
          .update({
            read: true
          })
          .eq(
            "user_id",
            userId
          )
          .eq(
            "read",
            false
          );


        if (!error) {

          return true;

        }

      } catch (error) {}

    }


    const notifications =
      getLocalNotifications();


    notifications.forEach(
      item => {

        if (
          item.user_id === userId
        ) {

          item.read = true;

        }

      }
    );


    saveLocalNotifications(
      notifications
    );


    return true;

  }


  /* =======================================================
     DELETE LOCAL NOTIFICATION
     ======================================================= */

  function deleteLocalNotification(
    notificationId
  ) {

    const notifications =
      getLocalNotifications();


    const filtered =
      notifications.filter(
        item =>
          item.id !== notificationId
      );


    saveLocalNotifications(
      filtered
    );


    return true;

  }


  /* =======================================================
     FORMAT DATE
     ======================================================= */

  function formatDate(
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

  window.CoachBolbolNotifications = {

    createNotification,

    getNotifications,

    getUnreadCount,

    markAsRead,

    markAllAsRead,

    deleteLocalNotification,

    formatDate

  };

})();
