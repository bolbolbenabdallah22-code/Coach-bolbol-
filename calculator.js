/* =========================================================
   COACH BOLBOL — CALCULATOR.JS
   Scientific Fitness Calculator
========================================================= */

(function () {
  "use strict";

  /* =========================
     BMR — Mifflin St Jeor
  ========================= */

  function calculateBMR(data) {
    const weight = Number(data.weight);
    const height = Number(data.height);
    const age = Number(data.age);
    const gender = String(data.gender || "male").toLowerCase();

    if (!weight || !height || !age) return 0;

    if (gender === "female") {
      return Math.round(
        (10 * weight) +
        (6.25 * height) -
        (5 * age) -
        161
      );
    }

    return Math.round(
      (10 * weight) +
      (6.25 * height) -
      (5 * age) +
      5
    );
  }

  /* =========================
     TDEE
  ========================= */

  function calculateTDEE(data) {
    const bmr = calculateBMR(data);
    const activity = Number(data.activity) || 1.2;

    if (!bmr) return 0;

    return Math.round(bmr * activity);
  }

  /* =========================
     CALORIE TARGET
  ========================= */

  function calculateCalories(data, goal) {
    const tdee = calculateTDEE(data);

    if (!tdee) return 0;

    switch (goal) {
      case "loss":
      case "fat_loss":
        return Math.round(tdee * 0.85);

      case "gain":
      case "muscle_gain":
        return Math.round(tdee * 1.075);

      case "aggressive_loss":
        return Math.round(tdee * 0.80);

      default:
        return tdee;
    }
  }

  /* =========================
     MACROS
  ========================= */

  function calculateMacros(data, goal) {
    const calories = calculateCalories(data, goal);
    const weight = Number(data.weight);

    if (!calories || !weight) {
      return {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0
      };
    }

    // Evidence-informed starting point
    const protein = Math.round(weight * 1.8);
    const fat = Math.round(weight * 0.8);

    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;

    const remainingCalories =
      calories - proteinCalories - fatCalories;

    const carbs = Math.max(
      0,
      Math.round(remainingCalories / 4)
    );

    return {
      calories,
      protein,
      fat,
      carbs
    };
  }

  /* =========================
     BMI
  ========================= */

  function calculateBMI(weight, height) {
    weight = Number(weight);
    height = Number(height);

    if (!weight || !height) return 0;

    const heightMeters = height / 100;

    return Number(
      (weight / (heightMeters * heightMeters)).toFixed(1)
    );
  }

  function getBMIStatus(bmi) {
    bmi = Number(bmi);

    if (!bmi) return "No data";

    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Healthy range";
    if (bmi < 30) return "Overweight";

    return "Obesity range";
  }

  /* =========================
     HEALTHY WEIGHT RANGE
     BMI 18.5 — 24.9
  ========================= */

  function calculateHealthyWeight(height) {
    height = Number(height);

    if (!height) {
      return {
        min: 0,
        max: 0
      };
    }

    const meters = height / 100;

    const min = 18.5 * meters * meters;
    const max = 24.9 * meters * meters;

    return {
      min: Number(min.toFixed(1)),
      max: Number(max.toFixed(1))
    };
  }

  /* =========================
     TARGET WEIGHT
  ========================= */

  function calculateWeightDifference(current, goal) {
    current = Number(current);
    goal = Number(goal);

    if (!current || !goal) return 0;

    return Number(
      (current - goal).toFixed(1)
    );
  }

  /* =========================
     WEIGHT LOSS ESTIMATE
     ~0.5% bodyweight/week
  ========================= */

  function estimateFatLossWeeks(current, goal) {
    current = Number(current);
    goal = Number(goal);

    if (!current || !goal || goal >= current) return 0;

    const weightToLose = current - goal;

    const weeklyLoss = current * 0.005;

    if (!weeklyLoss) return 0;

    return Math.ceil(
      weightToLose / weeklyLoss
    );
  }

  /* =========================
     WEIGHT LOSS RATE
  ========================= */

  function calculateWeeklyLossTarget(weight) {
    weight = Number(weight);

    if (!weight) return 0;

    return Number(
      (weight * 0.005).toFixed(2)
    );
  }

  /* =========================
     1RM — EPLEY
  ========================= */

  function calculate1RM(weight, reps) {
    weight = Number(weight);
    reps = Number(reps);

    if (!weight || !reps || reps < 1) return 0;

    if (reps === 1) return weight;

    return Math.round(
      weight * (1 + reps / 30)
    );
  }

  /* =========================
     TRAINING VOLUME
  ========================= */

  function calculateVolume(weight, reps, sets) {
    weight = Number(weight);
    reps = Number(reps);
    sets = Number(sets);

    if (!weight || !reps || !sets) return 0;

    return Math.round(
      weight * reps * sets
    );
  }

  /* =========================
     TARGET MACRO CALCULATOR
  ========================= */

  function calculateMacrosFromCalories(
    calories,
    weight
  ) {
    calories = Number(calories);
    weight = Number(weight);

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

    const remaining =
      calories -
      (protein * 4) -
      (fat * 9);

    const carbs = Math.max(
      0,
      Math.round(remaining / 4)
    );

    return {
      calories: Math.round(calories),
      protein,
      fat,
      carbs
    };
  }

  /* =========================
     COMPLETE REPORT
  ========================= */

  function generateReport(data, goal = "loss") {
    const weight = Number(data.weight);
    const height = Number(data.height);
    const goalWeight = Number(data.goalWeight);

    const bmr = calculateBMR(data);
    const tdee = calculateTDEE(data);
    const calories = calculateCalories(data, goal);

    const macros = calculateMacros(
      data,
      goal
    );

    const bmi = calculateBMI(
      weight,
      height
    );

    const healthyWeight =
      calculateHealthyWeight(height);

    const difference =
      calculateWeightDifference(
        weight,
        goalWeight
      );

    const weeks =
      estimateFatLossWeeks(
        weight,
        goalWeight
      );

    const weeklyLoss =
      calculateWeeklyLossTarget(weight);

    return {
      bmr,
      tdee,
      calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      bmi,
      bmiStatus: getBMIStatus(bmi),
      healthyWeight,
      weightDifference: difference,
      estimatedWeeks: weeks,
      weeklyLossTarget: weeklyLoss
    };
  }

  /* =========================
     EXPORT
  ========================= */

  window.CoachBolbolCalculator = {
    calculateBMR,
    calculateTDEE,
    calculateCalories,
    calculateMacros,
    calculateBMI,
    getBMIStatus,
    calculateHealthyWeight,
    calculateWeightDifference,
    estimateFatLossWeeks,
    calculateWeeklyLossTarget,
    calculate1RM,
    calculateVolume,
    calculateMacrosFromCalories,
    generateReport
  };

})();
