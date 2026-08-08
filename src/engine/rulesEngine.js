import { exerciseDb } from "../database/exerciseDb";
import { rulesTemplates } from "../database/rulesTemplates";

/**
 * Adjusts day count for requested frequency
 */
function adjustDaysForFrequency(weeks, daysPerWeek) {
  if (!daysPerWeek) return weeks;

  return weeks.map((week) => {
    const templateDays = week.days;
    let adjustedDays = [...templateDays];

    if (daysPerWeek < templateDays.length) {
      adjustedDays = templateDays.slice(0, daysPerWeek);
    } else if (daysPerWeek > templateDays.length) {
      const extraCount = daysPerWeek - templateDays.length;
      for (let i = 0; i < extraCount; i++) {
        const sourceDay = templateDays[i % templateDays.length];
        adjustedDays.push({
          ...JSON.parse(JSON.stringify(sourceDay)),
          day_number: templateDays.length + i + 1,
          focus: `${sourceDay.focus} (Extra Athletic Session)`
        });
      }
    }

    adjustedDays = adjustedDays.map((day, index) => ({
      ...day,
      day_number: index + 1
    }));

    return { ...week, days: adjustedDays };
  });
}

/**
 * Ensures workout exercises are grouped into 5 authentic athletic phases:
 * 1. Warmup & Mobility
 * 2. Speed, Agility & Footwork (Ladder / Barriers / Plyo)
 * 3. Athletic Strength & Power
 * 4. Conditioning & Stamina
 * 5. Cool-Down & Recovery
 */
function buildPhasedAthleticExercises(rawExercises, intake = {}) {
  const {
    injuries = [],
    athleteNotes = "",
    hyperactivity = "standard",
    medicalConditions = []
  } = intake;

  const notesLower = athleteNotes.toLowerCase();
  const isExplosiveFocus = notesLower.includes("explosive") || notesLower.includes("dunk") || notesLower.includes("jump") || notesLower.includes("power");
  const isSpeedFocus = notesLower.includes("speed") || notesLower.includes("footwork") || notesLower.includes("agility") || notesLower.includes("quick");
  const isHighEnergy = hyperactivity === "high_energy";

  // Phase 1: Dynamic Warmup
  const warmupEx = exerciseDb.find((ex) => ex.id === "ex_dynamic_hip_opener") || exerciseDb[0];
  const activationEx = exerciseDb.find((ex) => ex.id === "ex_banded_glute_bridge") || exerciseDb[1];

  // Phase 2: Agility / Speed / Footwork / Plyo
  let agilityEx = exerciseDb.find((ex) => ex.id === "ex_ladder_ickey_shuffle");
  if (isExplosiveFocus) {
    agilityEx = exerciseDb.find((ex) => ex.id === "ex_depth_jump") || exerciseDb.find((ex) => ex.id === "ex_broad_jump_stick");
  } else if (isSpeedFocus) {
    agilityEx = exerciseDb.find((ex) => ex.id === "ex_barrier_lateral_hops") || exerciseDb.find((ex) => ex.id === "ex_ladder_in_out");
  }

  // Phase 3: Strength & Power (from template raw exercises)
  const strengthExs = rawExercises.map((templateEx) => {
    let activeExercise = exerciseDb.find((ex) => ex.id === templateEx.default_exercise_id);
    if (!activeExercise) {
      activeExercise = exerciseDb.find((ex) => ex.movement_pattern === templateEx.movement_pattern);
    }

    let isSwapped = false;
    let originalName = "";

    // Injury check
    const hasInjuryConflict = activeExercise && activeExercise.injury_flags.some((flag) => injuries.includes(flag));
    if (hasInjuryConflict) {
      const alternative = exerciseDb.find(
        (ex) =>
          ex.movement_pattern === templateEx.movement_pattern &&
          !ex.injury_flags.some((flag) => injuries.includes(flag))
      );
      if (alternative) {
        originalName = activeExercise.name;
        activeExercise = alternative;
        isSwapped = true;
      }
    }

    // Set adjustments for high energy & experience level
    let sets = templateEx.sets || 3;
    let reps = templateEx.reps || 8;
    let intensity = templateEx.intensity || "RPE 8";

    if (intake.level === "beginner") {
      sets = 3;
      reps = 10;
      intensity = "RPE 6-7 (Technique & Control)";
    } else if (intake.level === "intermediate") {
      sets = 3;
      reps = 8;
      intensity = "RPE 7-8 (Progressive Overload)";
    } else if (intake.level === "advanced" || intake.level === "elite") {
      sets = isHighEnergy ? 5 : 4;
      reps = 6;
      intensity = "RPE 8.5-9 (Max Power & Hypertrophy)";
    }

    if (isHighEnergy && intake.level !== "beginner") sets += 1;

    return {
      id: activeExercise ? activeExercise.id : templateEx.default_exercise_id,
      name: activeExercise ? activeExercise.name : "Custom Athletic Lift",
      phase: "strength_power",
      movement_pattern: templateEx.movement_pattern,
      sets: sets,
      reps: reps,
      intensity: intensity,
      equipment_needed: activeExercise ? activeExercise.equipment_needed || ["dumbbells"] : ["dumbbells"],
      video_url: activeExercise ? activeExercise.video_url : "",
      tips: activeExercise ? activeExercise.tips : "Control the eccentric phase and explode upward.",
      swapped: isSwapped,
      original_name: originalName
    };
  });

  // Phase 4: Conditioning
  const conditioningEx = exerciseDb.find((ex) => ex.id === "ex_shuttle_runs") || exerciseDb.find((ex) => ex.id === "ex_jump_rope_intervals");

  // Phase 5: Cooldown
  const cooldownEx = exerciseDb.find((ex) => ex.id === "ex_cooldown_foam_roll");

  // Combine into single phased array
  const fullPhaseList = [
    {
      id: warmupEx.id,
      name: warmupEx.name,
      phase: "warmup",
      movement_pattern: warmupEx.movement_pattern,
      sets: 2,
      reps: 10,
      intensity: "Dynamic Mobility",
      equipment_needed: warmupEx.equipment_needed,
      video_url: warmupEx.video_url,
      tips: warmupEx.tips
    },
    {
      id: activationEx.id,
      name: activationEx.name,
      phase: "warmup",
      movement_pattern: activationEx.movement_pattern,
      sets: 2,
      reps: 12,
      intensity: "Neural Activation",
      equipment_needed: activationEx.equipment_needed,
      video_url: activationEx.video_url,
      tips: activationEx.tips
    },
    {
      id: agilityEx.id,
      name: agilityEx.name,
      phase: "agility_speed",
      movement_pattern: agilityEx.movement_pattern,
      sets: isHighEnergy ? 4 : 3,
      reps: isExplosiveFocus ? 5 : 8,
      intensity: "Max Velocity / Speed",
      equipment_needed: agilityEx.equipment_needed,
      video_url: agilityEx.video_url,
      tips: agilityEx.tips
    },
    ...strengthExs,
    {
      id: conditioningEx.id,
      name: conditioningEx.name,
      phase: "conditioning",
      movement_pattern: conditioningEx.movement_pattern,
      sets: medicalConditions.includes("asthma") ? 2 : 3,
      reps: 10,
      intensity: "Energy System Conditioning",
      equipment_needed: conditioningEx.equipment_needed,
      video_url: conditioningEx.video_url,
      tips: medicalConditions.includes("asthma") ? `${conditioningEx.tips} (Take 90s full rest between rounds for asthma safety)` : conditioningEx.tips
    },
    {
      id: cooldownEx.id,
      name: cooldownEx.name,
      phase: "cooldown",
      movement_pattern: cooldownEx.movement_pattern,
      sets: 1,
      reps: 1,
      intensity: "Recovery Stretch",
      equipment_needed: cooldownEx.equipment_needed,
      video_url: cooldownEx.video_url,
      tips: cooldownEx.tips
    }
  ];

  return fullPhaseList;
}

/**
 * Dynamically converts any athletic workout to a Home Workout based on available tools.
 */
export function convertWorkoutToHome(workout, availableTools = ["bodyweight", "dumbbells"]) {
  const tools = availableTools.length ? availableTools : ["bodyweight"];

  const adaptedExercises = workout.exercises.map((ex) => {
    const isSupported = ex.equipment_needed && ex.equipment_needed.some((tool) => tools.includes(tool));

    if (isSupported || tools.includes("barbell")) {
      return ex;
    }

    // Find substitute in exerciseDb matching movement pattern and available tools
    const substitute = exerciseDb.find((dbEx) =>
      dbEx.movement_pattern === ex.movement_pattern &&
      dbEx.equipment_needed &&
      dbEx.equipment_needed.some((tool) => tools.includes(tool))
    ) || exerciseDb.find((dbEx) =>
      dbEx.equipment_needed && dbEx.equipment_needed.includes("bodyweight")
    );

    if (substitute) {
      return {
        ...ex,
        id: substitute.id,
        name: `${substitute.name} (Home Tool Alt)`,
        equipment_needed: substitute.equipment_needed,
        video_url: substitute.video_url,
        tips: substitute.tips,
        swapped: true,
        original_name: ex.name
      };
    }

    return ex;
  });

  return {
    ...workout,
    is_home_workout: true,
    home_tools_used: tools,
    exercises: adaptedExercises
  };
}

export function generateProgram(intake) {
  const {
    sport,
    level,
    goal,
    goals = [],
    injuries = [],
    daysPerWeek,
    gender = "prefer_not_to_say",
    cyclePhase = "none",
    hyperactivity = "standard",
    medicalConditions = [],
    equipmentTools = [],
    athleteNotes = ""
  } = intake;

  // 1. Find template
  let template = rulesTemplates.find((t) => t.sport === sport && t.level === level);
  if (!template) {
    template = rulesTemplates.find((t) => t.sport === sport) || rulesTemplates.find((t) => t.sport === "general_fitness");
  }

  const generatedWeeks = adjustDaysForFrequency(
    JSON.parse(JSON.stringify(template.weeks)),
    daysPerWeek || template.days_per_week
  );

  // 2. Build 5-phase athletic exercises for each day
  generatedWeeks.forEach((week) => {
    week.days.forEach((day) => {
      day.exercises = buildPhasedAthleticExercises(day.exercises, intake);
    });
  });

  return {
    id: `prog_${Date.now()}`,
    template_id: template.id,
    sport: template.sport,
    level: template.level,
    goal: goal || goals[0] || template.goal,
    goals: goals.length ? goals : [goal || template.goal],
    gender: gender,
    cycle_phase: cyclePhase,
    hyperactivity: hyperactivity,
    medical_conditions: medicalConditions,
    equipment_tools: equipmentTools,
    athlete_notes: athleteNotes,
    current_cycle_number: 1,
    status: "active",
    created_at: new Date().toISOString(),
    weeks: generatedWeeks
  };
}
