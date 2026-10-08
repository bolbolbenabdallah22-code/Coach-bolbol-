/* =========================================================
   COACH BOLBOL — PROGRESS.JS
   Progress & Statistics Engine
========================================================= */

(function () {
  "use strict";

  const WEIGHT_KEY =
    "coach_bolbol_weight_history";

  const WORKOUT_KEY =
    "coach_bolbol_workouts";

  /* =========================
     PROFILE
  ========================= */

  function getProfile() {
    try {
      const data =
        localStorage.getItem(
          "coach_bolbol_profile"
        );

      return data
        ? JSON.parse(data)
        : {};
    } catch (error) {
      return {};
    }
  }

  /* =========================
     WEIGHT HISTORY
  ========================= */

  function getWeightHistory() {
    try {
      const data =
        localStorage.getItem(
          WEIGHT_KEY
        );

      return data
        ? JSON.parse(data)
        : [];
    } catch (error) {
      return [];
    }
  }

  function saveWeightHistory(history) {
    try {
      localStorage.setItem(
        WEIGHT_KEY,
        JSON.stringify(history)
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  /* =========================
     ADD WEIGHT
  ========================= */

  function addWeight(weight) {
    weight = Number(weight);

    if (!weight || weight <= 0) {
      return false;
    }

    const history =
      getWeightHistory();

    history.push({
      id:
        Date.now() +
        Math.random(),

      weight,

      date:
        new Date().toISOString()
    });

    saveWeightHistory(history);

    return true;
  }

  /* =========================
     CURRENT WEIGHT
  ========================= */

  function getCurrentWeight() {
    const profile =
      getProfile();

    const history =
      getWeightHistory();

    if (history.length > 0) {
      return Number(
        history[
          history.length - 1
        ].weight
      );
    }

    return Number(
      profile.weight || 0
    );
  }

  /* =========================
     STARTING WEIGHT
  ========================= */

  function getStartingWeight() {
    const profile =
      getProfile();

    if (profile.startingWeight) {
      return Number(
        profile.startingWeight
      );
    }

    const history =
      getWeightHistory();

    if (history.length > 0) {
      return Number(
        history[0].weight
      );
    }

    return Number(
      profile.weight || 0
    );
  }

  /* =========================
     GOAL WEIGHT
  ========================= */

  function getGoalWeight() {
    const profile =
      getProfile();

    return Number(
      profile.goalWeight || 0
    );
  }

  /* =========================
     WEIGHT CHANGE
  ========================= */

  function getWeightChange() {
    const starting =
      getStartingWeight();

    const current =
      getCurrentWeight();

    if (!starting || !current) {
      return 0;
    }

    return Number(
      (current - starting)
        .toFixed(1)
    );
  }

  /* =========================
     GOAL PROGRESS
  ========================= */

  function getGoalProgress() {
    const starting =
      getStartingWeight();

    const current =
      getCurrentWeight();

    const goal =
      getGoalWeight();

    if (
      !starting ||
      !current ||
      !goal ||
      starting === goal
    ) {
      return 0;
    }

    const total =
      Math.abs(
        starting - goal
      );

    const completed =
      Math.abs(
        starting - current
      );

    return Math.max(
      0,
      Math.min(
        100,
        Math.round(
          (completed / total) * 100
        )
      )
    );
  }

  /* =========================
     REMAINING WEIGHT
  ========================= */

  function getRemainingWeight() {
    const current =
      getCurrentWeight();

    const goal =
      getGoalWeight();

    if (!current || !goal) {
      return 0;
    }

    return Number(
      (current - goal)
        .toFixed(1)
    );
  }

  /* =========================
     BMI
  ========================= */

  function calculateBMI() {
    const profile =
      getProfile();

    const weight =
      getCurrentWeight();

    const height =
      Number(profile.height);

    if (!weight || !height) {
      return 0;
    }

    const meters =
      height / 100;

    return Number(
      (
        weight /
        (meters * meters)
      ).toFixed(1)
    );
  }

  function getBMIStatus() {
    const bmi =
      calculateBMI();

    if (!bmi) return "No data";

    if (bmi < 18.5) {
      return "Underweight";
    }

    if (bmi < 25) {
      return "Healthy range";
    }

    if (bmi < 30) {
      return "Overweight";
    }

    return "Obesity range";
  }

  /* =========================
     WORKOUT HISTORY
  ========================= */

  function getWorkouts() {
    try {
      const data =
        localStorage.getItem(
          WORKOUT_KEY
        );

      return data
        ? JSON.parse(data)
        : [];
    } catch (error) {
      return [];
    }
  }

  /* =========================
     WORKOUT COUNT
  ========================= */

  function getWorkoutCount() {
    return getWorkouts().length;
  }

  /* =========================
     TOTAL VOLUME
  ========================= */

  function getTotalVolume() {
    return getWorkouts()
      .reduce(
        (total, workout) => {
          return total +
            Number(
              workout.totalVolume ||
              0
            );
        },
        0
      );
  }

  /* =========================
     LAST WORKOUT
  ========================= */

  function getLastWorkout() {
    const workouts =
      getWorkouts();

    if (!workouts.length) {
      return null;
    }

    return workouts[
      workouts.length - 1
    ];
  }

  /* =========================
     WEEKLY WORKOUTS
  ========================= */

  function getWeeklyWorkoutCount() {
    const now =
      new Date();

    const weekAgo =
      new Date(now);

    weekAgo.setDate(
      now.getDate() - 7
    );

    return getWorkouts()
      .filter(workout => {
        const date =
          new Date(
            workout.endTime ||
            workout.date
          );

        return date >= weekAgo;
      })
      .length;
  }

  /* =========================
     WEEKLY WEIGHT CHANGE
  ========================= */

  function getWeeklyWeightChange() {
    const history =
      getWeightHistory();

    if (history.length < 2) {
      return 0;
    }

    const now =
      new Date();

    const weekAgo =
      new Date(now);

    weekAgo.setDate(
      now.getDate() - 7
    );

    const weekly =
      history.filter(item => {
        return (
          new Date(item.date) >=
          weekAgo
        );
      });

    if (weekly.length < 2) {
      return 0;
    }

    const first =
      Number(
        weekly[0].weight
      );

    const last =
      Number(
        weekly[
          weekly.length - 1
        ].weight
      );

    return Number(
      (last - first)
        .toFixed(1)
    );
  }

  /* =========================
     COMPLETE SUMMARY
  ========================= */

  function getSummary() {
    return {
      startingWeight:
        getStartingWeight(),

      currentWeight:
        getCurrentWeight(),

      goalWeight:
        getGoalWeight(),

      weightChange:
        getWeightChange(),

      remainingWeight:
        getRemainingWeight(),

      goalProgress:
        getGoalProgress(),

      bmi:
        calculateBMI(),

      bmiStatus:
        getBMIStatus(),

      workoutCount:
        getWorkoutCount(),

      weeklyWorkoutCount:
        getWeeklyWorkoutCount(),

      weeklyWeightChange:
        getWeeklyWeightChange(),

      totalVolume:
        getTotalVolume(),

      lastWorkout:
        getLastWorkout()
    };
  }

  /* =========================
     PUBLIC API
  ========================= */

  window.CoachBolbolProgress = {

    getProfile,

    getWeightHistory,

    saveWeightHistory,

    addWeight,

    getCurrentWeight,

    getStartingWeight,

    getGoalWeight,

    getWeightChange,

    getGoalProgress,

    getRemainingWeight,

    calculateBMI,

    getBMIStatus,

    getWorkouts,

    getWorkoutCount,

    getTotalVolume,

    getLastWorkout,

    getWeeklyWorkoutCount,

    getWeeklyWeightChange,

    getSummary
  };

})();
