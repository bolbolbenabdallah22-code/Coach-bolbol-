/* =========================================================
   COACH BOLBOL — EXERCISES.JS
   Exercise Database
========================================================= */

(function () {
  "use strict";

  const EXERCISES = {

    bench_press: {
      id: "bench_press",
      name: "Barbell Bench Press",
      category: "Strength",
      muscle: "Chest",
      secondary: ["Triceps", "Front Delts"],
      equipment: "Barbell",
      level: "Intermediate",
      instructions: [
        "Set your upper back firmly on the bench.",
        "Keep your feet stable on the floor.",
        "Lower the bar under control toward the mid chest.",
        "Press upward while maintaining a stable shoulder position."
      ],
      alternatives: [
        "Dumbbell Bench Press",
        "Machine Chest Press",
        "Push Up"
      ]
    },

    incline_dumbbell_press: {
      id: "incline_dumbbell_press",
      name: "Incline Dumbbell Press",
      category: "Strength",
      muscle: "Upper Chest",
      secondary: ["Triceps", "Front Delts"],
      equipment: "Dumbbells",
      level: "Beginner",
      instructions: [
        "Set the bench at a moderate incline.",
        "Keep your shoulders controlled.",
        "Lower the dumbbells slowly.",
        "Press upward without losing control."
      ],
      alternatives: [
        "Incline Machine Press",
        "Incline Barbell Press"
      ]
    },

    squat: {
      id: "squat",
      name: "Back Squat",
      category: "Strength",
      muscle: "Quadriceps",
      secondary: ["Glutes", "Hamstrings"],
      equipment: "Barbell",
      level: "Intermediate",
      instructions: [
        "Brace your trunk before starting.",
        "Keep the bar stable across the upper back.",
        "Descend under control.",
        "Drive through the floor while maintaining alignment."
      ],
      alternatives: [
        "Goblet Squat",
        "Leg Press",
        "Hack Squat"
      ]
    },

    goblet_squat: {
      id: "goblet_squat",
      name: "Goblet Squat",
      category: "Strength",
      muscle: "Quadriceps",
      secondary: ["Glutes", "Core"],
      equipment: "Dumbbell",
      level: "Beginner",
      instructions: [
        "Hold the dumbbell close to your chest.",
        "Keep your torso controlled.",
        "Descend with your knees tracking comfortably.",
        "Stand while maintaining a stable trunk."
      ],
      alternatives: [
        "Leg Press",
        "Bodyweight Squat"
      ]
    },

    romanian_deadlift: {
      id: "romanian_deadlift",
      name: "Romanian Deadlift",
      category: "Strength",
      muscle: "Hamstrings",
      secondary: ["Glutes", "Back"],
      equipment: "Barbell",
      level: "Intermediate",
      instructions: [
        "Keep the spine neutral.",
        "Push the hips backward.",
        "Keep the weight close to the legs.",
        "Return by driving the hips forward."
      ],
      alternatives: [
        "Dumbbell Romanian Deadlift",
        "Cable Pull Through"
      ]
    },

    leg_press: {
      id: "leg_press",
      name: "Leg Press",
      category: "Strength",
      muscle: "Quadriceps",
      secondary: ["Glutes", "Hamstrings"],
      equipment: "Machine",
      level: "Beginner",
      instructions: [
        "Place your feet comfortably on the platform.",
        "Brace before lowering.",
        "Lower the platform under control.",
        "Press without aggressively locking the knees."
      ],
      alternatives: [
        "Goblet Squat",
        "Hack Squat"
      ]
    },

    leg_curl: {
      id: "leg_curl",
      name: "Leg Curl",
      category: "Strength",
      muscle: "Hamstrings",
      secondary: [],
      equipment: "Machine",
      level: "Beginner",
      instructions: [
        "Adjust the machine to your body.",
        "Keep the hips stable.",
        "Curl the pad under control.",
        "Return slowly."
      ],
      alternatives: [
        "Seated Leg Curl",
        "Nordic Curl"
      ]
    },

    lat_pulldown: {
      id: "lat_pulldown",
      name: "Lat Pulldown",
      category: "Strength",
      muscle: "Lats",
      secondary: ["Biceps", "Upper Back"],
      equipment: "Cable Machine",
      level: "Beginner",
      instructions: [
        "Sit with the thighs secured.",
        "Pull the bar toward the upper chest.",
        "Keep the torso controlled.",
        "Return slowly while maintaining tension."
      ],
      alternatives: [
        "Assisted Pull Up",
        "Resistance Band Pulldown"
      ]
    },

    pull_up: {
      id: "pull_up",
      name: "Pull Up",
      category: "Strength",
      muscle: "Lats",
      secondary: ["Biceps", "Upper Back"],
      equipment: "Pull Up Bar",
      level: "Intermediate",
      instructions: [
        "Start from a controlled hanging position.",
        "Brace the trunk.",
        "Pull the elbows toward the body.",
        "Lower under control."
      ],
      alternatives: [
        "Lat Pulldown",
        "Assisted Pull Up"
      ]
    },

    cable_row: {
      id: "cable_row",
      name: "Seated Cable Row",
      category: "Strength",
      muscle: "Upper Back",
      secondary: ["Lats", "Biceps"],
      equipment: "Cable Machine",
      level: "Beginner",
      instructions: [
        "Sit tall and brace your trunk.",
        "Pull the handle toward your torso.",
        "Keep the shoulders controlled.",
        "Return slowly."
      ],
      alternatives: [
        "Chest Supported Row",
        "Dumbbell Row"
      ]
    },

    dumbbell_row: {
      id: "dumbbell_row",
      name: "One Arm Dumbbell Row",
      category: "Strength",
      muscle: "Back",
      secondary: ["Lats", "Biceps"],
      equipment: "Dumbbell",
      level: "Beginner",
      instructions: [
        "Support yourself on a stable surface.",
        "Keep the spine neutral.",
        "Pull the dumbbell toward your hip.",
        "Lower under control."
      ],
      alternatives: [
        "Cable Row",
        "Chest Supported Row"
      ]
    },

    lateral_raise: {
      id: "lateral_raise",
      name: "Cable Lateral Raise",
      category: "Strength",
      muscle: "Side Delts",
      secondary: [],
      equipment: "Cable Machine",
      level: "Beginner",
      instructions: [
        "Stand tall with a stable trunk.",
        "Raise the arm outward.",
        "Control the movement throughout.",
        "Avoid using excessive momentum."
      ],
      alternatives: [
        "Dumbbell Lateral Raise",
        "Machine Lateral Raise"
      ]
    },

    face_pull: {
      id: "face_pull",
      name: "Face Pull",
      category: "Strength",
      muscle: "Rear Delts",
      secondary: ["Upper Back"],
      equipment: "Cable Machine",
      level: "Beginner",
      instructions: [
        "Set the cable around face height.",
        "Pull the rope toward the face.",
        "Rotate the arms naturally.",
        "Return slowly."
      ],
      alternatives: [
        "Reverse Fly",
        "Rear Delt Machine"
      ]
    },

    biceps_curl: {
      id: "biceps_curl",
      name: "Dumbbell Curl",
      category: "Strength",
      muscle: "Biceps",
      secondary: [],
      equipment: "Dumbbells",
      level: "Beginner",
      instructions: [
        "Keep the elbows close to the body.",
        "Curl without swinging.",
        "Squeeze at the top.",
        "Lower slowly."
      ],
      alternatives: [
        "Cable Curl",
        "EZ Bar Curl"
      ]
    },

    triceps_pushdown: {
      id: "triceps_pushdown",
      name: "Cable Triceps Pushdown",
      category: "Strength",
      muscle: "Triceps",
      secondary: [],
      equipment: "Cable Machine",
      level: "Beginner",
      instructions: [
        "Keep the elbows near the torso.",
        "Push the handle downward.",
        "Fully control the return.",
        "Avoid excessive shoulder movement."
      ],
      alternatives: [
        "Overhead Triceps Extension",
        "Close Grip Push Up"
      ]
    },

    push_up: {
      id: "push_up",
      name: "Push Up",
      category: "Strength",
      muscle: "Chest",
      secondary: ["Triceps", "Shoulders"],
      equipment: "Bodyweight",
      level: "Beginner",
      instructions: [
        "Place the hands comfortably under the shoulders.",
        "Brace the trunk.",
        "Lower the body as one unit.",
        "Push the floor away."
      ],
      alternatives: [
        "Machine Chest Press",
        "Incline Push Up"
      ]
    },

    /* =========================
       KICKBOXING
    ========================= */

    shadow_boxing: {
      id: "shadow_boxing",
      name: "Shadow Boxing",
      category: "Kickboxing",
      muscle: "Full Body",
      secondary: ["Core", "Shoulders"],
      equipment: "None",
      level: "Beginner",
      instructions: [
        "Maintain your stance and guard.",
        "Move with controlled combinations.",
        "Use relaxed technique.",
        "Return to your guard after every strike."
      ],
      alternatives: [
        "Heavy Bag"
      ]
    },

    jab_cross: {
      id: "jab_cross",
      name: "Jab Cross",
      category: "Kickboxing",
      muscle: "Upper Body",
      secondary: ["Core", "Shoulders"],
      equipment: "None",
      level: "Beginner",
      instructions: [
        "Start from a stable fighting stance.",
        "Extend the lead hand.",
        "Return the lead hand to guard.",
        "Rotate the rear side through the cross."
      ],
      alternatives: [
        "Shadow Boxing"
      ]
    },

    round_kick: {
      id: "round_kick",
      name: "Round Kick",
      category: "Kickboxing",
      muscle: "Lower Body",
      secondary: ["Core", "Glutes"],
      equipment: "None",
      level: "Intermediate",
      instructions: [
        "Pivot the supporting foot.",
        "Rotate the hip through the strike.",
        "Keep balance throughout the movement.",
        "Return safely to your stance."
      ],
      alternatives: [
        "Low Kick",
        "Body Kick"
      ]
    },

    teep: {
      id: "teep",
      name: "Front Kick / Teep",
      category: "Kickboxing",
      muscle: "Lower Body",
      secondary: ["Core", "Hip Flexors"],
      equipment: "None",
      level: "Beginner",
      instructions: [
        "Lift the knee first.",
        "Extend the leg toward the target.",
        "Maintain balance.",
        "Return the leg under control."
      ],
      alternatives: [
        "Front Kick"
      ]
    },

    heavy_bag: {
      id: "heavy_bag",
      name: "Heavy Bag",
      category: "Kickboxing",
      muscle: "Full Body",
      secondary: ["Core", "Shoulders", "Legs"],
      equipment: "Heavy Bag",
      level: "Beginner",
      instructions: [
        "Use controlled combinations.",
        "Maintain your guard.",
        "Move around the bag.",
        "Prioritize technique before maximum power."
      ],
      alternatives: [
        "Shadow Boxing"
      ]
    },

    /* =========================
       CONDITIONING
    ========================= */

    incline_walk: {
      id: "incline_walk",
      name: "Incline Walking",
      category: "Conditioning",
      muscle: "Lower Body",
      secondary: ["Cardiovascular"],
      equipment: "Treadmill",
      level: "Beginner",
      instructions: [
        "Maintain a comfortable walking pace.",
        "Use an incline appropriate to your fitness level.",
        "Keep posture controlled.",
        "Increase duration gradually."
      ],
      alternatives: [
        "Outdoor Walking",
        "Cycling"
      ]
    },

    cycling: {
      id: "cycling",
      name: "Cycling",
      category: "Conditioning",
      muscle: "Lower Body",
      secondary: ["Cardiovascular"],
      equipment: "Bike",
      level: "Beginner",
      instructions: [
        "Adjust the seat correctly.",
        "Maintain a controlled cadence.",
        "Use resistance appropriate to your level.",
        "Progress gradually."
      ],
      alternatives: [
        "Walking",
        "Elliptical"
      ]
    },

    burpee: {
      id: "burpee",
      name: "Burpee",
      category: "Conditioning",
      muscle: "Full Body",
      secondary: ["Cardiovascular"],
      equipment: "None",
      level: "Intermediate",
      instructions: [
        "Start standing tall.",
        "Lower into a squat position.",
        "Move into a plank.",
        "Return to standing with control."
      ],
      alternatives: [
        "Squat to Reach",
        "Step Back Burpee"
      ]
    }
  };

  /* =====================================================
     FUNCTIONS
  ===================================================== */

  function getExercise(id) {
    return EXERCISES[id] || null;
  }

  function getAllExercises() {
    return Object.values(EXERCISES);
  }

  function getByCategory(category) {
    return getAllExercises().filter(
      exercise =>
        exercise.category.toLowerCase() ===
        String(category).toLowerCase()
    );
  }

  function getByMuscle(muscle) {
    const search =
      String(muscle).toLowerCase();

    return getAllExercises().filter(
      exercise =>
        exercise.muscle.toLowerCase() ===
          search ||
        exercise.secondary.some(
          item =>
            item.toLowerCase() ===
            search
        )
    );
  }

  function search(query) {
    const q =
      String(query)
        .toLowerCase()
        .trim();

    if (!q) return [];

    return getAllExercises().filter(
      exercise =>
        exercise.name
          .toLowerCase()
          .includes(q) ||
        exercise.muscle
          .toLowerCase()
          .includes(q) ||
        exercise.category
          .toLowerCase()
          .includes(q)
    );
  }

  /* =====================================================
     PUBLIC API
  ===================================================== */

  window.CoachBolbolExercises = {

    data: EXERCISES,

    getExercise,

    getAllExercises,

    getByCategory,

    getByMuscle,

    search
  };

})();
