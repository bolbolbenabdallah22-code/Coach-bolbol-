/* =========================================================
   COACH BOLBOL — STORAGE.JS
   Centralized Local Storage Manager
========================================================= */

(function () {
  "use strict";

  const STORAGE = {
    PROFILE: "coach_bolbol_profile",
    WORKOUTS: "coach_bolbol_workouts",
    WEIGHTS: "coach_bolbol_weight_history",
    WATER: "coach_bolbol_water_history",
    MESSAGES: "coach_bolbol_messages",
    NUTRITION: "coach_bolbol_nutrition",
    SETTINGS: "coach_bolbol_settings"
  };

  function read(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.error("Storage read error:", error);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Storage write error:", error);
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Storage remove error:", error);
      return false;
    }
  }

  /* ---------- PROFILE ---------- */

  function getProfile() {
    return read(STORAGE.PROFILE, {
      name: "",
      age: "",
      height: "",
      weight: "",
      startingWeight: "",
      goalWeight: "",
      gender: "male",
      activity: 1.55
    });
  }

  function saveProfile(profile) {
    return write(STORAGE.PROFILE, profile);
  }

  /* ---------- WORKOUTS ---------- */

  function getWorkouts() {
    return read(STORAGE.WORKOUTS, []);
  }

  function saveWorkouts(workouts) {
    return write(STORAGE.WORKOUTS, workouts);
  }

  function addWorkout(workout) {
    const workouts = getWorkouts();

    workouts.push({
      ...workout,
      id: Date.now(),
      date: new Date().toISOString()
    });

    return saveWorkouts(workouts);
  }

  /* ---------- WEIGHT ---------- */

  function getWeightHistory() {
    return read(STORAGE.WEIGHTS, []);
  }

  function saveWeightHistory(history) {
    return write(STORAGE.WEIGHTS, history);
  }

  function addWeight(weight) {
    const history = getWeightHistory();

    history.push({
      id: Date.now(),
      weight: Number(weight),
      date: new Date().toISOString()
    });

    return saveWeightHistory(history);
  }

  /* ---------- WATER ---------- */

  function getWaterHistory() {
    return read(STORAGE.WATER, []);
  }

  function saveWaterHistory(history) {
    return write(STORAGE.WATER, history);
  }

  function addWater(amount) {
    const history = getWaterHistory();

    history.push({
      id: Date.now(),
      amount: Number(amount),
      date: new Date().toISOString()
    });

    return saveWaterHistory(history);
  }

  /* ---------- NUTRITION ---------- */

  function getNutrition() {
    return read(STORAGE.NUTRITION, {
      meals: [],
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
  }

  function saveNutrition(data) {
    return write(STORAGE.NUTRITION, data);
  }

  /* ---------- MESSAGES ---------- */

  function getMessages() {
    return read(STORAGE.MESSAGES, []);
  }

  function saveMessages(messages) {
    return write(STORAGE.MESSAGES, messages);
  }

  function addMessage(message) {
    const messages = getMessages();

    messages.push({
      ...message,
      id: Date.now(),
      date: new Date().toISOString()
    });

    return saveMessages(messages);
  }

  /* ---------- SETTINGS ---------- */

  function getSettings() {
    return read(STORAGE.SETTINGS, {
      notifications: true,
      reminders: true,
      sound: true
    });
  }

  function saveSettings(settings) {
    return write(STORAGE.SETTINGS, settings);
  }

  /* ---------- CLEAR ALL ---------- */

  function clearAllData() {
    Object.values(STORAGE).forEach(key => {
      remove(key);
    });
  }

  /* ---------- PUBLIC API ---------- */

  window.CoachBolbolStorage = {
    keys: STORAGE,

    read,
    write,
    remove,

    getProfile,
    saveProfile,

    getWorkouts,
    saveWorkouts,
    addWorkout,

    getWeightHistory,
    saveWeightHistory,
    addWeight,

    getWaterHistory,
    saveWaterHistory,
    addWater,

    getNutrition,
    saveNutrition,

    getMessages,
    saveMessages,
    addMessage,

    getSettings,
    saveSettings,

    clearAllData
  };

})();
