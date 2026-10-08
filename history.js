/* =========================================================
   COACH BOLBOL — HISTORY
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     GET WORKOUT HISTORY
     ======================================================= */

  function getWorkoutHistory() {

    if (
      window.CoachBolbolWorkout &&
      typeof window.CoachBolbolWorkout.getWorkouts === "function"
    ) {

      return window.CoachBolbolWorkout.getWorkouts();

    }


    try {

      return JSON.parse(
        localStorage.getItem(
          "coach_bolbol_workouts"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GET WEIGHT HISTORY
     ======================================================= */

  function getWeightHistory() {

    if (
      window.CoachBolbolProgress &&
      typeof window.CoachBolbolProgress.getWeightHistory === "function"
    ) {

      return window.CoachBolbolProgress.getWeightHistory();

    }


    try {

      return JSON.parse(
        localStorage.getItem(
          "coach_bolbol_weights"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GET NUTRITION HISTORY
     ======================================================= */

  function getNutritionHistory() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "coach_bolbol_nutrition"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GET WATER HISTORY
     ======================================================= */

  function getWaterHistory() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "coach_bolbol_water_history"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GET ALL HISTORY
     ======================================================= */

  function getAllHistory() {

    return {

      workouts:
        getWorkoutHistory(),

      weights:
        getWeightHistory(),

      nutrition:
        getNutritionHistory(),

      water:
        getWaterHistory()

    };

  }


  /* =======================================================
     WORKOUT SUMMARY
     ======================================================= */

  function getWorkoutSummary() {

    const workouts =
      getWorkoutHistory();


    let totalVolume = 0;


    workouts.forEach(
      workout => {

        totalVolume +=
          Number(
            workout.totalVolume || 0
          );

      }
    );


    return {

      totalWorkouts:
        workouts.length,

      totalVolume:
        Math.round(totalVolume),

      averageVolume:
        workouts.length
          ? Math.round(
              totalVolume /
              workouts.length
            )
          : 0,

      latestWorkout:
        workouts.length
          ? workouts[
              workouts.length - 1
            ]
          : null

    };

  }


  /* =======================================================
     WEIGHT SUMMARY
     ======================================================= */

  function getWeightSummary() {

    const weights =
      getWeightHistory();


    if (!weights.length) {

      return {

        startWeight: 0,

        currentWeight: 0,

        change: 0,

        entries: 0

      };

    }


    const sorted =
      [...weights].sort(
        (a, b) => {

          return new Date(
            a.date ||
            a.recorded_at ||
            0
          ) -

          new Date(
            b.date ||
            b.recorded_at ||
            0
          );

        }
      );


    const startWeight =
      Number(
        sorted[0].weight || 0
      );


    const currentWeight =
      Number(
        sorted[
          sorted.length - 1
        ].weight || 0
      );


    return {

      startWeight,

      currentWeight,

      change:
        Number(
          (
            currentWeight -
            startWeight
          ).toFixed(1)
        ),

      entries:
        weights.length

    };

  }


  /* =======================================================
     GET HISTORY BY DATE
     ======================================================= */

  function getHistoryByDate(
    date
  ) {

    if (!date) {
      return null;
    }


    const target =
      new Date(date)
        .toISOString()
        .split("T")[0];


    const all =
      getAllHistory();


    return {

      workouts:
        all.workouts.filter(
          item => {

            const itemDate =
              item.date ||
              item.completed_at ||
              item.created_at;

            if (!itemDate) {
              return false;
            }

            return new Date(itemDate)
              .toISOString()
              .split("T")[0] === target;

          }
        ),

      weights:
        all.weights.filter(
          item => {

            const itemDate =
              item.date ||
              item.recorded_at ||
              item.created_at;

            if (!itemDate) {
              return false;
            }

            return new Date(itemDate)
              .toISOString()
              .split("T")[0] === target;

          }
        ),

      nutrition:
        all.nutrition.filter(
          item => {

            const itemDate =
              item.date ||
              item.created_at;

            if (!itemDate) {
              return false;
            }

            return new Date(itemDate)
              .toISOString()
              .split("T")[0] === target;

          }
        ),

      water:
        all.water.filter(
          item => {

            const itemDate =
              item.date ||
              item.created_at;

            if (!itemDate) {
              return false;
            }

            return new Date(itemDate)
              .toISOString()
              .split("T")[0] === target;

          }
        )

    };

  }


  /* =======================================================
     FORMAT DATE
     ======================================================= */

  function formatDate(
    date
  ) {

    if (!date) {
      return "";
    }


    const value =
      new Date(date);


    if (
      Number.isNaN(
        value.getTime()
      )
    ) {

      return "";

    }


    return value.toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "short",
        day: "numeric"
      }
    );

  }


  /* =======================================================
     CLEAR LOCAL HISTORY
     ======================================================= */

  function clearLocalHistory() {

    const keys = [

      "coach_bolbol_workouts",

      "coach_bolbol_weights",

      "coach_bolbol_nutrition",

      "coach_bolbol_water_history"

    ];


    keys.forEach(
      key => {

        localStorage.removeItem(
          key
        );

      }
    );


    return true;

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolHistory = {

    getWorkoutHistory,

    getWeightHistory,

    getNutritionHistory,

    getWaterHistory,

    getAllHistory,

    getWorkoutSummary,

    getWeightSummary,

    getHistoryByDate,

    formatDate,

    clearLocalHistory

  };

})();
