/* =========================================================
   COACH BOLBOL — APP CONFIGURATION
   ========================================================= */

window.COACH_BOLBOL_CONFIG = {

  /*
   * Supabase project URL
   * Add your URL later.
   */
  supabaseUrl: "",

  /*
   * Supabase ANON / PUBLISHABLE KEY
   * NEVER put a Supabase service-role key here.
   */
  supabaseAnonKey: "",

  /*
   * Your coach account ID
   * We will connect this later after authentication.
   */
  coachId: "",

  /*
   * Application information
   */
  appName: "Coach Bolbol",

  version: "1.0.0",

  environment: "production",

  /*
   * Feature switches
   */
  features: {

    cloudSync: false,

    authentication: false,

    messaging: false,

    coachReports: false,

    notifications: false

  }

};


/* =========================================================
   CONFIG HELPERS
   ========================================================= */

function isCloudConfigured() {

  const config = window.COACH_BOLBOL_CONFIG;

  return Boolean(
    config &&
    config.supabaseUrl &&
    config.supabaseAnonKey
  );

}


function isFeatureEnabled(featureName) {

  const features =
    window.COACH_BOLBOL_CONFIG?.features || {};

  return features[featureName] === true;

}


/* =========================================================
   GLOBAL CONFIG API
   ========================================================= */

window.CoachBolbolConfig = {

  get() {
    return window.COACH_BOLBOL_CONFIG;
  },

  isCloudConfigured,

  isFeatureEnabled

};
