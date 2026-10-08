/* =========================================================
   COACH BOLBOL — CLOUD PROFILE MANAGER
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     GET LOCAL PROFILE
     ======================================================= */

  function getLocalProfile() {

    if (
      window.CoachBolbolStorage &&
      typeof window.CoachBolbolStorage.getProfile === "function"
    ) {
      return window.CoachBolbolStorage.getProfile();
    }

    try {

      const saved =
        localStorage.getItem("coach_bolbol_profile");

      return saved
        ? JSON.parse(saved)
        : null;

    } catch (error) {

      return null;

    }

  }


  /* =======================================================
     SAVE LOCAL PROFILE
     ======================================================= */

  function saveLocalProfile(profile) {

    if (!profile) {
      return false;
    }

    try {

      if (
        window.CoachBolbolStorage &&
        typeof window.CoachBolbolStorage.saveProfile === "function"
      ) {

        window.CoachBolbolStorage.saveProfile(profile);

        return true;

      }


      localStorage.setItem(
        "coach_bolbol_profile",
        JSON.stringify(profile)
      );

      return true;

    } catch (error) {

      console.error(
        "Coach Bolbol profile save error:",
        error
      );

      return false;

    }

  }


  /* =======================================================
     CONVERT CLOUD PROFILE → LOCAL FORMAT
     ======================================================= */

  function cloudToLocal(data) {

    if (!data) {
      return null;
    }

    return {

      name:
        data.full_name || "",

      email:
        data.email || "",

      age:
        data.age || "",

      gender:
        data.gender || "",

      height:
        data.height_cm || "",

      weight:
        data.current_weight || "",

      goalWeight:
        data.goal_weight || "",

      activity:
        data.activity_level || "moderate",

      fitnessLevel:
        data.fitness_level || "beginner",

      avatar_url:
        data.avatar_url || "",

      updatedAt:
        data.updated_at || null

    };

  }


  /* =======================================================
     LOAD PROFILE FROM CLOUD
     ======================================================= */

  async function loadFromCloud() {

    if (!window.CoachBolbolSync) {

      return {
        success: false,
        error: "Cloud sync module is missing."
      };

    }


    const cloudProfile =
      await window.CoachBolbolSync.downloadProfile();


    if (!cloudProfile) {

      return {
        success: false,
        error: "No cloud profile found."
      };

    }


    const profile =
      cloudToLocal(cloudProfile);


    if (!profile) {

      return {
        success: false,
        error: "Could not read cloud profile."
      };

    }


    saveLocalProfile(profile);


    return {

      success: true,

      profile

    };

  }


  /* =======================================================
     SAVE PROFILE TO CLOUD
     ======================================================= */

  async function saveToCloud(profile = null) {

    const data =
      profile || getLocalProfile();


    if (!data) {

      return {
        success: false,
        error: "No profile data available."
      };

    }


    if (!window.CoachBolbolSync) {

      return {
        success: false,
        error: "Cloud sync module is missing."
      };

    }


    return await window.CoachBolbolSync.uploadProfile(data);

  }


  /* =======================================================
     FULL PROFILE SYNC
     ======================================================= */

  async function syncProfile() {

    if (
      !window.CoachBolbolConfig ||
      !window.CoachBolbolConfig.isCloudConfigured()
    ) {

      return {

        success: false,

        skipped: true,

        message:
          "Cloud is not configured yet."

      };

    }


    const user =
      await window.CoachBolbolAuth.getCurrentUser();


    if (!user) {

      return {

        success: false,

        error:
          "User is not logged in."

      };

    }


    const localProfile =
      getLocalProfile();


    if (localProfile) {

      const uploadResult =
        await saveToCloud(localProfile);


      if (uploadResult.success) {

        return {

          success: true,

          direction: "local_to_cloud"

        };

      }

    }


    const downloadResult =
      await loadFromCloud();


    if (downloadResult.success) {

      return {

        success: true,

        direction: "cloud_to_local",

        profile:
          downloadResult.profile

      };

    }


    return {

      success: false,

      error:
        "Profile could not be synchronized."

    };

  }


  /* =======================================================
     UPDATE ONE PROFILE FIELD
     ======================================================= */

  async function updateField(field, value) {

    const profile =
      getLocalProfile() || {};


    profile[field] = value;


    saveLocalProfile(profile);


    if (
      window.CoachBolbolConfig &&
      window.CoachBolbolConfig.isCloudConfigured()
    ) {

      return await saveToCloud(profile);

    }


    return {

      success: true,

      localOnly: true

    };

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolProfileCloud = {

    getLocalProfile,

    saveLocalProfile,

    cloudToLocal,

    loadFromCloud,

    saveToCloud,

    syncProfile,

    updateField

  };

})();
