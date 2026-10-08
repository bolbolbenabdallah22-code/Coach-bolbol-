/* =========================================================
   COACH BOLBOL — MAIN APP.JS
   Core app functions
========================================================= */

(function () {
  "use strict";

  /* ---------- STORAGE ---------- */

  const KEYS = {
    profile: "coach_bolbol_profile",
    workouts: "coach_bolbol_workouts",
    weights: "coach_bolbol_weight_history",
    water: "coach_bolbol_water_history",
    messages: "coach_bolbol_messages"
  };

  function getData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (error) {
      console.error("Storage error:", error);
      return fallback;
    }
  }

  function saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Save error:", error);
      return false;
    }
  }

  /* ---------- PROFILE ---------- */

  function getProfile() {
    return getData(KEYS.profile, {
      name: "",
      age: 23,
      height: 183,
      weight: 0,
      startingWeight: 0,
      goalWeight: 0,
      gender: "male",
      activity: 1.55
    });
  }

  function saveProfile(profile) {
    return saveData(KEYS.profile, profile);
  }

  /* ---------- NAVIGATION ---------- */

  window.goTo = function (page) {
    if (!page) return;

    document.body.classList.add("page-exit");

    setTimeout(function () {
      window.location.href = page;
    }, 120);
  };

  window.goBack = function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "dashboard.html";
    }
  };

  /* ---------- WELCOME ---------- */

  window.welcome = function () {
    const profile = getProfile();

    if (profile.name) {
      return `Welcome back, ${profile.name} 👋`;
    }

    return "Welcome to Coach Bolbol 💪";
  };

  /* ---------- CALCULATIONS ---------- */

  window.calculateBMI = function (weight, height) {
    weight = Number(weight);
    height = Number(height);

    if (!weight || !height) return 0;

    const meters = height / 100;
    return weight / (meters * meters);
  };

  window.calculateBMR = function (profile) {
    const weight = Number(profile.weight);
    const height = Number(profile.height);
    const age = Number(profile.age);

    if (!weight || !height || !age) return 0;

    let bmr;

    if (String(profile.gender).toLowerCase() === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }

    return Math.round(bmr);
  };

  window.calculateTDEE = function (profile) {
    const bmr = window.calculateBMR(profile);
    const activity = Number(profile.activity) || 1.2;

    if (!bmr) return 0;

    return Math.round(bmr * activity);
  };

  window.calculateCalories = function (profile, goal) {
    const tdee = window.calculateTDEE(profile);

    if (!tdee) return 0;

    if (goal === "loss") {
      return Math.round(tdee * 0.85);
    }

    if (goal === "gain") {
      return Math.round(tdee * 1.075);
    }

    return tdee;
  };

  /* ---------- MACROS ---------- */

  window.calculateMacros = function (profile, goal) {
    const calories = window.calculateCalories(profile, goal);
    const weight = Number(profile.weight);

    if (!calories || !weight) {
      return {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0
      };
    }

    const protein = Math.round(weight * 1.8);
    const fat = Math.round(weight * 0.8);

    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;

    const carbs = Math.max(
      0,
      Math.round((calories - proteinCalories - fatCalories) / 4)
    );

    return {
      calories,
      protein,
      fat,
      carbs
    };
  };

  /* ---------- BMI STATUS ---------- */

  window.getBMIStatus = function (bmi) {
    bmi = Number(bmi);

    if (!bmi) return "—";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Healthy range";
    if (bmi < 30) return "Overweight";

    return "Obesity range";
  };

  /* ---------- WEIGHT HISTORY ---------- */

  window.addWeightRecord = function (weight) {
    weight = Number(weight);

    if (!weight || weight <= 0) return false;

    const history = getData(KEYS.weights, []);

    history.push({
      weight: weight,
      date: new Date().toISOString()
    });

    saveData(KEYS.weights, history);

    return true;
  };

  window.getWeightHistory = function () {
    return getData(KEYS.weights, []);
  };

  /* ---------- WORKOUT HISTORY ---------- */

  window.getWorkoutHistory = function () {
    return getData(KEYS.workouts, []);
  };

  window.addWorkout = function (workout) {
    const workouts = getData(KEYS.workouts, []);

    workouts.push({
      ...workout,
      date: new Date().toISOString()
    });

    saveData(KEYS.workouts, workouts);

    return true;
  };

  /* ---------- WATER ---------- */

  window.getWaterHistory = function () {
    return getData(KEYS.water, []);
  };

  window.addWater = function (amount) {
    amount = Number(amount);

    if (!amount || amount <= 0) return false;

    const history = getData(KEYS.water, []);

    history.push({
      amount,
      date: new Date().toISOString()
    });

    saveData(KEYS.water, history);

    return true;
  };

  /* ---------- MESSAGES ---------- */

  window.getMessages = function () {
    return getData(KEYS.messages, []);
  };

  window.addMessage = function (message) {
    const messages = getData(KEYS.messages, []);

    messages.push({
      ...message,
      date: new Date().toISOString()
    });

    saveData(KEYS.messages, messages);

    return true;
  };

  /* ---------- DATE HELPERS ---------- */

  window.formatDate = function (date) {
    const d = new Date(date);

    if (isNaN(d.getTime())) return "—";

    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  window.today = function () {
    return new Date().toISOString().split("T")[0];
  };

  /* ---------- NUMBER HELPERS ---------- */

  window.roundNumber = function (number, decimals = 1) {
    const factor = Math.pow(10, decimals);
    return Math.round(Number(number) * factor) / factor;
  };

  /* ---------- TOAST ---------- */

  window.showToast = function (message, type = "success") {
    let toast = document.getElementById("coachToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "coachToast";

      Object.assign(toast.style, {
        position: "fixed",
        left: "50%",
        bottom: "25px",
        transform: "translateX(-50%) translateY(20px)",
        padding: "13px 20px",
        borderRadius: "14px",
        background: "#111827",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "700",
        zIndex: "99999",
        opacity: "0",
        transition: "all .3s ease",
        boxShadow: "0 10px 30px rgba(0,0,0,.18)"
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    if (type === "error") {
      toast.style.background = "#dc2626";
    } else if (type === "warning") {
      toast.style.background = "#d97706";
    } else {
      toast.style.background = "#111827";
    }

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform =
        "translateX(-50%) translateY(0)";
    });

    clearTimeout(window.__coachToastTimer);

    window.__coachToastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform =
        "translateX(-50%) translateY(20px)";
    }, 2500);
  };

  /* ---------- PAGE ANIMATION ---------- */

  function initAnimations() {
    document.body.classList.add("page-enter");

    setTimeout(() => {
      document.body.classList.add("page-ready");
    }, 30);
  }

  /* ---------- ACTIVE NAV ---------- */

  function setActiveNavigation() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("[data-page]").forEach(link => {
      const page = link.getAttribute("data-page");

      if (page === currentPage) {
        link.classList.add("active");
      }
    });
  }

  /* ---------- GLOBAL PROFILE DISPLAY ---------- */

  function updateProfileDisplays() {
    const profile = getProfile();

    document.querySelectorAll("[data-profile-name]").forEach(el => {
      el.textContent = profile.name || "Coach Bolbol User";
    });

    document.querySelectorAll("[data-profile-weight]").forEach(el => {
      el.textContent = profile.weight
        ? `${profile.weight} kg`
        : "—";
    });

    document.querySelectorAll("[data-profile-goal]").forEach(el => {
      el.textContent = profile.goalWeight
        ? `${profile.goalWeight} kg`
        : "—";
    });
  }

  /* ---------- START ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    initAnimations();
    setActiveNavigation();
    updateProfileDisplays();
  });

})();
