/* =========================================================
   COACH BOLBOL — CLOUD SYNC
   Local Storage ↔ Supabase
   ========================================================= */

(function () {

  "use strict";

  const CONFIG = window.COACH_BOLBOL_CONFIG || {};

  function cloudReady() {

    return Boolean(
      CONFIG.supabaseUrl &&
      CONFIG.supabaseAnonKey &&
      window.CoachBolbolAuth &&
      window.CoachBolbolAuth.isAvailable()
    );

  }


  async function getClient() {

    if (!cloudReady()) {
      return null;
    }

    return window.CoachBolbolAuth.initSupabase();

  }


  /* =======================================================
     PROFILE
     ======================================================= */

  async function uploadProfile(profile) {

    const client = await getClient();

    if (!client || !profile) {
      return {
        success: false,
        skipped: true
      };
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return {
          success: false,
          error: "User is not logged in."
        };
      }

      const record = {

        id: user.id,

        full_name:
          profile.name ||
          profile.full_name ||
          "",

        email:
          profile.email ||
          user.email ||
          "",

        age:
          Number(profile.age) || null,

        gender:
          profile.gender || null,

        height_cm:
          Number(profile.height) ||
          Number(profile.height_cm) ||
          null,

        current_weight:
          Number(profile.weight) ||
          Number(profile.current_weight) ||
          null,

        goal_weight:
          Number(profile.goalWeight) ||
          Number(profile.goal_weight) ||
          null,

        activity_level:
          profile.activity ||
          profile.activity_level ||
          "moderate",

        fitness_level:
          profile.fitnessLevel ||
          profile.fitness_level ||
          "beginner",

        avatar_url:
          profile.avatar_url ||
          null,

        updated_at:
          new Date().toISOString()

      };


      const {
        error
      } = await client
        .from("profiles")
        .upsert(record);


      if (error) {

        return {
          success: false,
          error: error.message
        };

      }


      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,
        error: error.message
      };

    }

  }


  /* =======================================================
     DOWNLOAD PROFILE
     ======================================================= */

  async function downloadProfile() {

    const client = await getClient();

    if (!client) {
      return null;
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return null;
      }


      const {
        data,
        error
      } = await client
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();


      if (error || !data) {
        return null;
      }


      return data;

    } catch (error) {

      return null;

    }

  }


  /* =======================================================
     WEIGHT CHECK-IN
     ======================================================= */

  async function uploadWeight(weight, notes = "") {

    const client = await getClient();

    if (!client) {
      return {
        success: false,
        skipped: true
      };
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return {
          success: false,
          error: "User is not logged in."
        };
      }


      const {
        error
      } = await client
        .from("weight_checkins")
        .insert({

          user_id: user.id,

          weight_kg:
            Number(weight),

          notes:

            notes || null,

          recorded_at:
            new Date().toISOString()

        });


      if (error) {

        return {
          success: false,
          error: error.message
        };

      }


      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,
        error: error.message
      };

    }

  }


  /* =======================================================
     DOWNLOAD WEIGHT HISTORY
     ======================================================= */

  async function downloadWeights() {

    const client = await getClient();

    if (!client) {
      return [];
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return [];
      }


      const {
        data,
        error
      } = await client
        .from("weight_checkins")
        .select("*")
        .eq("user_id", user.id)
        .order("recorded_at", {
          ascending: false
        });


      if (error) {
        return [];
      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     WORKOUT LOG
     ======================================================= */

  async function uploadWorkout(workout) {

    const client = await getClient();

    if (!client || !workout) {
      return {
        success: false,
        skipped: true
      };
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return {
          success: false,
          error: "User is not logged in."
        };
      }


      const {
        data,
        error
      } = await client
        .from("workout_logs")
        .insert({

          user_id: user.id,

          workout_name:
            workout.name ||
            workout.workout_name ||
            "Workout",

          program_name:
            workout.program ||
            workout.program_name ||
            null,

          duration_minutes:
            Number(workout.duration) ||
            Number(workout.duration_minutes) ||
            null,

          total_volume:
            Number(workout.totalVolume) ||
            Number(workout.total_volume) ||
            0,

          exercises_completed:
            Number(workout.exerciseCount) ||
            Number(workout.exercises_completed) ||
            0,

          calories_burned:
            Number(workout.caloriesBurned) ||
            null,

          notes:
            workout.notes ||
            null,

          completed_at:
            workout.completedAt ||
            new Date().toISOString()

        })
        .select()
        .single();


      if (error) {

        return {
          success: false,
          error: error.message
        };

      }


      return {
        success: true,
        data
      };

    } catch (error) {

      return {
        success: false,
        error: error.message
      };

    }

  }


  /* =======================================================
     DOWNLOAD WORKOUT HISTORY
     ======================================================= */

  async function downloadWorkouts() {

    const client = await getClient();

    if (!client) {
      return [];
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return [];
      }


      const {
        data,
        error
      } = await client
        .from("workout_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", {
          ascending: false
        });


      if (error) {
        return [];
      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     NUTRITION LOG
     ======================================================= */

  async function uploadNutrition(item) {

    const client = await getClient();

    if (!client || !item) {
      return {
        success: false,
        skipped: true
      };
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return {
          success: false,
          error: "User is not logged in."
        };
      }


      const {
        error
      } = await client
        .from("nutrition_logs")
        .insert({

          user_id: user.id,

          food_name:
            item.name ||
            item.food_name ||
            "Food",

          grams:
            Number(item.grams) ||
            null,

          calories:
            Number(item.calories) ||
            0,

          protein:
            Number(item.protein) ||
            0,

          carbs:
            Number(item.carbs) ||
            0,

          fat:
            Number(item.fat) ||
            0,

          meal_type:
            item.mealType ||
            item.meal_type ||
            null,

          consumed_at:
            item.consumedAt ||
            new Date().toISOString()

        });


      if (error) {

        return {
          success: false,
          error: error.message
        };

      }


      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,
        error: error.message
      };

    }

  }


  /* =======================================================
     DOWNLOAD NUTRITION
     ======================================================= */

  async function downloadNutrition() {

    const client = await getClient();

    if (!client) {
      return [];
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return [];
      }


      const {
        data,
        error
      } = await client
        .from("nutrition_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("consumed_at", {
          ascending: false
        });


      if (error) {
        return [];
      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     SEND MESSAGE
     ======================================================= */

  async function sendMessage(receiverId, message) {

    const client = await getClient();

    if (!client) {
      return {
        success: false,
        error: "Cloud is not configured."
      };
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return {
          success: false,
          error: "User is not logged in."
        };
      }


      const {
        data,
        error
      } = await client
        .from("messages")
        .insert({

          sender_id: user.id,

          receiver_id:
            receiverId,

          message:
            String(message).trim()

        })
        .select()
        .single();


      if (error) {

        return {
          success: false,
          error: error.message
        };

      }


      return {
        success: true,
        data
      };

    } catch (error) {

      return {
        success: false,
        error: error.message
      };

    }

  }


  /* =======================================================
     DOWNLOAD MESSAGES
     ======================================================= */

  async function downloadMessages() {

    const client = await getClient();

    if (!client) {
      return [];
    }

    try {

      const user =
        await window.CoachBolbolAuth.getCurrentUser();

      if (!user) {
        return [];
      }


      const {
        data,
        error
      } = await client
        .from("messages")
        .select("*")
        .or(
          `sender_id.eq.${user.id},receiver_id.eq.${user.id}`
        )
        .order("created_at", {
          ascending: true
        });


      if (error) {
        return [];
      }


      return data || [];

    } catch (error) {

      return [];

    }

  }


  /* =======================================================
     SYNC LOCAL PROFILE → CLOUD
     ======================================================= */

  async function syncProfileToCloud() {

    if (
      !window.CoachBolbolStorage
    ) {
      return {
        success: false
      };
    }


    const profile =
      window.CoachBolbolStorage.getProfile();


    if (!profile) {
      return {
        success: false,
        error: "No local profile."
      };
    }


    return await uploadProfile(profile);

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolSync = {

    cloudReady,

    uploadProfile,

    downloadProfile,

    uploadWeight,

    downloadWeights,

    uploadWorkout,

    downloadWorkouts,

    uploadNutrition,

    downloadNutrition,

    sendMessage,

    downloadMessages,

    syncProfileToCloud

  };

})();
