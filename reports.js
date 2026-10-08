/* =========================================================
   COACH BOLBOL — CLIENT REPORTS
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     CREATE PROGRESS REPORT
     ======================================================= */

  async function createProgressReport() {

    const profile =
      window.CoachBolbolStorage?.getProfile?.() || {};

    const weights =
      window.CoachBolbolProgress?.getWeightHistory?.() || [];

    const workouts =
      window.CoachBolbolWorkout?.getWorkouts?.() || [];


    const currentWeight =
      Number(
        profile.currentWeight ||
        profile.weight ||
        0
      );


    const startWeight =
      Number(
        profile.startingWeight ||
        currentWeight
      );


    const goalWeight =
      Number(
        profile.goalWeight ||
        0
      );


    const weightChange =
      Number(
        (currentWeight - startWeight)
          .toFixed(1)
      );


    const remaining =
      goalWeight > 0
        ? Number(
            Math.abs(
              currentWeight - goalWeight
            ).toFixed(1)
          )
        : 0;


    const report = {

      type: "progress",

      createdAt:
        new Date().toISOString(),

      clientName:
        profile.name || "",

      currentWeight,

      startingWeight:
        startWeight,

      goalWeight,

      weightChange,

      remainingWeight:
        remaining,

      totalWeightCheckins:
        weights.length,

      totalWorkouts:
        workouts.length

    };


    return report;

  }


  /* =======================================================
     CREATE WORKOUT REPORT
     ======================================================= */

  async function createWorkoutReport() {

    const workouts =
      window.CoachBolbolWorkout?.getWorkouts?.() || [];


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

      type: "workout",

      createdAt:
        new Date().toISOString(),

      totalWorkouts:
        workouts.length,

      totalVolume:
        Math.round(totalVolume),

      latestWorkout:
        workouts.length
          ? workouts[workouts.length - 1]
          : null

    };

  }


  /* =======================================================
     CREATE FULL REPORT
     ======================================================= */

  async function createFullReport() {

    const progress =
      await createProgressReport();


    const workout =
      await createWorkoutReport();


    const profile =
      window.CoachBolbolStorage?.getProfile?.() || {};


    return {

      reportType:
        "full",

      createdAt:
        new Date().toISOString(),

      client: {

        name:
          profile.name || "",

        age:
          profile.age || "",

        gender:
          profile.gender || "",

        height:
          profile.height || "",

        activity:
          profile.activity || ""

      },

      progress,

      workout

    };

  }


  /* =======================================================
     SEND REPORT TO COACH
     ======================================================= */

  async function sendReportToCoach(
    report,
    title = "Client Progress Report"
  ) {

    if (!report) {

      return {

        success: false,

        error:
          "Report is empty."

      };

    }


    const config =
      window.COACH_BOLBOL_CONFIG || {};


    const coachId =
      config.coachId;


    if (!coachId) {

      return {

        success: false,

        error:
          "Coach account is not configured yet."

      };

    }


    if (
      !window.CoachBolbolMessages
    ) {

      return {

        success: false,

        error:
          "Messaging system is unavailable."

      };

    }


    const result =
      await window.CoachBolbolMessages
        .sendMessage(
          coachId,
          JSON.stringify(
            report
          ),
          "report"
        );


    if (!result?.success) {

      return {

        success: false,

        error:
          result?.error ||
          "Could not send report."

      };

    }


    return {

      success: true,

      data:
        result.data

    };

  }


  /* =======================================================
     SEND SIMPLE REPORT
     ======================================================= */

  async function submitProgressReport() {

    const report =
      await createFullReport();


    return await sendReportToCoach(
      report,
      "Coach Bolbol Progress Report"
    );

  }


  /* =======================================================
     SAVE REPORT LOCALLY
     ======================================================= */

  function saveLocalReport(
    report
  ) {

    if (!report) {
      return false;
    }


    const key =
      "coach_bolbol_reports";


    let reports = [];


    try {

      reports =
        JSON.parse(
          localStorage.getItem(
            key
          ) || "[]"
        );

    } catch (error) {

      reports = [];

    }


    reports.push(
      report
    );


    localStorage.setItem(
      key,
      JSON.stringify(
        reports
      )
    );


    return true;

  }


  /* =======================================================
     GET LOCAL REPORTS
     ======================================================= */

  function getLocalReports() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "coach_bolbol_reports"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolReports = {

    createProgressReport,

    createWorkoutReport,

    createFullReport,

    sendReportToCoach,

    submitProgressReport,

    saveLocalReport,

    getLocalReports

  };


})();
