import React, { useState, useEffect } from "react";
import {
  PlayCircle,
  Check,
  X,
  ShieldAlert,
  Save,
  Zap,
  Home,
  CheckSquare,
  Sparkles,
  Star,
  Info,
  Layers,
  Flame,
  Activity
} from "lucide-react";
import { convertWorkoutToHome } from "../engine/rulesEngine";
import { processPostWorkoutFeedback } from "../engine/stateMachine";
import { getRandomOrCategoryTip } from "../database/dailyTipsDb";
import { ATHLETIC_EQUIPMENT_ITEMS } from "../database/intakeOptions";

export function WorkoutPage({ user, workout: initialWorkout, onCompleteWorkout, onCancel }) {
  const [workout, setWorkout] = useState(initialWorkout);
  const [isPreWorkoutView, setIsPreWorkoutView] = useState(true);
  const [isHomeMode, setIsHomeMode] = useState(false);
  const [homeTools, setHomeTools] = useState(["bodyweight", "dumbbells", "resistance_bands"]);
  const [gymBagChecked, setGymBagChecked] = useState({});

  // Daily Advice Tip
  const [dailyTip, setDailyTip] = useState(null);

  useEffect(() => {
    // Pick tip based on user profile or goal
    const userGoal = workout.goal || "performance";
    const tipCategory = userGoal === "fat_loss" ? "Professional Fat Loss" : "Nutrition";
    setDailyTip(getRandomOrCategoryTip(tipCategory));
  }, [workout]);

  // Per-set detailed logs structure:
  // exerciseLogs = { exercise_id: { sets: [ { set_num: 1, weight: "", reps: 8, rpe: 7, feel: "Solid", done: false } ] } }
  const [exerciseLogs, setExerciseLogs] = useState(() => {
    return initialWorkout.exercises.reduce((acc, ex) => {
      const setCount = ex.sets || 3;
      const initialSets = [];
      for (let i = 1; i <= setCount; i++) {
        initialSets.push({
          set_num: i,
          weight: "",
          reps: ex.reps || 8,
          rpe: 7,
          feel: "Solid",
          done: false
        });
      }
      acc[ex.id] = initialSets;
      return acc;
    }, {});
  });

  const [activeVideo, setActiveVideo] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [aiCoachResult, setAiCoachResult] = useState(null);

  // Toggle Home Workout Mode
  const handleToggleHomeMode = () => {
    if (!isHomeMode) {
      const homeVersion = convertWorkoutToHome(initialWorkout, homeTools);
      setWorkout(homeVersion);
      setIsHomeMode(true);
    } else {
      setWorkout(initialWorkout);
      setIsHomeMode(false);
    }
  };

  const handleHomeToolToggle = (toolId) => {
    const updatedTools = homeTools.includes(toolId)
      ? homeTools.filter(t => t !== toolId)
      : [...homeTools, toolId];
    setHomeTools(updatedTools);
    if (isHomeMode) {
      setWorkout(convertWorkoutToHome(initialWorkout, updatedTools));
    }
  };

  const handleSetChange = (exerciseId, setIdx, field, value) => {
    setExerciseLogs((prev) => {
      const exSets = [...(prev[exerciseId] || [])];
      exSets[setIdx] = { ...exSets[setIdx], [field]: value };
      return { ...prev, [exerciseId]: exSets };
    });
  };

  const toggleSetDone = (exerciseId, setIdx) => {
    setExerciseLogs((prev) => {
      const exSets = [...(prev[exerciseId] || [])];
      exSets[setIdx] = { ...exSets[setIdx], done: !exSets[setIdx].done };
      return { ...prev, [exerciseId]: exSets };
    });
  };

  // 1-Click Batch action: Drop weight for remaining sets by 10%
  const handleReduceRemainingSetsLoad = (exerciseId) => {
    setExerciseLogs((prev) => {
      const exSets = (prev[exerciseId] || []).map((s) => {
        if (!s.done && s.weight && !isNaN(Number(s.weight))) {
          const reduced = Math.round(Number(s.weight) * 0.9);
          return { ...s, weight: String(reduced), feel: "Reduced Load (-10%)" };
        }
        return s;
      });
      return { ...prev, [exerciseId]: exSets };
    });
  };

  const handleOpenFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    if (feedbackRating < 4 && !feedbackComment.trim()) {
      setFeedbackError("Please type a quick note so your AI coach knows what to solve for you!");
      return;
    }

    setFeedbackError("");
    const result = processPostWorkoutFeedback(workout, feedbackRating, feedbackComment);
    setAiCoachResult(result);

    const finalLog = {
      workout_id: workout.id,
      day_number: workout.day_number,
      focus: workout.focus,
      date: new Date().toISOString(),
      completed: true,
      rating: feedbackRating,
      comment: feedbackComment,
      ai_coach_result: result,
      exercise_logs: exerciseLogs
    };

    const existingLogs = JSON.parse(localStorage.getItem(`workoutapp_logs_${user.id}`) || "[]");
    existingLogs.push(finalLog);
    localStorage.setItem(`workoutapp_logs_${user.id}`, JSON.stringify(existingLogs));

    setTimeout(() => {
      onCompleteWorkout(finalLog);
    }, 2500);
  };

  // Group exercises by 5 athletic phases
  const phasesOrder = [
    { key: "warmup", title: "Phase 1: Dynamic Warmup & Mobility", badge: "Warmup" },
    { key: "agility_speed", title: "Phase 2: Speed, Agility & Footwork", badge: "Speed & Agility" },
    { key: "strength_power", title: "Phase 3: Athletic Strength & Power", badge: "Strength" },
    { key: "conditioning", title: "Phase 4: Sport Conditioning & Energy Systems", badge: "Conditioning" },
    { key: "cooldown", title: "Phase 5: Cool-down & Recovery Stretch", badge: "Recovery" }
  ];

  // ── PRE-WORKOUT SESSION OVERVIEW SCREEN ──
  if (isPreWorkoutView) {
    return (
      <div className="container-width fade-in" style={{ padding: "40px 24px", maxWidth: "850px" }}>
        <div className="glass-panel" style={{ borderLeft: "5px solid var(--primary)", padding: "32px" }}>
          <div className="flex-between" style={{ flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <span className="badge badge-primary">Pre-Workout Overview</span>
              <h2 className="heading-md" style={{ marginTop: "8px" }}>
                Day {workout.day_number}: {workout.focus}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                Review today&apos;s 5-phase athletic session, equipment needed, and your gym bag checklist.
              </p>
            </div>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel Session
            </button>
          </div>

          {/* Home Workout Mode Toggle */}
          <div className="glass-card" style={{ padding: "16px 20px", marginBottom: "24px", background: isHomeMode ? "rgba(16, 185, 129, 0.08)" : "var(--bg-page)", borderColor: isHomeMode ? "var(--accent)" : "var(--border-color)" }}>
            <div className="flex-between flex-wrap" style={{ gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Home size={22} style={{ color: isHomeMode ? "var(--accent)" : "var(--primary)" }} />
                <div>
                  <strong style={{ fontSize: "0.95rem" }}>
                    {isHomeMode ? "Home Workout Mode Active" : "Can't make it to the gym today?"}
                  </strong>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {isHomeMode
                      ? "Workout dynamically converted using your selected home tools."
                      : "Switch to Home Workout mode to substitute gym equipment with home tools."}
                  </p>
                </div>
              </div>
              <button
                className={`btn ${isHomeMode ? "btn-accent" : "btn-secondary"}`}
                onClick={handleToggleHomeMode}
                style={{ fontSize: "0.85rem", padding: "8px 16px" }}
              >
                {isHomeMode ? "Switch to Gym Mode" : "Switch to Home Mode"}
              </button>
            </div>

            {isHomeMode && (
              <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Select Home Tools You Have Right Now:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                  {ATHLETIC_EQUIPMENT_ITEMS.map((item) => {
                    const isChecked = homeTools.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleHomeToolToggle(item.id)}
                        className={`btn ${isChecked ? "btn-primary" : "btn-ghost"}`}
                        style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                      >
                        {item.icon} {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Today's 5 Training Phases Preview */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Layers size={18} style={{ color: "var(--accent)" }} /> Today&apos;s Athletic Training Sequence
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {phasesOrder.map((phaseInfo) => {
                const phaseExs = workout.exercises.filter((ex) => (ex.phase || "strength_power") === phaseInfo.key);
                if (!phaseExs.length) return null;
                return (
                  <div key={phaseInfo.key} style={{ padding: "12px 16px", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--primary)", marginBottom: "4px" }}>
                      {phaseInfo.title}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      {phaseExs.map((e) => e.name).join(" · ")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Equipment & Gym Bag Checklist */}
          <div className="glass-card" style={{ padding: "20px", marginBottom: "28px" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckSquare size={18} style={{ color: "var(--warning)" }} /> Equipment & Gym Bag Checklist Today
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "14px" }}>
              Make sure you have these items with you before tapping Start Workout:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
              {[
                "Resistance Loop Bands",
                "Agility Speed Ladder",
                "Mini Barriers / Hurdles",
                "Jump Rope",
                "Hydration / Electrolytes",
                "Sweat Towel & Straps"
              ].map((item, idx) => (
                <label key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.85rem", padding: "8px 12px", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)" }}>
                  <input
                    type="checkbox"
                    checked={!!gymBagChecked[item]}
                    onChange={(e) => setGymBagChecked({ ...gymBagChecked, [item]: e.target.checked })}
                    style={{ accentColor: "var(--accent)" }}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            className="btn btn-accent"
            onClick={() => setIsPreWorkoutView(false)}
            style={{ width: "100%", padding: "16px", fontSize: "1.05rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
          >
            <Zap size={20} /> Ready! Start Athletic Session
          </button>
        </div>
      </div>
    );
  }

  // ── IN-WORKOUT ACTIVE SESSION VIEW ──
  return (
    <div className="container-width fade-in" style={{ padding: "40px 24px", maxWidth: "900px" }}>
      {/* Header */}
      <div className="flex-between" style={{ marginBottom: "24px", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
        <div>
          <span className="badge badge-primary">Active Athletic Session</span>
          <h2 className="heading-sm" style={{ marginTop: "6px" }}>
            Day {workout.day_number}: {workout.focus}
          </h2>
          {isHomeMode && (
            <span className="badge badge-accent" style={{ marginTop: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Home size={12} /> Home Workout Mode
            </span>
          )}
        </div>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel Session
        </button>
      </div>

      {/* Daily Pro Coach Tip Card */}
      {dailyTip && (
        <div className="glass-card" style={{ marginBottom: "28px", borderLeft: "4px solid var(--accent)", padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "1.2rem" }}>{dailyTip.icon}</span>
            <strong style={{ fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Pro Coach Advice: {dailyTip.title}
            </strong>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
            {dailyTip.content}
          </p>
        </div>
      )}

      {/* Render 5 Athletic Phases */}
      {phasesOrder.map((phaseInfo) => {
        const phaseExercises = workout.exercises.filter((ex) => (ex.phase || "strength_power") === phaseInfo.key);
        if (!phaseExercises.length) return null;

        return (
          <div key={phaseInfo.key} style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span className="badge badge-primary">{phaseInfo.badge}</span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{phaseInfo.title}</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {phaseExercises.map((ex) => {
                const exSets = exerciseLogs[ex.id] || [];

                return (
                  <div key={ex.id} className="glass-card" style={{ padding: "20px" }}>
                    <div className="flex-between" style={{ flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{ex.name}</h4>
                          {ex.swapped && (
                            <span className="badge badge-warning" style={{ fontSize: "0.65rem" }}>
                              <ShieldAlert size={10} /> Swapped
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                          Prescribed: {ex.sets} Sets × {ex.reps} reps ({ex.intensity})
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        {ex.video_url && (
                          <button
                            className="btn btn-secondary"
                            style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                            onClick={() => setActiveVideo(ex)}
                          >
                            <PlayCircle size={14} /> Exercise Guide
                          </button>
                        )}
                        <button
                          className="btn btn-ghost"
                          style={{ padding: "6px 10px", fontSize: "0.75rem", color: "var(--warning)" }}
                          onClick={() => handleReduceRemainingSetsLoad(ex.id)}
                          title="Reduce weight across all uncompleted sets by 10%"
                        >
                          <Flame size={12} /> Lower Weight (-10%)
                        </button>
                      </div>
                    </div>

                    {/* Detailed Per-Set Logging Table */}
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                        <thead>
                          <tr style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-color)", textAlign: "left" }}>
                            <th style={{ padding: "8px" }}>Set #</th>
                            <th style={{ padding: "8px" }}>Load / Weight</th>
                            <th style={{ padding: "8px" }}>Reps Done</th>
                            <th style={{ padding: "8px" }}>Set Feel / Effort</th>
                            <th style={{ padding: "8px", textAlign: "center" }}>Done</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exSets.map((s, sIdx) => (
                            <tr key={sIdx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", opacity: s.done ? 0.6 : 1 }}>
                              <td style={{ padding: "8px", fontWeight: 700, color: "var(--primary)" }}>
                                Set {s.set_num}
                              </td>
                              <td style={{ padding: "8px" }}>
                                <input
                                  type="text"
                                  placeholder="lbs / bw"
                                  value={s.weight}
                                  onChange={(e) => handleSetChange(ex.id, sIdx, "weight", e.target.value)}
                                  className="form-input"
                                  style={{ padding: "4px 8px", width: "90px" }}
                                />
                              </td>
                              <td style={{ padding: "8px" }}>
                                <input
                                  type="number"
                                  value={s.reps}
                                  onChange={(e) => handleSetChange(ex.id, sIdx, "reps", e.target.value)}
                                  className="form-input"
                                  style={{ padding: "4px 8px", width: "60px" }}
                                />
                              </td>
                              <td style={{ padding: "8px" }}>
                                <select
                                  value={s.feel}
                                  onChange={(e) => handleSetChange(ex.id, sIdx, "feel", e.target.value)}
                                  className="form-select"
                                  style={{ padding: "4px 8px", fontSize: "0.78rem" }}
                                >
                                  <option value="Explosive">⚡ Fast & Explosive</option>
                                  <option value="Solid">✅ Solid / Controlled</option>
                                  <option value="Heavy">🏋️ Heavy / Struggling</option>
                                  <option value="Joint Pain">⚠️ Joint Discomfort</option>
                                </select>
                              </td>
                              <td style={{ padding: "8px", textAlign: "center" }}>
                                <button
                                  className={`btn ${s.done ? "btn-accent" : "btn-secondary"}`}
                                  style={{ padding: "4px 10px", borderRadius: "50%", width: "28px", height: "28px" }}
                                  onClick={() => toggleSetDone(ex.id, sIdx)}
                                >
                                  <Check size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Save Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px", marginTop: "30px" }}>
        <button className="btn btn-accent" onClick={handleOpenFeedback} style={{ padding: "14px 28px", fontSize: "1rem" }}>
          <Save size={18} /> Complete & Submit Session Feedback
        </button>
      </div>

      {/* Post-Workout Feedback Modal */}
      {showFeedbackModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px"
        }}>
          <div className="glass-panel" style={{ width: "100%", maxWidth: "550px", padding: "32px" }}>
            <h3 className="heading-sm" style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={20} style={{ color: "var(--accent)" }} /> Post-Workout AI Coach Feedback
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Rate your session so your AI coach can learn and solve any issues for your next workout cycle!
            </p>

            {/* Rating Stars */}
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label className="form-label">Rate Overall Workout Feeling</label>
              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    onClick={() => setFeedbackRating(star)}
                  >
                    <Star size={28} fill={star <= feedbackRating ? "#F59E0B" : "none"} color={star <= feedbackRating ? "#F59E0B" : "var(--text-muted)"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Box */}
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label className="form-label">Athlete Feedback Notes / Comment</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="e.g. Legs felt super explosive! Or: The last set was too heavy on my back..."
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            {feedbackError && (
              <div style={{ color: "var(--warning)", fontSize: "0.8rem", marginBottom: "14px" }}>
                {feedbackError}
              </div>
            )}

            {aiCoachResult ? (
              <div style={{ padding: "16px", backgroundColor: "var(--accent-light)", border: "1px solid var(--accent)", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--accent)" }}>
                <strong>{aiCoachResult.coach_note}</strong>
                <p style={{ marginTop: "4px", fontSize: "0.75rem" }}>Action: {aiCoachResult.action_taken}</p>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button className="btn btn-secondary" onClick={() => setShowFeedbackModal(false)}>Back</button>
                <button className="btn btn-accent" onClick={handleSubmitFeedback}>Submit to AI Coach</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Overlay Modal */}
      {activeVideo && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px"
        }}>
          <div className="glass-panel" style={{ width: "100%", maxWidth: "600px", padding: "24px" }}>
            <div className="flex-between" style={{ marginBottom: "16px" }}>
              <h3 className="heading-sm">{activeVideo.name}</h3>
              <button style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }} onClick={() => setActiveVideo(null)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "var(--radius-lg)", marginBottom: "16px" }}>
              <iframe
                src={activeVideo.video_url}
                title="Exercise Tutorial"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                allowFullScreen
              />
            </div>
            <div style={{ backgroundColor: "var(--bg-page)", padding: "12px", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
              <strong>Coaching Tip:</strong> {activeVideo.tips}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
