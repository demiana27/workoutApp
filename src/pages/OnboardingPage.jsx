import React, { useState, useMemo } from "react";
import { generateProgram } from "../engine/rulesEngine";
import {
  ChevronRight,
  ChevronLeft,
  Dumbbell,
  Shield,
  Award,
  Calendar,
  BarChart,
  Search,
  Star,
  X,
  Zap,
  Activity,
  Heart,
  FileText,
  UserCheck
} from "lucide-react";
import {
  TRAINING_GOALS,
  SPORT_CATEGORIES,
  DAYS_PER_WEEK_OPTIONS,
  FLEXIBILITY_SESSION_TYPES,
  GENDER_OPTIONS,
  FEMALE_CYCLE_PHASES,
  HYPERACTIVITY_OPTIONS,
  MEDICAL_CONDITIONS,
  ATHLETIC_EQUIPMENT_ITEMS,
  getSportLabel,
  getSportsLabels
} from "../database/intakeOptions";

export function OnboardingPage({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [profileType, setProfileType] = useState("");

  const [selectedSports, setSelectedSports] = useState([]);
  const [customSportName, setCustomSportName] = useState("");
  const [sportSearch, setSportSearch] = useState("");

  const [goals, setGoals] = useState(["performance"]);
  const [flexibilityOption, setFlexibilityOption] = useState("none");
  const [experience, setExperience] = useState("beginner");
  const [injuries, setInjuries] = useState([]);
  
  // New Athletic Intake Fields
  const [gender, setGender] = useState("prefer_not_to_say");
  const [cyclePhase, setCyclePhase] = useState("none");
  const [hyperactivity, setHyperactivity] = useState("standard");
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [equipmentTools, setEquipmentTools] = useState(["agility_ladder", "barriers_hurdles", "resistance_bands", "dumbbells"]);
  const [athleteNotes, setAthleteNotes] = useState("");

  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [equipment, setEquipment] = useState("full_gym");
  const [benchmarks, setBenchmarks] = useState({
    squat: "",
    verticalJump: "",
    mileTime: ""
  });

  const totalSteps = 5;

  const primarySport = selectedSports[0] || "";

  const filteredCategories = useMemo(() => {
    const query = sportSearch.trim().toLowerCase();
    if (!query) return SPORT_CATEGORIES;
    return SPORT_CATEGORIES.map((category) => ({
      ...category,
      sports: category.sports.filter(
        (sport) =>
          sport.label.toLowerCase().includes(query) ||
          sport.id.replace(/_/g, " ").includes(query)
      )
    })).filter((category) => category.sports.length > 0);
  }, [sportSearch]);

  const handleProfileSelect = (type) => {
    setProfileType(type);
    if (type === "bodybuilder") {
      setGoals(["hypertrophy"]);
      setSelectedSports(["bodybuilding"]);
    } else if (type === "new_athlete") {
      setGoals(["performance", "general_fitness"]);
      setSelectedSports(["general_fitness"]);
    } else {
      setGoals(["performance"]);
      setSelectedSports([]);
      setCustomSportName("");
    }
    setStep(2);
  };

  const handleSportToggle = (sportId) => {
    setSelectedSports((prev) => {
      if (prev.includes(sportId)) {
        const next = prev.filter((s) => s !== sportId);
        if (sportId !== "other") setCustomSportName("");
        return next;
      } else {
        return [...prev, sportId];
      }
    });
    if (sportId !== "other") setCustomSportName("");
  };

  const handleRemoveSport = (sportId) => {
    setSelectedSports((prev) => prev.filter((s) => s !== sportId));
    if (sportId === "other") setCustomSportName("");
  };

  const handleGoalToggle = (goalId) => {
    setGoals((prev) =>
      prev.includes(goalId)
        ? prev.length > 1
          ? prev.filter((g) => g !== goalId)
          : prev
        : [...prev, goalId]
    );
  };

  const handleInjuryToggle = (region) => {
    setInjuries((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const handleMedicalToggle = (condId) => {
    setMedicalConditions((prev) =>
      prev.includes(condId) ? prev.filter((c) => c !== condId) : [...prev, condId]
    );
  };

  const handleToolToggle = (toolId) => {
    setEquipmentTools((prev) =>
      prev.includes(toolId) ? prev.filter((t) => t !== toolId) : [...prev, toolId]
    );
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const canProceedStep2 =
    profileType !== "athlete" ||
    (selectedSports.length > 0 &&
      (selectedSports.includes("other") ? customSportName.trim() : true));

  const handleFinish = () => {
    const resolvedPrimary = primarySport || "general_fitness";
    const primaryLabel = getSportLabel(resolvedPrimary, customSportName);
    const allSportsLabel = getSportsLabels(selectedSports.length ? selectedSports : [resolvedPrimary], customSportName);

    const finalGoals = [...goals];
    if (flexibilityOption !== "none" && !finalGoals.includes("flexibility") && !finalGoals.includes("mobility")) {
      finalGoals.push("flexibility");
    }

    const intakeData = {
      user_id: user.id,
      profile_type: profileType,
      sport: resolvedPrimary,
      sport_label: primaryLabel,
      sports: selectedSports.length ? selectedSports : [resolvedPrimary],
      sports_label: allSportsLabel,
      custom_sport_name: selectedSports.includes("other") ? customSportName.trim() : "",
      level: experience,
      goal: finalGoals[0],
      goals: finalGoals,
      gender,
      cycle_phase: gender === "female" ? cyclePhase : "none",
      hyperactivity,
      medical_conditions: medicalConditions,
      equipment_tools: equipmentTools,
      athlete_notes: athleteNotes,
      flexibility_option: flexibilityOption,
      injuries,
      equipment,
      days_per_week: daysPerWeek,
      benchmarks
    };

    const existingProfiles = JSON.parse(localStorage.getItem("workoutapp_profiles") || "[]");
    existingProfiles.push(intakeData);
    localStorage.setItem("workoutapp_profiles", JSON.stringify(existingProfiles));

    const newProgram = generateProgram({
      sport: intakeData.sport,
      level: intakeData.level,
      goal: intakeData.goal,
      goals: intakeData.goals,
      injuries: intakeData.injuries,
      equipment: intakeData.equipment,
      daysPerWeek: intakeData.days_per_week,
      gender: intakeData.gender,
      cyclePhase: intakeData.cycle_phase,
      hyperactivity: intakeData.hyperactivity,
      medicalConditions: intakeData.medical_conditions,
      equipmentTools: intakeData.equipment_tools,
      athleteNotes: intakeData.athlete_notes
    });

    newProgram.user_id = user.id;
    newProgram.injuries = injuries;
    newProgram.sport_label = primaryLabel;
    newProgram.sports = intakeData.sports;
    newProgram.sports_label = allSportsLabel;
    newProgram.goals = finalGoals;
    newProgram.flexibility_option = flexibilityOption;

    const existingPrograms = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
    existingPrograms.push(newProgram);
    localStorage.setItem("workoutapp_programs", JSON.stringify(existingPrograms));

    onComplete(newProgram);
  };

  const stepLabels = ["Profile & Gender", "Sports, Focus & Energy", "Safety, Pain & Health", "Tools & Schedule", "Benchmarks"];

  return (
    <div className="onboarding-shell fade-in">
      {step > 1 && (
        <div style={{ marginBottom: "30px" }}>
          <div className="flex-between" style={{ marginBottom: "10px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              Step {step} of {totalSteps}: {stepLabels[step - 1]}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {Math.round(((step - 1) / (totalSteps - 1)) * 100)}% Complete
            </span>
          </div>
          <div style={{ height: "6px", backgroundColor: "var(--border-color)", borderRadius: "3px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${((step - 1) / (totalSteps - 1)) * 100}%`,
                background: "linear-gradient(90deg, var(--primary), var(--accent))",
                transition: "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            />
          </div>
        </div>
      )}

      {/* ── STEP 1: Profile Type & Gender Intake ── */}
      {step === 1 && (
        <div className="slide-up">
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <span className="badge badge-primary" style={{ marginBottom: "12px" }}>
              High-Performance Athlete Intake
            </span>
            <h2 className="heading-md" style={{ marginBottom: "8px" }}>
              Build Your Athletic Profile
            </h2>
            <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              We build speed, agility, explosive power, and sport conditioning tailored to you.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "30px" }}>
            <div
              className="glass-card flex-between"
              style={{ cursor: "pointer", padding: "24px", borderLeft: "4px solid var(--accent)" }}
              onClick={() => handleProfileSelect("new_athlete")}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <Award size={32} style={{ color: "var(--accent)" }} />
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "4px", fontWeight: 700 }}>
                    New Athlete / Developing Sport Speed
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Build speed, agility ladder mechanics, jump power, and core conditioning.
                  </p>
                </div>
              </div>
              <ChevronRight size={24} style={{ color: "var(--text-muted)" }} />
            </div>

            <div
              className="glass-card flex-between"
              style={{ cursor: "pointer", padding: "24px", borderLeft: "4px solid var(--primary)" }}
              onClick={() => handleProfileSelect("athlete")}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <Dumbbell size={32} style={{ color: "var(--primary)" }} />
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "4px", fontWeight: 700 }}>
                    Competitive Athlete / Sport Player
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    High-performance S&C wrapped around your sport, footwork, and season.
                  </p>
                </div>
              </div>
              <ChevronRight size={24} style={{ color: "var(--text-muted)" }} />
            </div>

            <div
              className="glass-card flex-between"
              style={{ cursor: "pointer", padding: "24px", borderLeft: "4px solid var(--info)" }}
              onClick={() => handleProfileSelect("bodybuilder")}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <BarChart size={32} style={{ color: "var(--info)" }} />
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "4px", fontWeight: 700 }}>
                    Physique / Hypertrophy Focus
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Hypertrophy muscle splits, progressive overload, and physique development.
                  </p>
                </div>
              </div>
              <ChevronRight size={24} style={{ color: "var(--text-muted)" }} />
            </div>
          </div>

          {/* Experience Level Selector */}
          <div className="glass-card" style={{ padding: "20px", marginBottom: "20px" }}>
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <BarChart size={16} style={{ color: "var(--primary)" }} /> Experience Level (Adjusts Sets, Reps & Intensity)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginTop: "10px" }}>
              {[
                { id: "beginner", label: "Beginner", desc: "0-6 months" },
                { id: "intermediate", label: "Intermediate", desc: "6 mos - 2 yrs" },
                { id: "advanced", label: "Advanced", desc: "2+ years" },
                { id: "elite", label: "Elite / Pro", desc: "Competitive" }
              ].map((lvl) => (
                <div
                  key={lvl.id}
                  className={`choice-card ${experience === lvl.id ? "selected" : ""}`}
                  onClick={() => setExperience(lvl.id)}
                  style={{ textAlign: "center", padding: "12px", flexDirection: "column" }}
                >
                  <strong style={{ fontSize: "0.85rem", color: experience === lvl.id ? "var(--primary)" : "inherit" }}>
                    {lvl.label}
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    {lvl.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Selector */}
          <div className="glass-card" style={{ padding: "20px" }}>
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <UserCheck size={16} style={{ color: "var(--primary)" }} /> Athlete Gender (For Hormonal & Population Standards)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginTop: "10px" }}>
              {GENDER_OPTIONS.map((g) => (
                <div
                  key={g.id}
                  className={`choice-card compact ${gender === g.id ? "selected" : ""}`}
                  onClick={() => setGender(g.id)}
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{g.label}</span>
                </div>
              ))}
            </div>

            {/* Optional Female Menstrual Cycle Section */}
            {gender === "female" && (
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent)" }}>
                  <Heart size={16} /> Optional: Menstrual Cycle Phase (For Cycle-Aware Coaching & Tips)
                </label>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "10px" }}>
                  Adjusts Joint Laxity precautions, recovery advice, and power training windows.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                  {FEMALE_CYCLE_PHASES.map((c) => (
                    <div
                      key={c.id}
                      className={`choice-card ${cyclePhase === c.id ? "selected" : ""}`}
                      style={{ padding: "10px", textAlign: "left", flex: 1 }}
                      onClick={() => setCyclePhase(c.id)}
                    >
                      <strong style={{ fontSize: "0.8rem" }}>{c.label}</strong>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>
                        {c.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 2: Sports, Goals, Hyperactivity & Custom Notes ── */}
      {step === 2 && (
        <div className="slide-up onboarding-card">
          <h2 className="heading-sm" style={{ marginBottom: "6px" }}>
            Sports, Focus & Energy Level
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            Tailor your athletic discipline, energy output, and custom coach notes.
          </p>

          {/* Multi-sport picker */}
          {profileType === "athlete" && (
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label className="form-label">Sports (first selected = primary)</label>
              {selectedSports.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                  {selectedSports.map((sportId, idx) => (
                    <div
                      key={sportId}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 12px",
                        borderRadius: "9999px",
                        backgroundColor: idx === 0 ? "var(--primary-light)" : "var(--accent-light)",
                        border: `1px solid ${idx === 0 ? "var(--primary)" : "var(--accent)"}`,
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        color: idx === 0 ? "var(--primary)" : "var(--accent)"
                      }}
                    >
                      {idx === 0 && <Star size={10} />}
                      {getSportLabel(sportId, sportId === "other" ? customSportName : "")}
                      <button
                        onClick={() => handleRemoveSport(sportId)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="sport-search-wrap" style={{ marginBottom: "12px" }}>
                <div style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    placeholder="Search sports — soccer, basketball, track..."
                    value={sportSearch}
                    onChange={(e) => setSportSearch(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: "40px" }}
                  />
                </div>
              </div>

              <div className="sport-picker-scroll">
                {filteredCategories.map((category) => (
                  <div key={category.id}>
                    <div className="sport-category-label">{category.label}</div>
                    <div className="choice-grid">
                      {category.sports.map((sport) => {
                        const isSelected = selectedSports.includes(sport.id);
                        const isPrimary = selectedSports[0] === sport.id;
                        return (
                          <div
                            key={sport.id}
                            className={`choice-card compact ${isPrimary ? "primary-selected" : isSelected ? "selected" : ""}`}
                            onClick={() => handleSportToggle(sport.id)}
                          >
                            <span style={{ fontSize: "0.82rem", fontWeight: isSelected ? 700 : 500 }}>
                              {sport.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hyperactivity & Energy Level */}
          <div className="form-group" style={{ marginTop: "20px" }}>
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={16} style={{ color: "var(--warning)" }} /> Energy Level & Hyperactivity
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {HYPERACTIVITY_OPTIONS.map((h) => (
                <div
                  key={h.id}
                  className={`choice-card ${hyperactivity === h.id ? "selected" : ""}`}
                  style={{ textAlign: "left", padding: "14px" }}
                  onClick={() => setHyperactivity(h.id)}
                >
                  <strong style={{ fontSize: "0.85rem" }}>{h.label}</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>
                    {h.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Athlete Custom Focus Notes */}
          <div className="form-group" style={{ marginTop: "20px" }}>
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FileText size={16} style={{ color: "var(--primary)" }} /> Athlete Custom Notes & Coach Focus
            </label>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "8px" }}>
              Tell your coach what you want to master (e.g. &quot;I need to be super explosive for dunking&quot;, &quot;focus on fast footwork&quot;).
            </p>
            <textarea
              className="form-input"
              rows={2}
              placeholder="e.g. Make me super explosive for vertical jumping and fast change of direction..."
              value={athleteNotes}
              onChange={(e) => setAthleteNotes(e.target.value)}
              style={{ width: "100%", padding: "10px 14px" }}
            />
          </div>

          {/* Training Goals */}
          <div className="form-group" style={{ marginTop: "20px" }}>
            <label className="form-label">Training Goals (Select all that apply)</label>
            <div className="choice-grid">
              {TRAINING_GOALS.map((g) => (
                <div
                  key={g.id}
                  className={`choice-card ${goals.includes(g.id) ? "selected" : ""}`}
                  onClick={() => handleGoalToggle(g.id)}
                  style={{ textAlign: "left", padding: "12px" }}
                >
                  <strong style={{ fontSize: "0.85rem" }}>{g.label}</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block" }}>{g.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "30px" }}>
            <button className="btn btn-secondary" onClick={prevStep}>
              <ChevronLeft size={16} /> Back
            </button>
            <button className="btn btn-primary" onClick={nextStep} disabled={!canProceedStep2}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Safety, Joint Pain & Medical Conditions ── */}
      {step === 3 && (
        <div className="slide-up onboarding-card">
          <h2 className="heading-sm" style={{ marginBottom: "8px" }}>
            Safety, Pain & Health Safeguards
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            We automatically swap exercises for pain points and adjust rest intervals for medical conditions.
          </p>

          {/* Joint Pain Areas */}
          <div className="form-group">
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Shield size={16} style={{ color: "var(--primary)" }} /> Active Joint Pain Areas
            </label>
            <div className="choice-grid">
              {[
                { name: "knee_pain", label: "Knee Pain / Tendonitis" },
                { name: "lower_back_pain", label: "Lower Back Pain" },
                { name: "shoulder_pain", label: "Shoulder Impingement" },
                { name: "ankle_pain", label: "Ankle Sprain / Stiffness" }
              ].map((inj) => (
                <div
                  key={inj.name}
                  className={`choice-card ${injuries.includes(inj.name) ? "selected" : ""}`}
                  style={{ minHeight: "80px", justifyContent: "center" }}
                  onClick={() => handleInjuryToggle(inj.name)}
                >
                  <Shield size={18} style={{ color: injuries.includes(inj.name) ? "var(--primary)" : "var(--text-secondary)" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, textAlign: "center" }}>{inj.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Conditions / Illnesses */}
          <div className="form-group" style={{ marginTop: "24px" }}>
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={16} style={{ color: "var(--warning)" }} /> Medical Conditions & Illnesses (Safeguards)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
              {MEDICAL_CONDITIONS.map((cond) => (
                <div
                  key={cond.id}
                  className={`choice-card ${medicalConditions.includes(cond.id) ? "selected" : ""}`}
                  style={{ textAlign: "left", padding: "12px" }}
                  onClick={() => handleMedicalToggle(cond.id)}
                >
                  <strong style={{ fontSize: "0.85rem" }}>{cond.label}</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>
                    {cond.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "30px" }}>
            <button className="btn btn-secondary" onClick={prevStep}>
              <ChevronLeft size={16} /> Back
            </button>
            <button className="btn btn-primary" onClick={nextStep}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Tools Inventory & Schedule ── */}
      {step === 4 && (
        <div className="slide-up onboarding-card">
          <h2 className="heading-sm" style={{ marginBottom: "16px" }}>
            Athletic Tools & Training Schedule
          </h2>

          {/* Equipment Inventory */}
          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label className="form-label">Athletic Equipment Available (Check all you have)</label>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "10px" }}>
              Enables dynamic tool matching for gym and home workouts (ladders, barriers, bands, etc.).
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
              {ATHLETIC_EQUIPMENT_ITEMS.map((item) => {
                const isChecked = equipmentTools.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`choice-card compact ${isChecked ? "selected" : ""}`}
                    onClick={() => handleToolToggle(item.id)}
                    style={{ padding: "10px", justifyContent: "flex-start", gap: "8px" }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: isChecked ? 700 : 500 }}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Training Days */}
          <div className="form-group">
            <label className="form-label">Days Per Week (1–7)</label>
            <div className="days-grid">
              {DAYS_PER_WEEK_OPTIONS.map((d) => (
                <div
                  key={d}
                  className={`choice-card ${daysPerWeek === d ? "selected" : ""}`}
                  style={{ padding: "14px 8px", flexDirection: "column", gap: "4px" }}
                  onClick={() => setDaysPerWeek(d)}
                >
                  <Calendar size={16} style={{ color: daysPerWeek === d ? "var(--primary)" : "var(--text-secondary)" }} />
                  <span style={{ fontSize: "1.1rem", fontWeight: "800" }}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "30px" }}>
            <button className="btn btn-secondary" onClick={prevStep}>
              <ChevronLeft size={16} /> Back
            </button>
            <button className="btn btn-primary" onClick={nextStep}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 5: Benchmarks & Finish ── */}
      {step === 5 && (
        <div className="slide-up onboarding-card">
          <h2 className="heading-sm" style={{ marginBottom: "12px" }}>
            Performance Benchmarks (Optional)
          </h2>
          <p style={{ marginBottom: "20px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Baseline metrics to track your power and conditioning gains over time.
          </p>

          <div className="form-group">
            <label className="form-label">Squat Estimated 1RM (lbs)</label>
            <input
              type="number"
              placeholder="e.g. 200"
              value={benchmarks.squat}
              onChange={(e) => setBenchmarks({ ...benchmarks, squat: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginTop: "14px" }}>
            <label className="form-label">Vertical Jump (inches)</label>
            <input
              type="number"
              placeholder="e.g. 24"
              value={benchmarks.verticalJump}
              onChange={(e) => setBenchmarks({ ...benchmarks, verticalJump: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "30px" }}>
            <button className="btn btn-secondary" onClick={prevStep}>
              <ChevronLeft size={16} /> Back
            </button>
            <button className="btn btn-accent" onClick={handleFinish} style={{ padding: "12px 24px" }}>
              Generate Athletic Program <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
