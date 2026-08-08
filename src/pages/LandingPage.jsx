import React, { useState } from "react";
import {
  Activity, Shield, BarChart2, Users, ArrowRight, CheckCircle,
  Zap, Target, RefreshCw, ChevronDown, ChevronUp
} from "lucide-react";

const SPORT_EXAMPLES = [
  "Rugby", "American Football", "Soccer", "Basketball", "Volleyball",
  "Boxing", "Jiu-Jitsu", "MMA", "Rowing", "Swimming", "Cycling",
  "Wrestling", "Tennis", "Track & Field", "Ice Hockey", "Lacrosse",
  "Powerlifting", "Olympic Weightlifting", "CrossFit", "Triathlon",
  "Baseball", "Softball", "Cricket", "Handball", "Water Polo",
  "Muay Thai", "Judo", "Karate", "Rock Climbing", "Gymnastics",
];

const FEATURES = [
  {
    icon: <Activity size={24} />,
    color: "var(--primary)",
    bg: "var(--primary-light)",
    title: "50+ Sport Disciplines",
    desc: "From rugby and American football to rowing, BJJ, and Olympic weightlifting — every sport has unique physical demands. We build around yours."
  },
  {
    icon: <Shield size={24} />,
    color: "var(--accent)",
    bg: "var(--accent-light)",
    title: "Injury-Safe Exercise Swaps",
    desc: "Flag active knee, back, shoulder, or ankle pain. The engine automatically replaces dangerous movements with joint-safe alternatives before your first rep."
  },
  {
    icon: <BarChart2 size={24} />,
    color: "var(--info)",
    bg: "var(--info-light)",
    title: "Adaptive 4-Week Cycles",
    desc: "Log workouts, reps, and exertion. The state machine evaluates cycle adherence and RPE to progress, deload, or regenerate the next block automatically."
  },
  {
    icon: <Target size={24} />,
    color: "var(--warning)",
    bg: "var(--warning-light)",
    title: "Multi-Goal Blending",
    desc: "Train for performance AND hypertrophy AND speed. Select every goal that matters — the engine blends them into a coherent weekly structure."
  },
  {
    icon: <Zap size={24} />,
    color: "var(--primary)",
    bg: "var(--primary-light)",
    title: "1–7 Days Per Week",
    desc: "Choose exactly how many training days fit your schedule, from 1 recovery-focused day up to 7-day elite athlete programming."
  },
  {
    icon: <RefreshCw size={24} />,
    color: "var(--accent)",
    bg: "var(--accent-light)",
    title: "Wearable Analytics",
    desc: "Upload Garmin, Fitbit, or Apple Health exports. Get heart rate zone breakdowns and recovery coaching based on your actual cardiovascular output."
  }
];

const FAQ = [
  {
    q: "My sport isn't listed — can I still use it?",
    a: "Yes. There's an \"Other\" option at the bottom of the sports list where you type in any discipline. The engine maps your sport to the most closely matched movement demands (power, endurance, rotational, contact, etc.) and builds the program from those."
  },
  {
    q: "Can I train for multiple goals at once?",
    a: "Yes. The goal selector allows you to choose multiple goals simultaneously — for example, Athletic Performance + Max Strength + Fat Loss. The engine blends these into a prioritised weekly structure. You designate one primary sport, but goals are multi-select."
  },
  {
    q: "What if I can only train 1–2 days per week?",
    a: "The scheduler supports 1 through 7 days per week. At lower frequencies, the engine condenses training into full-body compound sessions and removes accessory volume, keeping intensity high and total fatigue manageable."
  },
  {
    q: "How does the injury protection work?",
    a: "Every exercise in the library is tagged with the joints and movement patterns it stresses (e.g., knee flexion, spinal load, shoulder overhead). When you flag an injury, the engine queries for exercises with the same movement pattern that don't carry that injury flag, and automatically replaces any conflicts before generating your program."
  }
];

export function LandingPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="landing-container fade-in" style={{ paddingBottom: "80px" }}>

      {/* ── HERO ── */}
      <section style={{
        textAlign: "center",
        padding: "100px 24px 80px",
        background: `
          radial-gradient(ellipse at 50% -10%, rgba(249,115,22,0.22), transparent 55%),
          radial-gradient(ellipse at 80% 60%, rgba(34,211,238,0.08), transparent 40%)
        `,
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none"
        }} />

        <div className="container-width" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
            <span className="badge badge-primary" style={{ padding: "6px 14px" }}>Phase 1 MVP</span>
            <span className="badge badge-accent" style={{ padding: "6px 14px" }}>50+ Sports Supported</span>
          </div>

          <h1 className="heading-lg" style={{
            marginBottom: "28px",
            lineHeight: "1.05",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)"
          }}>
            BUILT FOR{" "}
            <span style={{
              background: "linear-gradient(to right, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>ATHLETES</span>.
            <br />
            <span style={{ fontWeight: 500, fontSize: "0.65em", opacity: 0.7 }}>
              NOT GENERIC GYM-GOERS.
            </span>
          </h1>

          <p style={{
            maxWidth: "640px",
            margin: "0 auto 44px auto",
            fontSize: "1.15rem",
            lineHeight: "1.65",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)"
          }}>
            A personalized strength & conditioning engine built around your sport, your schedule, your injuries, and your goals — adapting every cycle based on what you actually log.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => onNavigate("auth")} style={{ padding: "14px 28px", fontSize: "1rem" }}>
              Build My Program <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "1rem" }}
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* ── SPORT TICKER ── */}
      <section style={{
        padding: "24px",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        overflow: "hidden"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            Supported Sports:
          </span>
          {SPORT_EXAMPLES.map((s, i) => (
            <span key={i} style={{
              fontSize: "0.8rem",
              fontWeight: "600",
              color: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--accent)" : "var(--text-secondary)",
              padding: "4px 10px",
              backgroundColor: "var(--bg-page)",
              borderRadius: "9999px",
              border: "1px solid var(--border-color)",
              whiteSpace: "nowrap"
            }}>
              {s}
            </span>
          ))}
          <span style={{
            fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)",
            padding: "4px 10px", backgroundColor: "var(--primary-light)",
            borderRadius: "9999px"
          }}>
            + many more & Other
          </span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "50px 24px", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-width" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "30px", textAlign: "center" }}>
          {[
            { value: "50+", label: "Sport Disciplines", color: "var(--primary)" },
            { value: "1–7", label: "Days / Week Schedule", color: "var(--accent)" },
            { value: "100%", label: "Injury-Safe Swaps", color: "var(--info)" },
            { value: "4 Wk", label: "Adaptive Cycle Length", color: "var(--warning)" },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: "2.25rem", fontWeight: "800", fontFamily: "var(--font-display)", color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "8px", fontFamily: "var(--font-sans)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 24px" }}>
        <div className="container-width">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 className="heading-md" style={{ marginBottom: "16px" }}>
              Engineered for Performance.<br />
              <span style={{ color: "var(--accent)" }}>Built for Safety.</span>
            </h2>
            <p style={{ maxWidth: "560px", margin: "0 auto", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: "1.65" }}>
              Most fitness apps ignore sport-specific demands and injury history. We build every program from the ground up around who you actually are as an athlete.
            </p>
          </div>

          <div className="grid-cols-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card" style={{ borderTop: `3px solid ${f.color}` }}>
                <div style={{
                  width: "46px", height: "46px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: f.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: f.color, marginBottom: "18px"
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontSize: "1.05rem", marginBottom: "10px", fontWeight: "700",
                  textTransform: "none", fontFamily: "var(--font-sans)", letterSpacing: "normal"
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.6", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: "80px 24px",
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)"
      }}>
        <div className="container-width">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 className="heading-md" style={{ marginBottom: "16px" }}>How the Engine Works</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", fontFamily: "var(--font-sans)" }}>
              Three intake paths, one adaptive engine.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[
              { step: "01", color: "var(--accent)", title: "New to Structured Training", desc: "Build your athletic base — speed, power, stability, and coordination — before layering sport-specific work on top." },
              { step: "02", color: "var(--primary)", title: "I Compete or Play a Sport", desc: "Select from 50+ disciplines including rugby, rowing, or American football. Strength & conditioning is built around your sport's specific physical demands." },
              { step: "03", color: "var(--info)", title: "Gym-Focused / Bodybuilding", desc: "Choose your split, training days, and goals. The engine programs hypertrophy blocks with progressive overload tracking and injury-aware exercise selection." },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{ position: "relative", paddingTop: "32px" }}>
                <span style={{
                  position: "absolute", top: "16px", right: "20px",
                  fontSize: "2rem", fontWeight: "900", fontFamily: "var(--font-display)",
                  color: item.color, opacity: 0.25, lineHeight: 1
                }}>
                  {item.step}
                </span>
                <div style={{
                  width: "6px", height: "40px",
                  backgroundColor: item.color,
                  borderRadius: "3px",
                  marginBottom: "16px"
                }} />
                <h3 style={{
                  fontSize: "1.05rem", marginBottom: "10px", fontWeight: "700",
                  textTransform: "none", fontFamily: "var(--font-sans)"
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", fontFamily: "var(--font-sans)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Live Engine Demo */}
          <div className="glass-panel" style={{
            marginTop: "40px",
            background: "linear-gradient(135deg, rgba(249,115,22,0.06) 0%, rgba(34,211,238,0.04) 100%)",
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
              <span className="badge badge-accent">Live Engine Demo — Rugby Athlete, Knee Pain</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
              <div style={{ padding: "14px", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--primary)", fontSize: "0.85rem" }}>
                <strong>Profile:</strong> Rugby (Tight Forward) · Intermediate · 4 days/week · Goals: Power + Strength
              </div>
              <div style={{ padding: "14px", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--danger)", fontSize: "0.85rem" }}>
                <strong>Injury Flags:</strong> Active Knee Pain (Patellar Tendonitis)
              </div>
              <div style={{ padding: "14px", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--accent)", fontSize: "0.85rem", fontFamily: "var(--font-mono)" }}>
                <strong style={{ fontFamily: "var(--font-sans)" }}>Engine Action:</strong>
                <div style={{ marginTop: "6px", color: "var(--text-secondary)" }}>
                  ❌ Barbell Back Squat → knee stress<br />
                  ✅ Swap: Trap Bar Deadlift (High Handles)<br />
                  ❌ Depth Jump → patellar load<br />
                  ✅ Swap: Box Jump (Step-Down Landing)
                </div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: "20px" }} onClick={() => onNavigate("auth")}>
              Build My Program <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── INTAKE CHECKLIST ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="container-width grid-cols-2" style={{ alignItems: "center", gap: "48px" }}>
          <div>
            <h2 className="heading-md" style={{ marginBottom: "24px" }}>
              What we ask.<br />
              <span style={{ color: "var(--accent)" }}>Why it matters.</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: <CheckCircle size={18} />, c: "var(--primary)", label: "Primary sport (choose one)", detail: "50+ disciplines with custom entry for anything not listed" },
                { icon: <CheckCircle size={18} />, c: "var(--accent)", label: "Training goals (choose many)", detail: "Performance, strength, hypertrophy, fat loss, speed, endurance, mobility — stack them" },
                { icon: <CheckCircle size={18} />, c: "var(--info)", label: "Active injuries or pain areas", detail: "Knee, back, shoulder, ankle — engine filters all conflicting exercises immediately" },
                { icon: <CheckCircle size={18} />, c: "var(--warning)", label: "Days per week (1–7)", detail: "Your realistic schedule drives the session count and total weekly volume" },
                { icon: <CheckCircle size={18} />, c: "var(--primary)", label: "Equipment access", detail: "Full gym, home gym, or bodyweight — programming adapts to what you actually have" },
                { icon: <CheckCircle size={18} />, c: "var(--accent)", label: "Baseline benchmarks (optional)", detail: "Squat 1RM, vertical jump, mile time — sets your starting strength trajectory" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: item.c, flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.95rem", fontFamily: "var(--font-sans)" }}>{item.label}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px", fontFamily: "var(--font-sans)" }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Sport", value: "Rugby / American Football / Boxing / Rowing...", color: "var(--primary)" },
              { label: "Goals", value: "Power · Strength · Fat Loss · Endurance (multi-select)", color: "var(--accent)" },
              { label: "Injuries", value: "Knee Pain → engine removes 6 exercises", color: "var(--danger)" },
              { label: "Days/Week", value: "1, 2, 3, 4, 5, 6, or 7", color: "var(--info)" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 20px", backgroundColor: "var(--bg-card)",
                borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)",
                gap: "12px", flexWrap: "wrap"
              }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: "600", color: item.color, fontFamily: "var(--font-sans)", textAlign: "right" }}>
                  {item.value}
                </span>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: "100%", padding: "16px", fontSize: "1rem" }} onClick={() => onNavigate("auth")}>
              Start My Intake <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{
        padding: "80px 24px",
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border-color)"
      }}>
        <div className="container-width" style={{ maxWidth: "760px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="heading-md">Common Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                backgroundColor: "var(--bg-page)"
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "18px 20px", color: "var(--text-primary)", fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem", fontWeight: "600", textAlign: "left", gap: "12px"
                  }}
                >
                  <span>{item.q}</span>
                  {openFaq === i ? <ChevronUp size={18} style={{ flexShrink: 0, color: "var(--primary)" }} /> : <ChevronDown size={18} style={{ flexShrink: 0, color: "var(--text-muted)" }} />}
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: "0 20px 18px", fontSize: "0.875rem",
                    lineHeight: "1.65", color: "var(--text-secondary)", fontFamily: "var(--font-sans)"
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div className="container-width" style={{ maxWidth: "640px" }}>
          <h2 className="heading-md" style={{ marginBottom: "20px" }}>
            Ready to Train Like<br />
            <span style={{ color: "var(--primary)" }}>an Athlete?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "36px", fontSize: "1.05rem", fontFamily: "var(--font-sans)", lineHeight: "1.65" }}>
            It takes 3 minutes to complete your intake. Your personalized program is generated instantly — no waiting, no coaches, no subscription required to start.
          </p>
          <button className="btn btn-primary" style={{ padding: "16px 36px", fontSize: "1.05rem" }} onClick={() => onNavigate("auth")}>
            Build My Free Program <ArrowRight size={20} />
          </button>
        </div>
      </section>

    </div>
  );
}
