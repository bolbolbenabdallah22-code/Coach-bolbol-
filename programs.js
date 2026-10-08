/* =========================================================
   COACH BOLBOL — PROGRAMS.JS
   Training Programs Database
========================================================= */

(function () {
  "use strict";

  const PROGRAMS = {

    /* =====================================================
       STRENGTH
    ===================================================== */

    strength: {
      id: "strength",
      name: "Strength & Hypertrophy",
      icon: "🏋️",
      description:
        "Structured resistance training for strength, muscle and performance.",

      levels: {
        beginner: {
          name: "Beginner",
          days: [

            {
              day: 1,
              title: "Upper Body A",
              focus: "Chest • Shoulders • Triceps",

              exercises: [
                {
                  name: "Barbell Bench Press",
                  sets: 3,
                  reps: "8-10",
                  rest: 120,
                  rir: 2
                },
                {
                  name: "Incline Dumbbell Press",
                  sets: 3,
                  reps: "10-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Seated Shoulder Press",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Cable Lateral Raise",
                  sets: 3,
                  reps: "12-15",
                  rest: 60,
                  rir: 2
                },
                {
                  name: "Cable Triceps Pushdown",
                  sets: 3,
                  reps: "10-15",
                  rest: 60,
                  rir: 1
                }
              ]
            },

            {
              day: 2,
              title: "Lower Body A",
              focus: "Quads • Hamstrings • Calves",

              exercises: [
                {
                  name: "Goblet Squat",
                  sets: 3,
                  reps: "8-12",
                  rest: 120,
                  rir: 2
                },
                {
                  name: "Romanian Deadlift",
                  sets: 3,
                  reps: "8-12",
                  rest: 120,
                  rir: 2
                },
                {
                  name: "Leg Press",
                  sets: 3,
                  reps: "10-15",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Leg Curl",
                  sets: 3,
                  reps: "10-15",
                  rest: 75,
                  rir: 1
                },
                {
                  name: "Standing Calf Raise",
                  sets: 3,
                  reps: "12-20",
                  rest: 60,
                  rir: 1
                }
              ]
            },

            {
              day: 3,
              title: "Upper Body B",
              focus: "Back • Biceps • Rear Delts",

              exercises: [
                {
                  name: "Lat Pulldown",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Seated Cable Row",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "One Arm Dumbbell Row",
                  sets: 3,
                  reps: "10-12",
                  rest: 75,
                  rir: 2
                },
                {
                  name: "Face Pull",
                  sets: 3,
                  reps: "12-15",
                  rest: 60,
                  rir: 2
                },
                {
                  name: "Dumbbell Curl",
                  sets: 3,
                  reps: "10-15",
                  rest: 60,
                  rir: 1
                }
              ]
            },

            {
              day: 4,
              title: "Recovery",
              focus: "Mobility • Walking • Recovery",
              exercises: []
            },

            {
              day: 5,
              title: "Full Body",
              focus: "Full Body Strength",

              exercises: [
                {
                  name: "Leg Press",
                  sets: 3,
                  reps: "8-12",
                  rest: 120,
                  rir: 2
                },
                {
                  name: "Machine Chest Press",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Lat Pulldown",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Dumbbell Romanian Deadlift",
                  sets: 2,
                  reps: "10-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Cable Curl",
                  sets: 2,
                  reps: "12-15",
                  rest: 60,
                  rir: 1
                }
              ]
            }
          ]
        },

        intermediate: {
          name: "Intermediate",
          days: [

            {
              day: 1,
              title: "Push",
              focus: "Chest • Shoulders • Triceps",

              exercises: [
                {
                  name: "Barbell Bench Press",
                  sets: 4,
                  reps: "6-8",
                  rest: 150,
                  rir: 2
                },
                {
                  name: "Incline Dumbbell Press",
                  sets: 3,
                  reps: "8-12",
                  rest: 120,
                  rir: 1
                },
                {
                  name: "Machine Shoulder Press",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 1
                },
                {
                  name: "Cable Lateral Raise",
                  sets: 4,
                  reps: "12-20",
                  rest: 60,
                  rir: 1
                },
                {
                  name: "Overhead Triceps Extension",
                  sets: 3,
                  reps: "10-15",
                  rest: 60,
                  rir: 1
                }
              ]
            },

            {
              day: 2,
              title: "Pull",
              focus: "Back • Biceps",

              exercises: [
                {
                  name: "Pull Up",
                  sets: 4,
                  reps: "6-10",
                  rest: 120,
                  rir: 2
                },
                {
                  name: "Barbell Row",
                  sets: 4,
                  reps: "6-10",
                  rest: 150,
                  rir: 2
                },
                {
                  name: "Lat Pulldown",
                  sets: 3,
                  reps: "10-12",
                  rest: 90,
                  rir: 1
                },
                {
                  name: "Face Pull",
                  sets: 3,
                  reps: "12-20",
                  rest: 60,
                  rir: 1
                },
                {
                  name: "EZ Bar Curl",
                  sets: 3,
                  reps: "8-12",
                  rest: 75,
                  rir: 1
                }
              ]
            },

            {
              day: 3,
              title: "Legs",
              focus: "Quads • Glutes • Hamstrings • Calves",

              exercises: [
                {
                  name: "Back Squat",
                  sets: 4,
                  reps: "6-8",
                  rest: 180,
                  rir: 2
                },
                {
                  name: "Romanian Deadlift",
                  sets: 3,
                  reps: "8-10",
                  rest: 150,
                  rir: 2
                },
                {
                  name: "Leg Press",
                  sets: 3,
                  reps: "10-15",
                  rest: 120,
                  rir: 1
                },
                {
                  name: "Leg Curl",
                  sets: 3,
                  reps: "10-15",
                  rest: 75,
                  rir: 1
                },
                {
                  name: "Calf Raise",
                  sets: 4,
                  reps: "10-20",
                  rest: 60,
                  rir: 1
                }
              ]
            },

            {
              day: 4,
              title: "Rest",
              focus: "Recovery",
              exercises: []
            },

            {
              day: 5,
              title: "Upper",
              focus: "Chest • Back • Shoulders • Arms",

              exercises: [
                {
                  name: "Incline Bench Press",
                  sets: 3,
                  reps: "8-10",
                  rest: 120,
                  rir: 1
                },
                {
                  name: "Chest Supported Row",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 1
                },
                {
                  name: "Cable Fly",
                  sets: 3,
                  reps: "12-15",
                  rest: 60,
                  rir: 1
                },
                {
                  name: "Lateral Raise",
                  sets: 3,
                  reps: "12-20",
                  rest: 60,
                  rir: 1
                },
                {
                  name: "Cable Curl",
                  sets: 2,
                  reps: "10-15",
                  rest: 60,
                  rir: 1
                },
                {
                  name: "Triceps Pushdown",
                  sets: 2,
                  reps: "10-15",
                  rest: 60,
                  rir: 1
                }
              ]
            }
          ]
        }
      }
    },

    /* =====================================================
       KICKBOXING
    ===================================================== */

    kickboxing: {
      id: "kickboxing",
      name: "Kickboxing Performance",
      icon: "🥊",
      description:
        "Technique, combinations, conditioning and fight-specific fitness.",

      levels: {

        beginner: {
          name: "Beginner",
          days: [

            {
              day: 1,
              title: "Boxing Fundamentals",
              focus: "Stance • Guard • Footwork",

              exercises: [
                {
                  name: "Jump Rope",
                  duration: 5,
                  rest: 60
                },
                {
                  name: "Shadow Boxing",
                  rounds: 3,
                  duration: 2,
                  rest: 60
                },
                {
                  name: "Jab Cross",
                  rounds: 3,
                  duration: 2,
                  rest: 60
                },
                {
                  name: "Footwork Drill",
                  rounds: 3,
                  duration: 2,
                  rest: 60
                }
              ]
            },

            {
              day: 2,
              title: "Kick Fundamentals",
              focus: "Teep • Round Kick",

              exercises: [
                {
                  name: "Dynamic Warm Up",
                  duration: 7
                },
                {
                  name: "Front Kick / Teep",
                  rounds: 3,
                  duration: 2,
                  rest: 60
                },
                {
                  name: "Round Kick Technique",
                  rounds: 3,
                  duration: 2,
                  rest: 60
                },
                {
                  name: "Shadow Kickboxing",
                  rounds: 3,
                  duration: 2,
                  rest: 60
                }
              ]
            },

            {
              day: 3,
              title: "Conditioning",
              focus: "Cardio • Technique",

              exercises: [
                {
                  name: "Shadow Boxing",
                  rounds: 4,
                  duration: 2,
                  rest: 60
                },
                {
                  name: "Heavy Bag",
                  rounds: 4,
                  duration: 2,
                  rest: 60
                },
                {
                  name: "Bodyweight Conditioning",
                  rounds: 3,
                  duration: 3,
                  rest: 60
                }
              ]
            }
          ]
        },

        intermediate: {
          name: "Intermediate",
          days: [

            {
              day: 1,
              title: "Combination Training",
              focus: "Punch + Kick Combinations",

              exercises: [
                {
                  name: "Shadow Boxing",
                  rounds: 4,
                  duration: 3,
                  rest: 60
                },
                {
                  name: "Jab Cross Hook",
                  rounds: 4,
                  duration: 3,
                  rest: 60
                },
                {
                  name: "Punch → Round Kick",
                  rounds: 4,
                  duration: 3,
                  rest: 60
                },
                {
                  name: "Heavy Bag",
                  rounds: 4,
                  duration: 3,
                  rest: 60
                }
              ]
            },

            {
              day: 2,
              title: "Speed & Power",
              focus: "Explosive Striking",

              exercises: [
                {
                  name: "Speed Shadow Boxing",
                  rounds: 4,
                  duration: 3,
                  rest: 45
                },
                {
                  name: "Power Bag Rounds",
                  rounds: 5,
                  duration: 3,
                  rest: 60
                },
                {
                  name: "Kick Intervals",
                  rounds: 5,
                  duration: 2,
                  rest: 60
                }
              ]
            },

            {
              day: 3,
              title: "Fight Conditioning",
              focus: "High Intensity Conditioning",

              exercises: [
                {
                  name: "Heavy Bag Intervals",
                  rounds: 6,
                  duration: 3,
                  rest: 60
                },
                {
                  name: "Burpee Intervals",
                  rounds: 5,
                  duration: 1,
                  rest: 60
                },
                {
                  name: "Shadow Boxing",
                  rounds: 4,
                  duration: 3,
                  rest: 45
                }
              ]
            }
          ]
        }
      }
    },

    /* =====================================================
       FAT LOSS
    ===================================================== */

    fatloss: {
      id: "fatloss",
      name: "Fat Loss & Conditioning",
      icon: "🔥",
      description:
        "Resistance training and conditioning designed to support fat loss while preserving muscle.",

      levels: {

        beginner: {
          name: "Beginner",
          days: [

            {
              day: 1,
              title: "Full Body",
              focus: "Strength + Conditioning",

              exercises: [
                {
                  name: "Goblet Squat",
                  sets: 3,
                  reps: "10-12",
                  rest: 75,
                  rir: 2
                },
                {
                  name: "Push Up",
                  sets: 3,
                  reps: "8-15",
                  rest: 60,
                  rir: 2
                },
                {
                  name: "Lat Pulldown",
                  sets: 3,
                  reps: "10-12",
                  rest: 75,
                  rir: 2
                },
                {
                  name: "Walking",
                  duration: 15
                }
              ]
            },

            {
              day: 2,
              title: "Conditioning",
              focus: "Cardio",

              exercises: [
                {
                  name: "Incline Walking",
                  duration: 30
                },
                {
                  name: "Easy Cycling",
                  duration: 15
                },
                {
                  name: "Mobility",
                  duration: 10
                }
              ]
            },

            {
              day: 3,
              title: "Full Body B",
              focus: "Muscle Preservation",

              exercises: [
                {
                  name: "Leg Press",
                  sets: 3,
                  reps: "10-15",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Machine Chest Press",
                  sets: 3,
                  reps: "10-15",
                  rest: 75,
                  rir: 2
                },
                {
                  name: "Seated Row",
                  sets: 3,
                  reps: "10-15",
                  rest: 75,
                  rir: 2
                },
                {
                  name: "Walking",
                  duration: 15
                }
              ]
            }
          ]
        },

        intermediate: {
          name: "Intermediate",
          days: [

            {
              day: 1,
              title: "Strength + Cardio",
              focus: "Full Body",

              exercises: [
                {
                  name: "Leg Press",
                  sets: 4,
                  reps: "8-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Bench Press",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                  rir: 2
                },
                {
                  name: "Lat Pulldown",
                  sets: 3,
                  reps: "8-12",
                  rest: 75,
                  rir: 2
                },
                {
                  name: "Incline Walking",
                  duration: 20
                }
              ]
            },

            {
              day: 2,
              title: "HIIT",
              focus: "Conditioning",

              exercises: [
                {
                  name: "Bike Intervals",
                  rounds: 8,
                  work: 30,
                  rest: 60
                },
                {
                  name: "Walking Recovery",
                  duration: 15
                }
              ]
            },

            {
              day: 3,
              title: "Strength + Conditioning",
              focus: "Full Body",

              exercises: [
                {
                  name: "Romanian Deadlift",
                  sets: 3,
                  reps: "8-12",
                  rest: 120,
                  rir: 2
                },
                {
                  name: "Incline Dumbbell Press",
                  sets: 3,
                  reps: "8-12",
                  rest: 90,
                
