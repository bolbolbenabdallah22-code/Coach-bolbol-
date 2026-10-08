/* =========================================================
   COACH BOLBOL — WORKOUT.JS
   Workout Tracking Engine
========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "coach_bolbol_workouts";

  /* =========================
     STORAGE
  ========================= */

  function getWorkouts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Workout storage error:", error);
      return [];
    }
  }

  function saveWorkouts(workouts) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(workouts)
      );

      return true;
    } catch (error) {
      console.error("Workout save error:", error);
      return false;
    }
  }

  /* =========================
     EXERCISE VOLUME
  ========================= */

  function calculateSetVolume(weight, reps) {
    weight = Number(weight);
    reps = Number(reps);

    if (!weight || !reps) return 0;

    return weight * reps;
  }

  function calculateExerciseVolume(sets) {
    if (!Array.isArray(sets)) return 0;

    return sets.reduce((total, set) => {
      return total +
        calculateSetVolume(
          set.weight,
          set.reps
        );
    }, 0);
  }

  /* =========================
     1RM — EPLEY
  ========================= */

  function calculate1RM(weight, reps) {
    weight = Number(weight);
    reps = Number(reps);

    if (!weight || !reps) return 0;

    if (reps === 1) return weight;

    return Math.round(
      weight * (1 + reps / 30)
    );
  }

  /* =========================
     START WORKOUT
  ========================= */

  function startWorkout(name, category = "Strength") {
    return {
      id: Date.now(),

      name: name || "Workout",

      category,

      startTime:
        new Date().toISOString(),

      endTime: null,

      completed: false,

      exercises: [],

      notes: ""
    };
  }

  /* =========================
     ADD EXERCISE
  ========================= */

  function addExercise(
    workout,
    exercise
  ) {
    if (!workout) return workout;

    if (!Array.isArray(workout.exercises)) {
      workout.exercises = [];
    }

    const sets =
      Array.isArray(exercise.sets)
        ? exercise.sets
        : [];

    const volume =
      calculateExerciseVolume(sets);

    const bestSet =
      sets.reduce(
        (best, current) => {
          const current1RM =
            calculate1RM(
              current.weight,
              current.reps
            );

          return current1RM > best
            ? current1RM
            : best;
        },
        0
      );

    workout.exercises.push({
      id: Date.now() +
        Math.random(),

      name:
        exercise.name ||
        "Exercise",

      muscle:
        exercise.muscle ||
        "",

      sets,

      volume,

      estimated1RM: bestSet,

      notes:
        exercise.notes ||
        ""
    });

    return workout;
  }

  /* =========================
     FINISH WORKOUT
  ========================= */

  function finishWorkout(
    workout,
    notes = ""
  ) {
    if (!workout) return null;

    workout.endTime =
      new Date().toISOString();

    workout.completed = true;

    workout.notes = notes;

    workout.totalVolume =
      workout.exercises.reduce(
        (total, exercise) => {
          return total +
            Number(exercise.volume || 0);
        },
        0
      );

    workout.exerciseCount =
      workout.exercises.length;

    workout.durationMinutes =
      calculateDuration(
        workout.startTime,
        workout.endTime
      );

    const workouts =
      getWorkouts();

    workouts.push(workout);

    saveWorkouts(workouts);

    return workout;
  }

  /* =========================
     DURATION
  ========================= */

  function calculateDuration(
    start,
    end
  ) {
    const startDate =
      new Date(start);

    const endDate =
      new Date(end);

    const milliseconds =
      endDate - startDate;

    if (
      !isFinite(milliseconds) ||
      milliseconds < 0
    ) {
      return 0;
    }

    return Math.round(
      milliseconds / 60000
    );
  }

  /* =========================
     TOTAL WORKOUTS
  ========================= */

  function getWorkoutCount() {
    return getWorkouts().length;
  }

  /* =========================
     TOTAL VOLUME
  ========================= */

  function getTotalVolume() {
    return getWorkouts().reduce(
      (total, workout) => {
        return total +
          Number(
            workout.totalVolume || 0
          );
      },
      0
    );
  }

  /* =========================
     WEEKLY WORKOUTS
  ========================= */

  function getWeeklyWorkouts() {
    const now = new Date();

    const sevenDaysAgo =
      new Date(now);

    sevenDaysAgo.setDate(
      now.getDate() - 7
    );

    return getWorkouts().filter(
      workout => {
        const date =
          new Date(workout.endTime);

        return date >= sevenDaysAgo;
      }
    );
  }

  /* =========================
     PERSONAL RECORD
  ========================= */

  function getBest1RM(exerciseName) {
    let best = 0;

    getWorkouts().forEach(
      workout => {
        if (
          !Array.isArray(
            workout.exercises
          )
        ) return;

        workout.exercises.forEach(
          exercise => {
            if (
              exercise.name ===
              exerciseName
            ) {
              best = Math.max(
                best,
                Number(
                  exercise.estimated1RM ||
                  0
                )
              );
            }
          }
        );
      }
    );

    return best;
  }

  /* =========================
     DELETE WORKOUT
  ========================= */

  function deleteWorkout(id) {
    const workouts =
      getWorkouts().filter(
        workout =>
          workout.id !== id
      );

    return saveWorkouts(
      workouts
    );
  }

  /* =========================
     CLEAR HISTORY
  ========================= */

  function clearWorkoutHistory() {
    return saveWorkouts([]);
  }

  /* =========================
     PUBLIC API
  ========================= */

  window.CoachBolbolWorkout = {

    getWorkouts,

    saveWorkouts,

    startWorkout,

    addExercise,

    finishWorkout,

    calculateSetVolume,

    calculateExerciseVolume,

    calculate1RM,

    calculateDuration,

    getWorkoutCount,

    getTotalVolume,

    getWeeklyWorkouts,

    getBest1RM,

    deleteWorkout,

    clearWorkoutHistory
  };

})();
