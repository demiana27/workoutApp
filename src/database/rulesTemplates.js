// Training templates based on sport, goal, level, and frequency
export const rulesTemplates = [
  {
    id: "tpl_volleyball_beginner",
    sport: "volleyball",
    level: "beginner",
    goal: "performance",
    days_per_week: 3,
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_number: 1,
            focus: "Jump Power & Squat Strength",
            exercises: [
              { movement_pattern: "jump_power", default_exercise_id: "ex_box_jump", sets: 3, reps: 5 },
              { movement_pattern: "squat", default_exercise_id: "ex_barbell_back_squat", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "horizontal_pull", default_exercise_id: "ex_chest_supported_row", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "upper_back_rehab", default_exercise_id: "ex_facepull", sets: 2, reps: 15 }
            ]
          },
          {
            day_number: 2,
            focus: "Rotational Power & Single Leg Stability",
            exercises: [
              { movement_pattern: "rotational_power", default_exercise_id: "ex_medball_rotational_throw", sets: 3, reps: 6 },
              { movement_pattern: "single_leg", default_exercise_id: "ex_bulgarian_split_squat", sets: 3, reps: 8, intensity: "RPE 8" },
              { movement_pattern: "horizontal_push", default_exercise_id: "ex_bench_press", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "knee_flexion", default_exercise_id: "ex_nordic_curl", sets: 2, reps: 8 }
            ]
          },
          {
            day_number: 3,
            focus: "Posterior Chain Power & Push Strength",
            exercises: [
              { movement_pattern: "hip_power", default_exercise_id: "ex_kettlebell_swing", sets: 3, reps: 10 },
              { movement_pattern: "hinge", default_exercise_id: "ex_romanian_deadlift", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "vertical_pull", default_exercise_id: "ex_lat_pulldown", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "vertical_push", default_exercise_id: "ex_overhead_press", sets: 2, reps: 8, intensity: "RPE 7" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tpl_soccer_beginner",
    sport: "soccer",
    level: "beginner",
    goal: "performance",
    days_per_week: 3,
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_number: 1,
            focus: "Acceleration & Lower Body Push",
            exercises: [
              { movement_pattern: "jump_power", default_exercise_id: "ex_box_jump", sets: 3, reps: 5 },
              { movement_pattern: "squat", default_exercise_id: "ex_barbell_back_squat", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_step_up", sets: 3, reps: 10 },
              { movement_pattern: "knee_flexion", default_exercise_id: "ex_nordic_curl", sets: 2, reps: 8 }
            ]
          },
          {
            day_number: 2,
            focus: "Rotational Core & Upper Body Pull",
            exercises: [
              { movement_pattern: "rotational_power", default_exercise_id: "ex_pallof_press", sets: 3, reps: 10 },
              { movement_pattern: "horizontal_pull", default_exercise_id: "ex_chest_supported_row", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "horizontal_push", default_exercise_id: "ex_bench_press", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "upper_back_rehab", default_exercise_id: "ex_facepull", sets: 2, reps: 15 }
            ]
          },
          {
            day_number: 3,
            focus: "Posterior Chain Endurance",
            exercises: [
              { movement_pattern: "hip_power", default_exercise_id: "ex_kettlebell_swing", sets: 3, reps: 10 },
              { movement_pattern: "hinge", default_exercise_id: "ex_trap_bar_deadlift", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "vertical_pull", default_exercise_id: "ex_pullup", sets: 3, reps: 6 },
              { movement_pattern: "single_leg", default_exercise_id: "ex_bulgarian_split_squat", sets: 2, reps: 8 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tpl_jiu_jitsu_beginner",
    sport: "jiu_jitsu",
    level: "beginner",
    goal: "performance",
    days_per_week: 3,
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_number: 1,
            focus: "Isometric Core & Hinge Power",
            exercises: [
              { movement_pattern: "rotational_power", default_exercise_id: "ex_pallof_press", sets: 3, reps: 10 },
              { movement_pattern: "hinge", default_exercise_id: "ex_trap_bar_deadlift", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "horizontal_pull", default_exercise_id: "ex_chest_supported_row", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_step_up", sets: 2, reps: 10 }
            ]
          },
          {
            day_number: 2,
            focus: "Posterior Chain Power & Push Strength",
            exercises: [
              { movement_pattern: "hip_power", default_exercise_id: "ex_kettlebell_swing", sets: 3, reps: 12 },
              { movement_pattern: "squat", default_exercise_id: "ex_barbell_back_squat", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "horizontal_push", default_exercise_id: "ex_bench_press", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "knee_flexion", default_exercise_id: "ex_nordic_curl", sets: 2, reps: 8 }
            ]
          },
          {
            day_number: 3,
            focus: "Rotational Speed & Pull Strength",
            exercises: [
              { movement_pattern: "rotational_power", default_exercise_id: "ex_medball_rotational_throw", sets: 3, reps: 8 },
              { movement_pattern: "vertical_pull", default_exercise_id: "ex_pullup", sets: 3, reps: 6 },
              { movement_pattern: "vertical_push", default_exercise_id: "ex_overhead_press", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_bulgarian_split_squat", sets: 2, reps: 8 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tpl_running_beginner",
    sport: "running",
    level: "beginner",
    goal: "performance",
    days_per_week: 3,
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_number: 1,
            focus: "Single Leg Power & Hinge",
            exercises: [
              { movement_pattern: "jump_power", default_exercise_id: "ex_box_jump", sets: 3, reps: 5 },
              { movement_pattern: "hinge", default_exercise_id: "ex_trap_bar_deadlift", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_step_up", sets: 3, reps: 10 },
              { movement_pattern: "knee_flexion", default_exercise_id: "ex_nordic_curl", sets: 2, reps: 8 }
            ]
          },
          {
            day_number: 2,
            focus: "Core Anti-Rotation & Posture Upper",
            exercises: [
              { movement_pattern: "rotational_power", default_exercise_id: "ex_pallof_press", sets: 3, reps: 10 },
              { movement_pattern: "horizontal_pull", default_exercise_id: "ex_chest_supported_row", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "horizontal_push", default_exercise_id: "ex_db_floor_press", sets: 3, reps: 10, intensity: "RPE 7" },
              { movement_pattern: "upper_back_rehab", default_exercise_id: "ex_facepull", sets: 2, reps: 15 }
            ]
          },
          {
            day_number: 3,
            focus: "Hip Power & Single Leg Squatting",
            exercises: [
              { movement_pattern: "hip_power", default_exercise_id: "ex_banded_hip_ext", sets: 3, reps: 15 },
              { movement_pattern: "single_leg", default_exercise_id: "ex_bulgarian_split_squat", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "vertical_pull", default_exercise_id: "ex_lat_pulldown", sets: 3, reps: 10 },
              { movement_pattern: "squat", default_exercise_id: "ex_goblet_squat_box", sets: 2, reps: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tpl_basketball_beginner",
    sport: "basketball",
    level: "beginner",
    goal: "performance",
    days_per_week: 3,
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_number: 1,
            focus: "Vertical Jump & Quad Power",
            exercises: [
              { movement_pattern: "jump_power", default_exercise_id: "ex_depth_jump", sets: 3, reps: 4 },
              { movement_pattern: "squat", default_exercise_id: "ex_barbell_back_squat", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "horizontal_pull", default_exercise_id: "ex_chest_supported_row", sets: 3, reps: 10 },
              { movement_pattern: "upper_back_rehab", default_exercise_id: "ex_facepull", sets: 2, reps: 15 }
            ]
          },
          {
            day_number: 2,
            focus: "Lateral Hip & Horizontal Press",
            exercises: [
              { movement_pattern: "rotational_power", default_exercise_id: "ex_medball_rotational_throw", sets: 3, reps: 6 },
              { movement_pattern: "single_leg", default_exercise_id: "ex_bulgarian_split_squat", sets: 3, reps: 8, intensity: "RPE 8" },
              { movement_pattern: "horizontal_push", default_exercise_id: "ex_bench_press", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "knee_flexion", default_exercise_id: "ex_nordic_curl", sets: 2, reps: 8 }
            ]
          },
          {
            day_number: 3,
            focus: "Hip Extension Power & Overhead Strength",
            exercises: [
              { movement_pattern: "hip_power", default_exercise_id: "ex_kettlebell_swing", sets: 3, reps: 10 },
              { movement_pattern: "hinge", default_exercise_id: "ex_romanian_deadlift", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "vertical_pull", default_exercise_id: "ex_lat_pulldown", sets: 3, reps: 10 },
              { movement_pattern: "vertical_push", default_exercise_id: "ex_overhead_press", sets: 2, reps: 8, intensity: "RPE 7" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tpl_bodybuilding_beginner",
    sport: "bodybuilding",
    level: "beginner",
    goal: "hypertrophy",
    days_per_week: 3,
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_number: 1,
            focus: "Push Focus (Chest, Shoulders, Triceps)",
            exercises: [
              { movement_pattern: "horizontal_push", default_exercise_id: "ex_bench_press", sets: 4, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "vertical_push", default_exercise_id: "ex_overhead_press", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "squat", default_exercise_id: "ex_barbell_back_squat", sets: 3, reps: 10, intensity: "RPE 7" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_step_up", sets: 2, reps: 12 }
            ]
          },
          {
            day_number: 2,
            focus: "Pull Focus (Back, Rear Delts, Biceps)",
            exercises: [
              { movement_pattern: "vertical_pull", default_exercise_id: "ex_lat_pulldown", sets: 4, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "horizontal_pull", default_exercise_id: "ex_chest_supported_row", sets: 3, reps: 12, intensity: "RPE 8" },
              { movement_pattern: "hinge", default_exercise_id: "ex_romanian_deadlift", sets: 3, reps: 10, intensity: "RPE 7" },
              { movement_pattern: "upper_back_rehab", default_exercise_id: "ex_facepull", sets: 3, reps: 15 }
            ]
          },
          {
            day_number: 3,
            focus: "Legs Focus (Quads, Hamstrings, Glutes)",
            exercises: [
              { movement_pattern: "squat", default_exercise_id: "ex_leg_press", sets: 4, reps: 12, intensity: "RPE 8" },
              { movement_pattern: "hinge", default_exercise_id: "ex_hip_thrust", sets: 3, reps: 12, intensity: "RPE 8" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_bulgarian_split_squat", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "knee_flexion", default_exercise_id: "ex_nordic_curl", sets: 3, reps: 8 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tpl_general_fitness_beginner",
    sport: "general_fitness",
    level: "beginner",
    goal: "general_fitness",
    days_per_week: 3,
    weeks: [
      {
        week_number: 1,
        days: [
          {
            day_number: 1,
            focus: "Full Body Strength & Core",
            exercises: [
              { movement_pattern: "squat", default_exercise_id: "ex_goblet_squat_box", sets: 3, reps: 10, intensity: "RPE 7" },
              { movement_pattern: "horizontal_pull", default_exercise_id: "ex_chest_supported_row", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "horizontal_push", default_exercise_id: "ex_db_floor_press", sets: 3, reps: 10, intensity: "RPE 7" },
              { movement_pattern: "rotational_power", default_exercise_id: "ex_pallof_press", sets: 2, reps: 12 }
            ]
          },
          {
            day_number: 2,
            focus: "Posterior Hinge & Pull Stability",
            exercises: [
              { movement_pattern: "hinge", default_exercise_id: "ex_trap_bar_deadlift", sets: 3, reps: 8, intensity: "RPE 7" },
              { movement_pattern: "vertical_pull", default_exercise_id: "ex_lat_pulldown", sets: 3, reps: 10, intensity: "RPE 8" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_step_up", sets: 3, reps: 10 },
              { movement_pattern: "upper_back_rehab", default_exercise_id: "ex_facepull", sets: 2, reps: 15 }
            ]
          },
          {
            day_number: 3,
            focus: "Explosiveness & Upper Pressing",
            exercises: [
              { movement_pattern: "hip_power", default_exercise_id: "ex_kettlebell_swing", sets: 3, reps: 12 },
              { movement_pattern: "vertical_push", default_exercise_id: "ex_landmine_press", sets: 3, reps: 10, intensity: "RPE 7" },
              { movement_pattern: "single_leg", default_exercise_id: "ex_bulgarian_split_squat", sets: 2, reps: 8 },
              { movement_pattern: "knee_flexion", default_exercise_id: "ex_nordic_curl", sets: 2, reps: 8 }
            ]
          }
        ]
      }
    ]
  }
];
