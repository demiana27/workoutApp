import React, { useState } from "react";
import { Activity, ShieldAlert, Award, Calendar, CheckCircle2, ChevronRight, RefreshCw, Zap, Sparkles, Heart, FileText, TrendingUp } from "lucide-react";
import { adaptProgramForNextCycle, advanceBiMonthlyProgram } from "../engine/stateMachine";
import { formatGoalsDisplay, getSportLabel, FLEXIBILITY_SESSION_TYPES, FEMALE_CYCLE_PHASES } from "../database/intakeOptions";
import { getRandomOrCategoryTip } from "../database/dailyTipsDb";

export function DashboardPage({ user, program, onSelectWorkout, onProgramUpdate, onResetOnboarding }) {
  const [showPainModal, setShowPainModal] = useState(false);
  const [selectedPainPoints, setSelectedPainPoints] = useState(program.injuries || []);
  const [adaptationMessage, setAdaptationMessage] = useState(program.bimonthly_message || "");

  const existingLogs = JSON.parse(localStorage.getItem(`workoutapp_logs_${user.id}`) || "[]");
  
  // Stats
  const totalDaysInProgram = program.weeks.reduce((sum, w) => sum + w.days.length, 0);
  const totalWorkoutsLogged = existingLogs.filter(log => log.completed === true).length;
  
  const adherence = totalDaysInProgram > 0 
    ? Math.min(100, Math.round((totalWorkoutsLogged / totalDaysInProgram) * 100)) 
    : 0;

  const loggedDayNumbers = existingLogs.filter(log => log.completed === true).map(log => log.day_number);
  const currentWeek = program.weeks[0]; 
  let nextDayIndex = currentWeek.days.findIndex(day => !loggedDayNumbers.includes(day.day_number));
  if (nextDayIndex === -1) nextDayIndex = 0;
  const nextWorkout = currentWeek.days[nextDayIndex];

  // Daily Coach Tip
  const dailyTip = getRandomOrCategoryTip(program.goal === "fat_loss" ? "Professional Fat Loss" : "Nutrition");

  const handlePainToggle = (point) => {
    setSelectedPainPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const handleRunAdaptation = () => {
    const logsToEvaluate = existingLogs.map(log => ({
      workout_id: log.workout_id,
      day_number: log.day_number,
      completed: true,
      exercise_logs: log.exercise_logs
    }));

    const adaptedProg = adaptProgramForNextCycle(
      program,
      logsToEvaluate,
      selectedPainPoints,
      program.equipment || "full_gym"
    );

    const existingPrograms = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
    const updatedPrograms = existingPrograms.map(p => p.id === program.id ? adaptedProg : p);
    localStorage.setItem("workoutapp_programs", JSON.stringify(updatedPrograms));
    
    localStorage.setItem(`workoutapp_logs_${user.id}`, JSON.stringify([]));

    setAdaptationMessage(adaptedProg.adaptation_log?.message || "Program adapted!");
    onProgramUpdate(adaptedProg);
    setShowPainModal(false);

    setTimeout(() => {
      setAdaptationMessage("");
    }, 6000);
  };

  // 2-Month Bi-Monthly Upgrade Trigger
  const handleBiMonthlyUpgrade = () => {
    const upgraded = advanceBiMonthlyProgram(program);
    const existingPrograms = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
    const updatedPrograms = existingPrograms.map(p => p.id === program.id ? upgraded : p);
    localStorage.setItem("workoutapp_programs", JSON.stringify(updatedPrograms));

    setAdaptationMessage(upgraded.bimonthly_message);
    onProgramUpdate(upgraded);
  };

  return (
    <div className="container-width fade-in" style={{ padding: "40px 24px" }}>
      {/* Welcome & Profile Badges */}
      <div className="flex-between" style={{ marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 className="heading-md">Welcome, {user.name}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px", alignItems: "center" }}>
            <span style={{ color: "var(--primary)", fontWeight: "700" }}>
              {program.sports_label || program.sport_label || getSportLabel(program.sport)}
            </span>
            <span className="badge badge-primary">{program.level.toUpperCase()} ATHLETE</span>
            {program.hyperactivity === "high_energy" && (
              <span className="badge badge-warning" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Zap size={12} /> HYPERACTIVE VOLUME
              </span>
            )}
            {program.gender === "female" && program.cycle_phase && program.cycle_phase !== "none" && (
              <span className="badge badge-accent" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Heart size={12} /> {FEMALE_CYCLE_PHASES.find(c => c.id === program.cycle_phase)?.label}
              </span>
            )}
          </div>
          {program.athlete_notes && (
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
              <FileText size={14} style={{ color: "var(--accent)" }} /> <strong>Coach Note Focus:</strong> &quot;{program.athlete_notes}&quot;
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-secondary" onClick={() => setShowPainModal(true)}>
            <ShieldAlert size={16} /> Manage Pain Safeguards
          </button>
          <button className="btn btn-ghost" onClick={onResetOnboarding} style={{ fontSize: "0.85rem" }}>
            Reset Intake
          </button>
        </div>
      </div>

      {/* Adaptation / Upgrade Alert */}
      {adaptationMessage && (
        <div style={{
          backgroundColor: "var(--accent-light)",
          border: "1px solid var(--accent)",
          color: "var(--accent)",
          padding: "16px",
          borderRadius: "var(--radius-lg)",
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "0.9rem"
        }}>
          <Activity size={20} />
          <div>
            <strong>Notification:</strong> {adaptationMessage}
          </div>
        </div>
      )}

      {/* 2-MONTH (BI-MONTHLY) PROGRESSION PROMPT CARD */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(79, 70, 229, 0.08))",
        borderLeft: "4px solid var(--accent)",
        padding: "24px",
        marginBottom: "30px"
      }}>
        <div className="flex-between flex-wrap" style={{ gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={20} style={{ color: "var(--accent)" }} />
              <strong style={{ fontSize: "1.05rem" }}>2-Month (Bi-Monthly) Plan Re-Assessment & Progression</strong>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px", maxWidth: "700px" }}>
              Every 2 months, your coach re-evaluates your speed, power, and movement capacity to advance your training level (Beginner $\rightarrow$ Intermediate $\rightarrow$ Advanced) and add new athletic progressions!
            </p>
          </div>
          <button className="btn btn-accent" onClick={handleBiMonthlyUpgrade} style={{ padding: "10px 20px", fontSize: "0.88rem" }}>
            <Sparkles size={16} /> Trigger 2-Month Plan Progression
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid-cols-4" style={{ marginBottom: "40px" }}>
        <div className="glass-card flex-between">
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Cycle Block</span>
            <h3 style={{ fontSize: "1.75rem", margin: "4px 0" }}>Block {program.current_cycle_number}</h3>
            <p className="text-mute" style={{ fontSize: "0.75rem" }}>Athletic Adaptation Block</p>
          </div>
          <Calendar size={28} style={{ color: "var(--primary)" }} />
        </div>

        <div className="glass-card flex-between">
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Adherence</span>
            <h3 style={{ fontSize: "1.75rem", margin: "4px 0" }}>{adherence}%</h3>
            <p className="text-mute" style={{ fontSize: "0.75rem" }}>Prescribed sessions logged</p>
          </div>
          <CheckCircle2 size={28} style={{ color: "var(--accent)" }} />
        </div>

        <div className="glass-card flex-between">
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Pain Mitigations</span>
            <h3 style={{ fontSize: "1.75rem", margin: "4px 0" }}>{program.injuries?.length || 0} Active</h3>
            <p className="text-mute" style={{ fontSize: "0.75rem" }}>Safeguarded joint motions</p>
          </div>
          <ShieldAlert size={28} style={{ color: "var(--warning)" }} />
        </div>

        <div className="glass-card flex-between">
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Target Track</span>
            <h3 style={{ fontSize: "1.1rem", margin: "4px 0", textTransform: "none", lineHeight: 1.3 }}>
              {formatGoalsDisplay(program.goals || program.goal)}
            </h3>
            <p className="text-mute" style={{ fontSize: "0.75rem" }}>Training goals</p>
          </div>
          <Award size={28} style={{ color: "var(--info)" }} />
        </div>
      </div>

      {/* Daily Pro Coach Tip Preview */}
      {dailyTip && (
        <div className="glass-card" style={{ marginBottom: "30px", borderLeft: "4px solid var(--accent)", padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span>{dailyTip.icon}</span>
            <strong style={{ fontSize: "0.85rem", color: "var(--accent)" }}>
              Daily Coach Knowledge: {dailyTip.title}
            </strong>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            {dailyTip.content}
          </p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
        {/* Next Workout */}
        <div className="glass-panel" style={{ borderLeft: "4px solid var(--primary)" }}>
          <div className="flex-between" style={{ marginBottom: "20px" }}>
            <div>
              <span className="badge badge-primary">Next Prescribed Athletic Session</span>
              <h3 className="heading-sm" style={{ marginTop: "8px" }}>Day {nextWorkout.day_number}: {nextWorkout.focus}</h3>
            </div>
            <button className="btn btn-primary" onClick={() => onSelectWorkout(nextWorkout)}>
              Start Session & Prep <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {nextWorkout.exercises.map((ex, idx) => (
              <div key={idx} style={{
                display: "flex",
                justifyContent: "between",
                alignItems: "center",
                padding: "14px 20px",
                backgroundColor: "var(--bg-page)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                flexWrap: "wrap",
                gap: "10px"
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>{ex.name}</span>
                    <span className="badge badge-ghost" style={{ fontSize: "0.65rem" }}>
                      {(ex.phase || "strength_power").replace("_", " ")}
                    </span>
                    {ex.swapped && (
                      <span className="badge badge-warning" style={{ fontSize: "0.65rem" }}>
                        Injury Swapped
                      </span>
                    )}
                  </div>
                  <span className="text-mute" style={{ fontSize: "0.8rem" }}>Pattern: {ex.movement_pattern.replace("_", " ")}</span>
                </div>
                <div style={{ display: "flex", gap: "24px", fontSize: "0.9rem", fontWeight: "500" }}>
                  <div>Sets: <span style={{ color: "var(--primary)" }}>{ex.sets}</span></div>
                  <div>Reps: <span style={{ color: "var(--primary)" }}>{ex.reps || "Time-based"}</span></div>
                  <div>Goal: <span style={{ color: "var(--accent)" }}>{ex.intensity}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Machine Regeneration Block */}
        <div className="glass-card" style={{
          background: "linear-gradient(to right, rgba(124, 58, 237, 0.08), transparent)",
          borderLeft: "4px solid var(--accent)",
          padding: "28px"
        }}>
          <h3 className="heading-sm" style={{ marginBottom: "8px" }}>Adapt and Progress Next Cycle</h3>
          <p className="text-mute" style={{ fontSize: "0.9rem", marginBottom: "20px", maxWidth: "800px" }}>
            The state machine evaluates your workout logging consistency (adherence), set feel/difficulty, and active joint pain to build your next block.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn btn-accent" onClick={() => setShowPainModal(true)}>
              <RefreshCw size={16} /> Adapt & Generate Cycle {program.current_cycle_number + 1}
            </button>
          </div>
        </div>

        {/* Workout Logs History */}
        <div>
          <h3 className="heading-sm" style={{ marginBottom: "16px" }}>Activity Log & Coach Review History</h3>
          {existingLogs.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "40px",
              border: "2px dashed var(--border-color)",
              borderRadius: "var(--radius-lg)",
              color: "var(--text-muted)",
              fontSize: "0.9rem"
            }}>
              No workouts logged yet. Start your next prescribed workout to record logs.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {existingLogs.slice().reverse().map((log, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "16px 24px" }}>
                  <div className="flex-between" style={{ flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <h4 style={{ fontSize: "1rem" }}>{log.focus}</h4>
                      <span className="text-mute" style={{ fontSize: "0.8rem" }}>Logged on {new Date(log.date).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <div className="badge badge-accent">Completed</div>
                      {log.rating && (
                        <div style={{ fontSize: "0.85rem", color: "var(--warning)" }}>
                          Rating: <strong>{log.rating}★</strong>
                        </div>
                      )}
                    </div>
                  </div>
                  {log.comment && (
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "8px", fontStyle: "italic" }}>
                      Athlete Comment: &quot;{log.comment}&quot;
                    </p>
                  )}
                  {log.ai_coach_result && (
                    <div style={{ marginTop: "8px", padding: "8px 12px", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)", fontSize: "0.78rem", color: "var(--primary)" }}>
                      {log.ai_coach_result.coach_note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pain Safeguards Edit Modal */}
      {showPainModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px"
        }}>
          <div className="glass-panel" style={{ width: "100%", maxWidth: "500px", padding: "32px" }}>
            <h3 className="heading-sm" style={{ marginBottom: "12px" }}>Manage Joint Pain Areas</h3>
            <p className="text-mute" style={{ fontSize: "0.85rem", marginBottom: "20px" }}>
              Update physical safeguards. Re-swaps exercises in the next cycle to protect joints.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {[
                { id: "knee_pain", label: "Knee Pain / Patellar Tendonitis" },
                { id: "lower_back_pain", label: "Lower Back Pain" },
                { id: "shoulder_pain", label: "Shoulder Impingement" },
                { id: "ankle_pain", label: "Ankle Sprain / Mobility Limit" }
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => handlePainToggle(p.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "between", padding: "12px 18px",
                    backgroundColor: selectedPainPoints.includes(p.id) ? "var(--primary-light)" : "var(--bg-page)",
                    border: `1px solid ${selectedPainPoints.includes(p.id) ? "var(--primary)" : "var(--border-color)"}`,
                    borderRadius: "var(--radius-md)", cursor: "pointer"
                  }}
                >
                  <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{p.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedPainPoints.includes(p.id)}
                    onChange={() => {}}
                    style={{ marginLeft: "auto", width: "16px", height: "16px", accentColor: "var(--primary)" }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowPainModal(false)}>Cancel</button>
              <button className="btn btn-accent" onClick={handleRunAdaptation}>Apply & Adapt Next Cycle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
