/* =========================================================
   COACH BOLBOL — COACH MANAGEMENT
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     GET CURRENT USER
     ======================================================= */

  async function getCurrentUser() {

    if (!window.CoachBolbolAuth) {
      return null;
    }

    return await window.CoachBolbolAuth.getCurrentUser();

  }


  /* =======================================================
     GET CURRENT PROFILE
     ======================================================= */

  async function getCurrentProfile() {

    const user =
      await getCurrentUser();

    if (!user) {
      return null;
    }


    if (!window.CoachBolbolSync) {
      return null;
    }


    return await window.CoachBolbolSync.downloadProfile();

  }


  /* =======================================================
     CHECK COACH ROLE
     ======================================================= */

  async function isCoach() {

    const profile =
      await getCurrentProfile();


    if (!profile) {
      return false;
    }


    return profile.role === "coach";

  }


  /* =======================================================
     GET CLIENTS
     ======================================================= */

  async function getClients() {

    if (!window.CoachBolbolSupabase) {
      return [];
    }


    const client =
      window.CoachBolbolSupabase.getClient();


    if (!client) {
      return [];
    }


    try {

      const {
        data,
        error
      } = await client
        .from("profiles")
        .select("*")
        .eq("role", "client")
        .order("created_at", {
          ascending: false
        });


      if (error) {

        console.error(
          "Coach Bolbol clients error:",
          error
        );

        return [];

      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GET CLIENT REPORTS
     ======================================================= */

  async function getClientReports(clientId) {

    if (!clientId) {
      return [];
    }


    const client =
      window.CoachBolbolSupabase?.getClient();


    if (!client) {
      return [];
    }


    try {

      const {
        data,
        error
      } = await client
        .from("coach_reports")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", {
          ascending: false
        });


      if (error) {
        return [];
      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     CREATE CLIENT REPORT
     ======================================================= */

  async function createReport(
    clientId,
    title,
    content,
    reportType = "progress"
  ) {

    const coach =
      await getCurrentUser();


    if (!coach) {

      return {

        success: false,

        error:
          "Coach is not logged in."

      };

    }


    const client =
      window.CoachBolbolSupabase?.getClient();


    if (!client) {

      return {

        success: false,

        error:
          "Cloud is not configured."

      };

    }


    try {

      const {
        data,
        error
      } = await client
        .from("coach_reports")
        .insert({

          client_id:
            clientId,

          coach_id:
            coach.id,

          report_type:
            reportType,

          title:
            title,

          content:
            content,

          status:
            "new"

        })
        .select()
        .single();


      if (error) {

        return {

          success: false,

          error:
            error.message

        };

      }


      return {

        success: true,

        data

      };

    } catch (error) {

      return {

        success: false,

        error:
          error.message

      };

    }

  }


  /* =======================================================
     GET CLIENT WEIGHT HISTORY
     ======================================================= */

  async function getClientWeights(clientId) {

    if (!clientId) {
      return [];
    }


    const client =
      window.CoachBolbolSupabase?.getClient();


    if (!client) {
      return [];
    }


    try {

      const {
        data,
        error
      } = await client
        .from("weight_checkins")
        .select("*")
        .eq("user_id", clientId)
        .order("recorded_at", {
          ascending: true
        });


      if (error) {
        return [];
      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GET CLIENT WORKOUTS
     ======================================================= */

  async function getClientWorkouts(clientId) {

    if (!clientId) {
      return [];
    }


    const client =
      window.CoachBolbolSupabase?.getClient();


    if (!client) {
      return [];
    }


    try {

      const {
        data,
        error
      } = await client
        .from("workout_logs")
        .select("*")
        .eq("user_id", clientId)
        .order("completed_at", {
          ascending: false
        });


      if (error) {
        return [];
      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolCoach = {

    getCurrentUser,

    getCurrentProfile,

    isCoach,

    getClients,

    getClientReports,

    createReport,

    getClientWeights,

    getClientWorkouts

  };

})();
