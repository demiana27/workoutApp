export const TRAINING_GOALS = [
  { id: "performance", label: "Athletic Performance & Power", description: "Speed, explosiveness, sport-specific strength" },
  { id: "hypertrophy", label: "Muscle Hypertrophy", description: "Build size and muscle mass" },
  { id: "fat_loss", label: "Fat Loss & Conditioning", description: "Lean out, body recomposition, high thermic output" },
  { id: "general_fitness", label: "General Health & Fitness", description: "Overall wellness and movement quality" },
  { id: "strength", label: "Max Strength", description: "Increase 1RM on key lifts" },
  { id: "endurance", label: "Endurance & Stamina", description: "Aerobic base and repeat-effort capacity" },
  { id: "flexibility", label: "Flexibility & Mobility", description: "Stretching, yoga-style recovery, joint range of motion" },
  { id: "mobility", label: "Mobility & Recovery", description: "Flexibility, joint health, injury prevention" },
  { id: "speed", label: "Speed & Agility", description: "Sprint mechanics, change of direction" }
];

export const GENDER_OPTIONS = [
  { id: "male", label: "Male / Boy", description: "Standard hormonal strength & power protocols" },
  { id: "female", label: "Female / Girl", description: "Option to enable female cycle-aware training & recovery" },
  { id: "prefer_not_to_say", label: "Prefer Not to Say", description: "Standard athletic performance programming" }
];

export const FEMALE_CYCLE_PHASES = [
  { id: "none", label: "No Cycle Tracking", description: "Skip cycle-specific workout adjustments" },
  { id: "follicular", label: "Follicular Phase (Days 1–14)", description: "High energy, high strength potential, peak recovery capacity" },
  { id: "ovulatory", label: "Ovulatory Phase (Peak)", description: "Peak strength & power, monitor joint laxity/ACL stability" },
  { id: "luteal", label: "Luteal Phase (Days 15–28)", description: "Higher core temp, focus on steady-state effort, extra hydration" },
  { id: "menstrual", label: "Menstrual Phase (Period)", description: "Focus on gentle mobility, light conditioning, cramp relief" }
];

export const HYPERACTIVITY_OPTIONS = [
  { id: "standard", label: "Standard Energy Level", description: "Standard volume and rest intervals between sets" },
  { id: "high_energy", label: "Hyperactive / High Energy", description: "Higher work capacity, extra agility/plyo drills, faster paced transitions" }
];

export const MEDICAL_CONDITIONS = [
  { id: "asthma", label: "Asthma / Respiratory Sensitivity", description: "Includes longer rest periods and gradual cardio warmups" },
  { id: "high_bp", label: "High Blood Pressure / Hypertension", description: "Avoids prolonged breath holding (Valsalva) and extreme isometric strain" },
  { id: "joint_inflammation", label: "Joint Inflammation / Arthritis", description: "Low-impact plyometric options and extra joint mobility" },
  { id: "diabetes", label: "Diabetes / Blood Sugar Tracking", description: "Balanced energy system demands with intra-workout fueling notes" },
  { id: "past_surgery", label: "Past Surgery / Reconstruction", description: "Protects surgical regions with controlled range-of-motion drills" }
];

export const ATHLETIC_EQUIPMENT_ITEMS = [
  { id: "agility_ladder", label: "Agility Speed Ladder", icon: "🪜", category: "speed" },
  { id: "barriers_hurdles", label: "Barriers / Mini Hurdles", icon: "🚧", category: "plyo" },
  { id: "resistance_bands", label: "Resistance Bands (Loop/Mini)", icon: "🎗️", category: "activation" },
  { id: "dumbbells", label: "Dumbbells", icon: "🏋️", category: "strength" },
  { id: "barbell", label: "Barbell & Plates", icon: "🏋️‍♂️", category: "strength" },
  { id: "kettlebell", label: "Kettlebell", icon: "🔔", category: "power" },
  { id: "jump_rope", label: "Jump Rope", icon: "🪢", category: "conditioning" },
  { id: "plyo_box", label: "Plyo Box / Bench", icon: "📦", category: "plyo" },
  { id: "medicine_ball", label: "Medicine Ball", icon: "⚽", category: "power" },
  { id: "bodyweight", label: "Bodyweight Only", icon: "🧘", category: "general" }
];

export const SPORT_CATEGORIES = [
  {
    id: "team",
    label: "Team Sports",
    sports: [
      { id: "soccer", label: "Soccer / Football" },
      { id: "american_football", label: "American Football" },
      { id: "rugby", label: "Rugby" },
      { id: "rugby_league", label: "Rugby League" },
      { id: "basketball", label: "Basketball" },
      { id: "volleyball", label: "Volleyball" },
      { id: "baseball", label: "Baseball" },
      { id: "softball", label: "Softball" },
      { id: "ice_hockey", label: "Ice Hockey" },
      { id: "field_hockey", label: "Field Hockey" },
      { id: "lacrosse", label: "Lacrosse" },
      { id: "handball", label: "Handball" },
      { id: "water_polo", label: "Water Polo" },
      { id: "cricket", label: "Cricket" },
      { id: "netball", label: "Netball" },
      { id: "aussie_rules", label: "Australian Rules Football" },
      { id: "gaelic_football", label: "Gaelic Football" },
      { id: "hurling", label: "Hurling" },
      { id: "futsal", label: "Futsal" },
      { id: "floorball", label: "Floorball / Innebandy" }
    ]
  },
  {
    id: "combat",
    label: "Combat & Martial Arts",
    sports: [
      { id: "jiu_jitsu", label: "Jiu-Jitsu / BJJ" },
      { id: "mma", label: "MMA" },
      { id: "boxing", label: "Boxing" },
      { id: "wrestling", label: "Wrestling" },
      { id: "muay_thai", label: "Muay Thai" },
      { id: "judo", label: "Judo" },
      { id: "karate", label: "Karate" },
      { id: "taekwondo", label: "Taekwondo" },
      { id: "kickboxing", label: "Kickboxing" },
      { id: "sambo", label: "Sambo" },
      { id: "krav_maga", label: "Krav Maga" },
      { id: "capoeira", label: "Capoeira" },
      { id: "kung_fu", label: "Kung Fu / Wushu" }
    ]
  },
  {
    id: "endurance",
    label: "Endurance & Water Sports",
    sports: [
      { id: "running", label: "Track & Running" },
      { id: "cross_country", label: "Cross Country" },
      { id: "marathon", label: "Marathon / Distance Running" },
      { id: "cycling", label: "Cycling" },
      { id: "swimming", label: "Swimming" },
      { id: "rowing", label: "Rowing" },
      { id: "triathlon", label: "Triathlon" },
      { id: "canoeing", label: "Canoeing / Kayaking" },
      { id: "open_water_swimming", label: "Open Water Swimming" },
      { id: "duathlon", label: "Duathlon" },
      { id: "orienteering", label: "Orienteering" },
      { id: "racewalking", label: "Race Walking" }
    ]
  },
  {
    id: "strength",
    label: "Strength & Power",
    sports: [
      { id: "bodybuilding", label: "Bodybuilding" },
      { id: "powerlifting", label: "Powerlifting" },
      { id: "olympic_weightlifting", label: "Olympic Weightlifting" },
      { id: "strongman", label: "Strongman" },
      { id: "crossfit", label: "CrossFit / Functional Fitness" },
      { id: "highland_games", label: "Highland Games" },
      { id: "armwrestling", label: "Arm Wrestling" }
    ]
  },
  {
    id: "racket",
    label: "Racket & Court Sports",
    sports: [
      { id: "tennis", label: "Tennis" },
      { id: "badminton", label: "Badminton" },
      { id: "squash", label: "Squash" },
      { id: "table_tennis", label: "Table Tennis" },
      { id: "pickleball", label: "Pickleball" },
      { id: "padel", label: "Padel" },
      { id: "racquetball", label: "Racquetball" }
    ]
  },
  {
    id: "track_field",
    label: "Track & Field / Athletics",
    sports: [
      { id: "sprints", label: "Sprints (100m / 200m / 400m)" },
      { id: "hurdles", label: "Hurdles" },
      { id: "long_jump", label: "Long Jump / Triple Jump" },
      { id: "high_jump", label: "High Jump / Pole Vault" },
      { id: "shot_put", label: "Shot Put / Discus / Hammer" },
      { id: "javelin", label: "Javelin" },
      { id: "decathlon", label: "Decathlon / Heptathlon" },
      { id: "middle_distance", label: "Middle Distance (800m–1500m)" }
    ]
  },
  {
    id: "outdoor_adventure",
    label: "Outdoor & Adventure Sports",
    sports: [
      { id: "rock_climbing", label: "Rock Climbing / Bouldering" },
      { id: "skiing", label: "Alpine Skiing" },
      { id: "ski_cross", label: "Ski Cross / Moguls" },
      { id: "snowboarding", label: "Snowboarding" },
      { id: "surfing", label: "Surfing" },
      { id: "kitesurfing", label: "Kitesurfing / Windsurfing" },
      { id: "mountain_biking", label: "Mountain Biking" },
      { id: "trail_running", label: "Trail Running / Ultramarathon" },
      { id: "obstacle_course", label: "Obstacle Course / Spartan Race" },
      { id: "skateboarding", label: "Skateboarding" },
      { id: "bmx", label: "BMX / Freestyle Cycling" },
      { id: "parkour", label: "Parkour / Freerunning" }
    ]
  },
  {
    id: "artistic",
    label: "Artistic & Precision Sports",
    sports: [
      { id: "gymnastics", label: "Gymnastics" },
      { id: "rhythmic_gymnastics", label: "Rhythmic Gymnastics" },
      { id: "artistic_swimming", label: "Artistic Swimming" },
      { id: "dance", label: "Dance" },
      { id: "cheerleading", label: "Cheerleading" },
      { id: "figure_skating", label: "Figure Skating" },
      { id: "diving", label: "Diving" },
      { id: "trampolining", label: "Trampolining" },
      { id: "golf", label: "Golf" },
      { id: "archery", label: "Archery" },
      { id: "equestrian", label: "Equestrian / Horse Riding" }
    ]
  },
  {
    id: "winter",
    label: "Winter Sports",
    sports: [
      { id: "cross_country_ski", label: "Cross-Country Skiing" },
      { id: "biathlon", label: "Biathlon" },
      { id: "speed_skating", label: "Speed Skating" },
      { id: "short_track", label: "Short Track Speed Skating" },
      { id: "bobsled", label: "Bobsled / Luge / Skeleton" },
      { id: "curling", label: "Curling" }
    ]
  },
  {
    id: "other",
    label: "Other Disciplines",
    sports: [
      { id: "general_fitness", label: "General Fitness / Multi-Sport" },
      { id: "yoga", label: "Yoga / Pilates" },
      { id: "crosstraining", label: "Cross-Training / Functional" },
      { id: "esports_performance", label: "Esports Performance Training" },
      { id: "other", label: "Other (specify below)" }
    ]
  }
];

export const ALL_SPORTS = SPORT_CATEGORIES.flatMap((category) => category.sports);

export const DAYS_PER_WEEK_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

export const FLEXIBILITY_SESSION_TYPES = [
  { id: "none", label: "No Dedicated Flexibility Day", description: "Skip standalone flexibility sessions" },
  { id: "one_day", label: "1 Day / Week", description: "One full flexibility & stretching recovery session" },
  { id: "two_days", label: "2 Days / Week", description: "Two flexibility / mobility recovery sessions" },
  { id: "after_every", label: "After Every Session", description: "15-min cool-down stretch after each training day" }
];

export function getSportLabel(sportId, customSportName = "") {
  if (sportId === "other" && customSportName.trim()) {
    return customSportName.trim();
  }
  const sport = ALL_SPORTS.find((s) => s.id === sportId);
  return sport ? sport.label : sportId ? sportId.replace(/_/g, " ") : "General Athletic";
}

export function getSportsLabels(sportIds, customSportName = "") {
  if (!sportIds || !sportIds.length) return "General Athletic";
  return sportIds.map((id) => getSportLabel(id, id === "other" ? customSportName : "")).join(", ");
}

export function getGoalLabel(goalId) {
  const goal = TRAINING_GOALS.find((g) => g.id === goalId);
  return goal ? goal.label : goalId.replace(/_/g, " ");
}

export function formatGoalsDisplay(goals) {
  if (!goals) return "";
  const list = Array.isArray(goals) ? goals : [goals];
  return list.map(getGoalLabel).join(", ");
}
