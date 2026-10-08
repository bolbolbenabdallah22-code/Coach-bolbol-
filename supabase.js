/* =========================================================
   COACH BOLBOL — SUPABASE LOADER
   ========================================================= */

(function () {

  "use strict";

  const CONFIG = window.COACH_BOLBOL_CONFIG || {};

  window.CoachBolbolSupabase = {

    isConfigured() {

      return Boolean(
        CONFIG.supabaseUrl &&
        CONFIG.supabaseAnonKey
      );

    },

    getUrl() {
      return CONFIG.supabaseUrl || "";
    },

    getAnonKey() {
      return CONFIG.supabaseAnonKey || "";
    },

    getClient() {

      if (
        !this.isConfigured() ||
        !window.supabase
      ) {
        return null;
      }

      return window.supabase.createClient(
        CONFIG.supabaseUrl,
        CONFIG.supabaseAnonKey
      );

    }

  };

})();
