// Seed Athletic & Home Exercise Library
export const exerciseDb = [
  // ── 1. Dynamic Warmup & Mobility Exercises ──
  {
    id: "ex_dynamic_hip_opener",
    name: "World's Greatest Stretch & Hip Opener",
    movement_pattern: "warmup_mobility",
    phase: "warmup",
    equipment_needed: ["bodyweight"],
    body_regions: ["hips", "hamstrings", "thoracic_spine"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/2GLrKr54yA0",
    tips: "Step deep into a lunge, drop inside elbow to heel, reach opposite arm to the sky."
  },
  {
    id: "ex_banded_glute_bridge",
    name: "Mini-Band Glute Activation Bridge",
    movement_pattern: "warmup_activation",
    phase: "warmup",
    equipment_needed: ["resistance_bands", "bodyweight"],
    body_regions: ["glutes"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/m49yQv_Z5X0",
    tips: "Place mini-band above knees, drive through heels, push knees out against band tension."
  },
  {
    id: "ex_pogo_hops",
    name: "Ankle Stiffness Pogo Hops",
    movement_pattern: "warmup_activation",
    phase: "warmup",
    equipment_needed: ["bodyweight"],
    body_regions: ["calves", "ankles"],
    injury_flags: ["ankle_pain"],
    video_url: "https://www.youtube.com/embed/94r_Ym2e4a8",
    tips: "Bounce dynamically off the balls of your feet keeping knees stiff to build ankle elasticity."
  },

  // ── 2. Speed, Agility & Footwork Drills ──
  {
    id: "ex_ladder_ickey_shuffle",
    name: "Agility Ladder: Ickey Shuffle",
    movement_pattern: "footwork_agility",
    phase: "agility_speed",
    equipment_needed: ["agility_ladder", "bodyweight"],
    body_regions: ["calves", "quads", "hip_flexors"],
    injury_flags: ["knee_pain", "ankle_pain"],
    video_url: "https://www.youtube.com/embed/sS0KFAZ-M98",
    tips: "In-in-out rhythm through each ladder rung with fast light feet and athletic chest posture."
  },
  {
    id: "ex_ladder_in_out",
    name: "Agility Ladder: In-Out Fast Feet",
    movement_pattern: "footwork_agility",
    phase: "agility_speed",
    equipment_needed: ["agility_ladder", "bodyweight"],
    body_regions: ["calves", "hip_flexors"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/Xq45Nf1w8rI",
    tips: "Pump arms synchronously as feet move rapidly inside and outside the ladder rungs."
  },
  {
    id: "ex_barrier_lateral_hops",
    name: "Mini-Barrier / Hurdle Lateral Hops",
    movement_pattern: "lateral_agility",
    phase: "agility_speed",
    equipment_needed: ["barriers_hurdles", "bodyweight"],
    body_regions: ["calves", "quads", "ankles"],
    injury_flags: ["ankle_pain"],
    video_url: "https://www.youtube.com/embed/d3H_vT_934o",
    tips: "Hop side-to-side over 6-inch barriers quickly, maintaining a low center of gravity."
  },
  {
    id: "ex_barrier_linear_over_under",
    name: "Hurdle Linear Jump & Stick",
    movement_pattern: "jump_power",
    phase: "agility_speed",
    equipment_needed: ["barriers_hurdles", "bodyweight"],
    body_regions: ["quads", "glutes", "knees"],
    injury_flags: ["knee_pain"],
    video_url: "https://www.youtube.com/embed/8v_gW2wA3_g",
    tips: "Drive knees over hurdle, land softly on mid-foot with 2-second stick stability."
  },
  {
    id: "ex_banded_sprint_start",
    name: "Resisted Band Acceleration Starts",
    movement_pattern: "acceleration",
    phase: "agility_speed",
    equipment_needed: ["resistance_bands", "bodyweight"],
    body_regions: ["quads", "glutes", "calves"],
    injury_flags: ["knee_pain"],
    video_url: "https://www.youtube.com/embed/Xm1z90V89x0",
    tips: "Drive off front leg at 45-degree body angle against band resistance for explosive first 3 steps."
  },

  // ── 3. Plyometrics & Jump Power ──
  {
    id: "ex_depth_jump",
    name: "Depth Jump",
    movement_pattern: "jump_power",
    phase: "agility_speed",
    equipment_needed: ["plyo_box", "bodyweight"],
    body_regions: ["quads", "calves", "knees", "ankles"],
    injury_flags: ["knee_pain", "ankle_pain"],
    video_url: "https://www.youtube.com/embed/M1O7P3O5k3I",
    tips: "Step off a 12-18 inch box, land softly on both feet, and immediately jump upward."
  },
  {
    id: "ex_box_jump",
    name: "Box Jump (Step Down)",
    movement_pattern: "jump_power",
    phase: "agility_speed",
    equipment_needed: ["plyo_box", "bodyweight"],
    body_regions: ["quads", "glutes", "calves"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/52r_UIooPgw",
    tips: "Jump onto the box, land softly in a partial squat, stand tall, and step down one foot at a time."
  },
  {
    id: "ex_broad_jump_stick",
    name: "Explosive Broad Jump to Stick",
    movement_pattern: "jump_power",
    phase: "agility_speed",
    equipment_needed: ["bodyweight"],
    body_regions: ["glutes", "hamstrings", "quads"],
    injury_flags: ["knee_pain"],
    video_url: "https://www.youtube.com/embed/x_Nn9Z-Z88M",
    tips: "Swing arms back, explode forward for maximum distance, absorb landing cleanly."
  },
  {
    id: "ex_medball_rotational_throw",
    name: "Medicine Ball Rotational Throw",
    movement_pattern: "rotational_power",
    phase: "strength_power",
    equipment_needed: ["medicine_ball"],
    body_regions: ["core", "obliques", "shoulders", "hips"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/j4K13h-C0tE",
    tips: "Stand sideways to a wall, wind up hips, and throw medicine ball dynamically using your core."
  },

  // ── 4. Main Compound Strength & Power ──
  {
    id: "ex_barbell_back_squat",
    name: "Barbell Back Squat",
    movement_pattern: "squat",
    phase: "strength_power",
    equipment_needed: ["barbell"],
    body_regions: ["quads", "glutes", "lower_back"],
    injury_flags: ["knee_pain", "lower_back_pain"],
    video_url: "https://www.youtube.com/embed/QKKZ9QT8F5M",
    tips: "Drive through the heels, keep your chest up, and maintain a neutral spine."
  },
  {
    id: "ex_db_goblet_squat",
    name: "Dumbbell Goblet Squat",
    movement_pattern: "squat",
    phase: "strength_power",
    equipment_needed: ["dumbbells", "kettlebell", "bodyweight"],
    body_regions: ["quads", "glutes"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/pJUJ3Y5Wd_4",
    tips: "Hold dumbbell vertically at chest, sit hips down between ankles, keep elbows inside knees."
  },
  {
    id: "ex_leg_press",
    name: "Sled Leg Press",
    movement_pattern: "squat",
    phase: "strength_power",
    equipment_needed: ["barbell"],
    body_regions: ["quads", "glutes"],
    injury_flags: ["knee_pain"],
    video_url: "https://www.youtube.com/embed/yZMX_D1g3hs",
    tips: "Set feet shoulder-width apart, do not lock out your knees at the top."
  },
  {
    id: "ex_romanian_deadlift",
    name: "Barbell Romanian Deadlift",
    movement_pattern: "hinge",
    phase: "strength_power",
    equipment_needed: ["barbell"],
    body_regions: ["hamstrings", "glutes", "lower_back"],
    injury_flags: ["lower_back_pain"],
    video_url: "https://www.youtube.com/embed/JCXUYuzw0yU",
    tips: "Hinge at the hips, keep the barbell close to your thighs, do not round your back."
  },
  {
    id: "ex_db_romanian_deadlift",
    name: "Dumbbell Romanian Deadlift",
    movement_pattern: "hinge",
    phase: "strength_power",
    equipment_needed: ["dumbbells", "kettlebell"],
    body_regions: ["hamstrings", "glutes"],
    injury_flags: ["lower_back_pain"],
    video_url: "https://www.youtube.com/embed/F42j3NkWUbg",
    tips: "Keep dumbbells close to shin bones, push glutes back, pull shoulders down."
  },
  {
    id: "ex_trap_bar_deadlift",
    name: "Trap Bar Deadlift (High Handles)",
    movement_pattern: "hinge",
    phase: "strength_power",
    equipment_needed: ["barbell"],
    body_regions: ["hamstrings", "glutes", "quads", "lower_back"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/y-wV4fR1kbM",
    tips: "Stand inside the bar, sit your hips back, drive the floor away through your heels."
  },
  {
    id: "ex_kettlebell_swing",
    name: "Kettlebell Swing",
    movement_pattern: "hip_power",
    phase: "strength_power",
    equipment_needed: ["kettlebell", "dumbbells"],
    body_regions: ["glutes", "hamstrings", "lower_back"],
    injury_flags: ["lower_back_pain"],
    video_url: "https://www.youtube.com/embed/sSEQD5_sCgM",
    tips: "Hinge at the hips, snap hips forward to swing kettlebell, do not raise it with your arms."
  },
  {
    id: "ex_bench_press",
    name: "Barbell Bench Press",
    movement_pattern: "horizontal_push",
    phase: "strength_power",
    equipment_needed: ["barbell"],
    body_regions: ["chest", "shoulders", "triceps"],
    injury_flags: ["shoulder_pain"],
    video_url: "https://www.youtube.com/embed/gRVjAtPip0Y",
    tips: "Keep shoulder blades retracted, touch the bar to mid-chest, drive feet into the floor."
  },
  {
    id: "ex_db_bench_press",
    name: "Dumbbell Bench Press",
    movement_pattern: "horizontal_push",
    phase: "strength_power",
    equipment_needed: ["dumbbells"],
    body_regions: ["chest", "shoulders", "triceps"],
    injury_flags: ["shoulder_pain"],
    video_url: "https://www.youtube.com/embed/VmB1G1K7vDA",
    tips: "Lower dumbbells under control with elbows angled at 45 degrees, press straight up over chest."
  },
  {
    id: "ex_db_floor_press",
    name: "Dumbbell Floor Press",
    movement_pattern: "horizontal_push",
    phase: "strength_power",
    equipment_needed: ["dumbbells", "bodyweight"],
    body_regions: ["chest", "triceps"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/uUGDRwge4F8",
    tips: "Lie on the floor, lower dumbbells until elbows touch the ground lightly, then press."
  },
  {
    id: "ex_overhead_press",
    name: "Barbell Overhead Press",
    movement_pattern: "vertical_push",
    phase: "strength_power",
    equipment_needed: ["barbell"],
    body_regions: ["shoulders", "triceps", "core"],
    injury_flags: ["shoulder_pain", "lower_back_pain"],
    video_url: "https://www.youtube.com/embed/2yjwxtgArHs",
    tips: "Squeeze glutes and abs, press bar straight up, pull head back to let bar pass."
  },
  {
    id: "ex_db_overhead_press",
    name: "Seated Dumbbell Shoulder Press",
    movement_pattern: "vertical_push",
    phase: "strength_power",
    equipment_needed: ["dumbbells"],
    body_regions: ["shoulders", "triceps"],
    injury_flags: ["shoulder_pain"],
    video_url: "https://www.youtube.com/embed/qEwKCR5JCog",
    tips: "Press dumbbells up vertically, keeping core tight and avoiding excessive lumbar arching."
  },
  {
    id: "ex_pullup",
    name: "Bodyweight Pull-Up",
    movement_pattern: "vertical_pull",
    phase: "strength_power",
    equipment_needed: ["bodyweight"],
    body_regions: ["lats", "upper_back", "biceps"],
    injury_flags: ["shoulder_pain"],
    video_url: "https://www.youtube.com/embed/eGo4IYlbE5g",
    tips: "Pull from dead hang, drive elbows down, touch chest to the bar."
  },
  {
    id: "ex_lat_pulldown",
    name: "Cable Lat Pulldown",
    movement_pattern: "vertical_pull",
    phase: "strength_power",
    equipment_needed: ["barbell"],
    body_regions: ["lats", "upper_back", "biceps"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/CAwf7n6Luuc",
    tips: "Pull bar to upper chest, lean back slightly, squeeze shoulder blades together."
  },
  {
    id: "ex_chest_supported_row",
    name: "Dumbbell Chest Supported Row",
    movement_pattern: "horizontal_pull",
    phase: "strength_power",
    equipment_needed: ["dumbbells"],
    body_regions: ["upper_back", "lats", "biceps"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/0G2wHUTV_O8",
    tips: "Lie chest down on incline bench, pull dumbbells to ribs, keeping elbows at 45 degrees."
  },
  {
    id: "ex_banded_row",
    name: "Banded Standing Row",
    movement_pattern: "horizontal_pull",
    phase: "strength_power",
    equipment_needed: ["resistance_bands", "bodyweight"],
    body_regions: ["upper_back", "lats"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/LkWZ5c15qF8",
    tips: "Anchor band to fixed post, pull handles to ribcage, squeeze shoulder blades for 2 seconds."
  },
  {
    id: "ex_bulgarian_split_squat",
    name: "Dumbbell Bulgarian Split Squat",
    movement_pattern: "single_leg",
    phase: "strength_power",
    equipment_needed: ["dumbbells", "plyo_box", "bodyweight"],
    body_regions: ["quads", "glutes"],
    injury_flags: ["knee_pain"],
    video_url: "https://www.youtube.com/embed/2C-uNgKwPLE",
    tips: "Place back foot on bench, hop front foot out, lower hips until back knee is just above floor."
  },
  {
    id: "ex_step_up",
    name: "Dumbbell Step-Up (Vertical Shin)",
    movement_pattern: "single_leg",
    phase: "strength_power",
    equipment_needed: ["dumbbells", "plyo_box", "bodyweight"],
    body_regions: ["quads", "glutes"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/dQqApCGd5Ys",
    tips: "Place foot on 12-18 inch box, drive shin vertically, step up concentrating load on front leg."
  },

  // ── 5. Sport Conditioning & Energy Systems ──
  {
    id: "ex_shuttle_runs",
    name: "High-Intensity Shuttle Sprints (10m x 20m)",
    movement_pattern: "conditioning_shuttle",
    phase: "conditioning",
    equipment_needed: ["bodyweight"],
    body_regions: ["quads", "hamstrings", "calves", "cardio"],
    injury_flags: ["knee_pain"],
    video_url: "https://www.youtube.com/embed/YpS8Vn_xX_E",
    tips: "Sprint to marker, decelerate rapidly, touch ground, and explode in opposite direction."
  },
  {
    id: "ex_jump_rope_intervals",
    name: "Double-Under Jump Rope Conditioning",
    movement_pattern: "conditioning_cardio",
    phase: "conditioning",
    equipment_needed: ["jump_rope", "bodyweight"],
    body_regions: ["calves", "cardio", "shoulders"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/hcuO_S6d34I",
    tips: "Keep wrist movements quick, jump on balls of feet for high-bpm cardiovascular conditioning."
  },
  {
    id: "ex_mountain_climbers_fast",
    name: "Explosive Mountain Climber Intervals",
    movement_pattern: "conditioning_core",
    phase: "conditioning",
    equipment_needed: ["bodyweight"],
    body_regions: ["core", "shoulders", "hip_flexors", "cardio"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/cnyTAXRe0wM",
    tips: "Hold strong pushup plank, drive knees forward rapidly without bouncing hips high."
  },

  // ── 6. Cool-Down & Recovery ──
  {
    id: "ex_cooldown_foam_roll",
    name: "Full Body Foam Roll & Static Hamstring Stretch",
    movement_pattern: "cooldown_recovery",
    phase: "cooldown",
    equipment_needed: ["bodyweight"],
    body_regions: ["hamstrings", "quads", "glutes", "lats"],
    injury_flags: [],
    video_url: "https://www.youtube.com/embed/0Gv_3Zl61Y0",
    tips: "Spend 60 seconds on tight muscle groups, breathing deep to activate parasympathetic recovery."
  }
];
