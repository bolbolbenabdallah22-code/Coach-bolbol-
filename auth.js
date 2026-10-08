/* =========================================================
   COACH BOLBOL — AUTHENTICATION
   ========================================================= */

(function () {

  "use strict";

  const CONFIG = window.COACH_BOLBOL_CONFIG || {};

  let supabaseClient = null;


  /* =======================================================
     INITIALIZE SUPABASE
     ======================================================= */

  function initSupabase() {

    if (supabaseClient) {
      return supabaseClient;
    }

    if (
      !CONFIG.supabaseUrl ||
      !CONFIG.supabaseAnonKey
    ) {
      console.warn(
        "Coach Bolbol: Supabase is not configured yet."
      );

      return null;
    }

    if (!window.supabase) {
      console.error(
        "Coach Bolbol: Supabase library is missing."
      );

      return null;
    }

    supabaseClient =
      window.supabase.createClient(
        CONFIG.supabaseUrl,
        CONFIG.supabaseAnonKey
      );

    return supabaseClient;
  }


  /* =======================================================
     IS AUTHENTICATION AVAILABLE?
     ======================================================= */

  function isAvailable() {

    return Boolean(
      CONFIG.supabaseUrl &&
      CONFIG.supabaseAnonKey &&
      window.supabase
    );

  }


  /* =======================================================
     SIGN UP
     ======================================================= */

  async function signUp(email, password, fullName = "") {

    const client = initSupabase();

    if (!client) {
      return {
        success: false,
        error: "Cloud authentication is not configured yet."
      };
    }

    try {

      const {
        data,
        error
      } = await client.auth.signUp({

        email: email.trim(),

        password,

        options: {
          data: {
            full_name: fullName.trim()
          }
        }

      });


      if (error) {
        return {
          success: false,
          error: error.message
        };
      }


      return {
        success: true,
        user: data.user,
        session: data.session
      };

    } catch (error) {

      return {
        success: false,
        error: error.message || "Sign up failed."
      };

    }

  }


  /* =======================================================
     LOGIN
     ======================================================= */

  async function login(email, password) {

    const client = initSupabase();

    if (!client) {
      return {
        success: false,
        error: "Cloud authentication is not configured yet."
      };
    }

    try {

      const {
        data,
        error
      } = await client.auth.signInWithPassword({

        email: email.trim(),

        password

      });


      if (error) {
        return {
          success: false,
          error: error.message
        };
      }


      return {
        success: true,
        user: data.user,
        session: data.session
      };

    } catch (error) {

      return {
        success: false,
        error: error.message || "Login failed."
      };

    }

  }


  /* =======================================================
     LOGOUT
     ======================================================= */

  async function logout() {

    const client = initSupabase();

    if (!client) {
      return {
        success: false,
        error: "Cloud authentication is not configured."
      };
    }

    try {

      const {
        error
      } = await client.auth.signOut();


      if (error) {

        return {
          success: false,
          error: error.message
        };

      }


      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,
        error: error.message || "Logout failed."
      };

    }

  }


  /* =======================================================
     CURRENT USER
     ======================================================= */

  async function getCurrentUser() {

    const client = initSupabase();

    if (!client) {
      return null;
    }

    try {

      const {
        data,
        error
      } = await client.auth.getUser();


      if (error) {
        return null;
      }


      return data.user || null;

    } catch (error) {

      return null;

    }

  }


  /* =======================================================
     CURRENT SESSION
     ======================================================= */

  async function getSession() {

    const client = initSupabase();

    if (!client) {
      return null;
    }

    try {

      const {
        data,
        error
      } = await client.auth.getSession();


      if (error) {
        return null;
      }


      return data.session || null;

    } catch (error) {

      return null;

    }

  }


  /* =======================================================
     PASSWORD RESET
     ======================================================= */

  async function resetPassword(email) {

    const client = initSupabase();

    if (!client) {
      return {
        success: false,
        error: "Cloud authentication is not configured yet."
      };
    }

    try {

      const redirectUrl =
        window.location.origin +
        window.location.pathname;


      const {
        error
      } = await client.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: redirectUrl
        }
      );


      if (error) {

        return {
          success: false,
          error: error.message
        };

      }


      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,
        error:
          error.message ||
          "Password reset failed."
      };

    }

  }


  /* =======================================================
     AUTH STATE LISTENER
     ======================================================= */

  function onAuthStateChange(callback) {

    const client = initSupabase();

    if (!client || typeof callback !== "function") {
      return null;
    }

    return client.auth.onAuthStateChange(
      (event, session) => {

        callback(event, session);

      }
    );

  }


  /* =======================================================
     REQUIRE LOGIN
     ======================================================= */

  async function requireLogin() {

    const session = await getSession();

    if (!session) {

      return {
        authenticated: false,
        session: null,
        user: null
      };

    }


    return {
      authenticated: true,
      session,
      user: session.user
    };

  }


  /* =======================================================
     EXPORT
     ======================================================= */

  window.CoachBolbolAuth = {

    initSupabase,

    isAvailable,

    signUp,

    login,

    logout,

    getCurrentUser,

    getSession,

    resetPassword,

    onAuthStateChange,

    requireLogin

  };

})();
