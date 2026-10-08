/* =========================================================
   COACH BOLBOL — NUTRITION.JS
   Nutrition Tracking Engine
========================================================= */

(function () {
  "use strict";

  const NUTRITION_KEY = "coach_bolbol_nutrition";
  const WATER_KEY = "coach_bolbol_water_history";

  /* =========================
     DEFAULT DAILY DATA
  ========================= */

  function defaultNutrition() {
    return {
      date: getToday(),

      targetCalories: 0,
      targetProtein: 0,
      targetCarbs: 0,
      targetFat: 0,

      meals: [],

      totals: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    };
  }

  /* =========================
     DATE
  ========================= */

  function getToday() {
    const now = new Date();

    return (
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0")
    );
  }

  /* =========================
     STORAGE
  ========================= */

  function getNutrition() {
    try {
      const data =
        localStorage.getItem(NUTRITION_KEY);

      if (!data) {
        return defaultNutrition();
      }

      const parsed = JSON.parse(data);

      if (parsed.date !== getToday()) {
        return defaultNutrition();
      }

      return parsed;
    } catch (error) {
      console.error(
        "Nutrition storage error:",
        error
      );

      return defaultNutrition();
    }
  }

  function saveNutrition(data) {
    try {
      localStorage.setItem(
        NUTRITION_KEY,
        JSON.stringify(data)
      );

      return true;
    } catch (error) {
      console.error(
        "Nutrition save error:",
        error
      );

      return false;
    }
  }

  /* =========================
     SET DAILY TARGET
  ========================= */

  function setDailyTarget(target) {
    const data = getNutrition();

    data.targetCalories =
      Number(target.calories) || 0;

    data.targetProtein =
      Number(target.protein) || 0;

    data.targetCarbs =
      Number(target.carbs) || 0;

    data.targetFat =
      Number(target.fat) || 0;

    return saveNutrition(data);
  }

  /* =========================
     ADD MEAL
  ========================= */

  function addMeal(meal) {
    const data = getNutrition();

    const newMeal = {
      id: Date.now() +
        Math.random(),

      name:
        meal.name ||
        "Meal",

      type:
        meal.type ||
        "Meal",

      calories:
        Number(meal.calories) || 0,

      protein:
        Number(meal.protein) || 0,

      carbs:
        Number(meal.carbs) || 0,

      fat:
        Number(meal.fat) || 0,

      time:
        meal.time ||
        new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )
    };

    data.meals.push(newMeal);

    recalculateTotals(data);

    return saveNutrition(data);
  }

  /* =========================
     REMOVE MEAL
  ========================= */

  function removeMeal(id) {
    const data = getNutrition();

    data.meals =
      data.meals.filter(
        meal => meal.id !== id
      );

    recalculateTotals(data);

    return saveNutrition(data);
  }

  /* =========================
     UPDATE MEAL
  ========================= */

  function updateMeal(id, changes) {
    const data = getNutrition();

    const meal =
      data.meals.find(
        item => item.id === id
      );

    if (!meal) return false;

    Object.assign(
      meal,
      changes
    );

    meal.calories =
      Number(meal.calories) || 0;

    meal.protein =
      Number(meal.protein) || 0;

    meal.carbs =
      Number(meal.carbs) || 0;

    meal.fat =
      Number(meal.fat) || 0;

    recalculateTotals(data);

    return saveNutrition(data);
  }

  /* =========================
     RECALCULATE TOTALS
  ========================= */

  function recalculateTotals(data) {
    data.totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };

    data.meals.forEach(meal => {
      data.totals.calories +=
        Number(meal.calories) || 0;

      data.totals.protein +=
        Number(meal.protein) || 0;

      data.totals.carbs +=
        Number(meal.carbs) || 0;

      data.totals.fat +=
        Number(meal.fat) || 0;
    });

    data.totals.calories =
      Math.round(data.totals.calories);

    data.totals.protein =
      Math.round(data.totals.protein);

    data.totals.carbs =
      Math.round(data.totals.carbs);

    data.totals.fat =
      Math.round(data.totals.fat);

    return data.totals;
  }

  /* =========================
     GET DAILY TOTALS
  ========================= */

  function getDailyTotals() {
    const data = getNutrition();

    recalculateTotals(data);

    return data.totals;
  }

  /* =========================
     CALORIE REMAINING
  ========================= */

  function getCaloriesRemaining() {
    const data = getNutrition();

    return Math.max(
      0,
      data.targetCalories -
      data.totals.calories
    );
  }

  /* =========================
     MACRO REMAINING
  ========================= */

  function getMacroRemaining() {
    const data = getNutrition();

    return {
      protein: Math.max(
        0,
        data.targetProtein -
        data.totals.protein
      ),

      carbs: Math.max(
        0,
        data.targetCarbs -
        data.totals.carbs
      ),

      fat: Math.max(
        0,
        data.targetFat -
        data.totals.fat
      )
    };
  }

  /* =========================
     PROGRESS %
  ========================= */

  function getProgress() {
    const data = getNutrition();

    return {
      calories:
        calculatePercentage(
          data.totals.calories,
          data.targetCalories
        ),

      protein:
        calculatePercentage(
          data.totals.protein,
          data.targetProtein
        ),

      carbs:
        calculatePercentage(
          data.totals.carbs,
          data.targetCarbs
        ),

      fat:
        calculatePercentage(
          data.totals.fat,
          data.targetFat
        )
    };
  }

  function calculatePercentage(
    current,
    target
  ) {
    if (!target) return 0;

    return Math.min(
      100,
      Math.round(
        (current / target) * 100
      )
    );
  }

  /* =========================
     WATER
  ========================= */

  function getWaterHistory() {
    try {
      const data =
        localStorage.getItem(
          WATER_KEY
        );

      return data
        ? JSON.parse(data)
        : [];
    } catch (error) {
      return [];
    }
  }

  function saveWaterHistory(history) {
    try {
      localStorage.setItem(
        WATER_KEY,
        JSON.stringify(history)
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  function addWater(amount) {
    amount = Number(amount);

    if (!amount || amount <= 0) {
      return false;
    }

    const history =
      getWaterHistory();

    history.push({
      id: Date.now() +
        Math.random(),

      amount,

      date:
        new Date().toISOString()
    });

    return saveWaterHistory(
      history
    );
  }

  function getTodayWater() {
    const today = getToday();

    return getWaterHistory()
      .filter(item => {
        return String(item.date)
          .startsWith(today);
      })
      .reduce(
        (total, item) =>
          total +
          Number(item.amount || 0),
        0
      );
  }

  /* =========================
     CLEAR TODAY
  ========================= */

  function clearTodayNutrition() {
    const data =
      defaultNutrition();

    return saveNutrition(data);
  }

  /* =========================
     PUBLIC API
  ========================= */

  window.CoachBolbolNutrition = {

    getNutrition,

    saveNutrition,

    setDailyTarget,

    addMeal,

    removeMeal,

    updateMeal,

    recalculateTotals,

    getDailyTotals,

    getCaloriesRemaining,

    getMacroRemaining,

    getProgress,

    getWaterHistory,

    saveWaterHistory,

    addWater,

    getTodayWater,

    clearTodayNutrition

  };

})();
