/* =========================================================
   COACH BOLBOL — SETTINGS
   ========================================================= */

(function () {

  "use strict";

  const DEFAULT_SETTINGS = {
    theme: "light",
    language: "en",
    notifications: true,
    workoutReminders: true,
    nutritionReminders: true,
    waterReminders: true,
    sound: true,
    vibration: true,
    units: "metric"
  };


  /* =======================================================
     GET SETTINGS
     ======================================================= */

  function getSettings() {

    let saved = {};

    try {

      saved = JSON.parse(
        localStorage.getItem(
          "coach_bolbol_settings"
        ) || "{}"
      );

    } catch (error) {

      saved = {};

    }


    return {
      ...DEFAULT_SETTINGS,
      ...saved
    };

  }


  /* =======================================================
     SAVE SETTINGS
     ======================================================= */

  function saveSettings(settings) {

    const current =
      getSettings();


    const updated = {
      ...current,
      ...settings
    };


    localStorage.setItem(
      "coach_bolbol_settings",
      JSON.stringify(updated)
    );


    applySettings(updated);


    return updated;

  }


  /* =======================================================
     UPDATE ONE SETTING
     ======================================================= */

  function setSetting(
    key,
    value
  ) {

    if (!key) {
      return getSettings();
    }


    return saveSettings({
      [key]: value
    });

  }


  /* =======================================================
     GET ONE SETTING
     ======================================================= */

  function getSetting(
    key
  ) {

    const settings =
      getSettings();


    return settings[key];

  }


  /* =======================================================
     RESET SETTINGS
     ======================================================= */

  function resetSettings() {

    localStorage.setItem(
      "coach_bolbol_settings",
      JSON.stringify(
        DEFAULT_SETTINGS
      )
    );


    applySettings(
      DEFAULT_SETTINGS
    );


    return DEFAULT_SETTINGS;

  }


  /* =======================================================
     APPLY THEME
     ======================================================= */

  function applyTheme(
    theme
  ) {

    const selectedTheme =
      theme === "dark"
        ? "dark"
        : "light";


    document.documentElement
      .setAttribute(
        "data-theme",
        selectedTheme
      );


    document.body?.classList.toggle(
      "dark-mode",
      selectedTheme === "dark"
    );


    document.body?.classList.toggle(
      "light-mode",
      selectedTheme === "light"
    );

  }


  /* =======================================================
     APPLY SETTINGS
     ======================================================= */

  function applySettings(
    settings = getSettings()
  ) {

    applyTheme(
      settings.theme
    );


    document.documentElement
      .setAttribute(
        "lang",
        settings.language || "en"
      );


    document.documentElement
      .setAttribute(
        "data-units",
        settings.units || "metric"
      );

  }


  /* =======================================================
     TOGGLE SETTING
     ======================================================= */

  function toggleSetting(
    key
  ) {

    const current =
      Boolean(
        getSetting(key)
      );


    return setSetting(
      key,
      !current
    );

  }


  /* =======================================================
     SET THEME
     ======================================================= */

  function setTheme(
    theme
  ) {

    return setSetting(
      "theme",
      theme === "dark"
        ? "dark"
        : "light"
    );

  }


  /* =======================================================
     TOGGLE NOTIFICATIONS
     ======================================================= */

  function toggleNotifications() {

    return toggleSetting(
      "notifications"
    );

  }


  /* =======================================================
     TOGGLE WORKOUT REMINDERS
     ======================================================= */

  function toggleWorkoutReminders() {

    return toggleSetting(
      "workoutReminders"
    );

  }


  /* =======================================================
     TOGGLE NUTRITION REMINDERS
     ======================================================= */

  function toggleNutritionReminders() {

    return toggleSetting(
      "nutritionReminders"
    );

  }


  /* =======================================================
     TOGGLE WATER REMINDERS
     ======================================================= */

  function toggleWaterReminders() {

    return toggleSetting(
      "waterReminders"
    );

  }


  /* =======================================================
     SET LANGUAGE
     ======================================================= */

  function setLanguage(
    language
  ) {

    const allowed = [
      "en",
      "ar",
      "fr"
    ];


    const selected =
      allowed.includes(language)
        ? language
        : "en";


    return setSetting(
      "language",
      selected
    );

  }


  /* =======================================================
     SET UNITS
     ======================================================= */

  function setUnits(
    units
  ) {

    const selected =
      units === "imperial"
        ? "imperial"
        : "metric";


    return setSetting(
      "units",
      selected
    );

  }


  /* =======================================================
     EXPORT SETTINGS
     ======================================================= */

  function exportSettings() {

    const settings =
      getSettings();


    return JSON.stringify(
      settings,
      null,
      2
    );

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function init() {

    applySettings(
      getSettings()
    );

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolSettings = {

    DEFAULT_SETTINGS,

    getSettings,

    saveSettings,

    setSetting,

    getSetting,

    resetSettings,

    applyTheme,

    applySettings,

    toggleSetting,

    setTheme,

    toggleNotifications,

    toggleWorkoutReminders,

    toggleNutritionReminders,

    toggleWaterReminders,

    setLanguage,

    setUnits,

    exportSettings,

    init

  };


  /* =======================================================
     START
     ======================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})();
