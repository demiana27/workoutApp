import React, { useState, useEffect } from "react";
import { Trophy, Award, Flame, Star, Download, ShieldCheck, Zap, Users, Target, CheckCircle } from "lucide-react";
import { exportClientsCSV, exportChatQuestionsCSV } from "../utils/csvExporter";

export function LeaderboardPage({ user }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  useEffect(() => {
    // Generate/Load competitive leaderboard from localStorage users + demo athletes
    const users = JSON.parse(localStorage.getItem("workoutapp_users") || "[]");
    const profiles = JSON.parse(localStorage.getItem("workoutapp_profiles") || "[]");

    const demoAthletes = [
      { id: "usr_101", name: "Sarah Jenkins", role: "athlete", score: 2850, streak: 14, completedWorkouts: 24, level: "advanced", badge: "Gold 🥇" },
      { id: "usr_102", name: "Marcus Vance", role: "athlete", score: 2400, streak: 11, completedWorkouts: 19, level: "intermediate", badge: "Silver 🥈" },
      { id: "usr_103", name: "Elena Rostova", role: "athlete", score: 1950, streak: 7, completedWorkouts: 15, level: "intermediate", badge: "Bronze 🥉" },
      { id: "usr_104", name: "David Miller", role: "athlete", score: 1600, streak: 5, completedWorkouts: 12, level: "beginner", badge: "Rising Star ⭐️" },
      { id: "usr_105", name: "Chloe Bennett", role: "athlete", score: 1350, streak: 4, completedWorkouts: 9, level: "beginner", badge: "Contender ⚡️" }
    ];

    let allAthletes = [...demoAthletes];

    users.forEach((u) => {
      if (!allAthletes.some((a) => a.id === u.id)) {
        const prof = profiles.find((p) => p.user_id === u.id) || {};
        const logs = JSON.parse(localStorage.getItem(`workoutapp_logs_${u.id}`) || "[]");
        
        // Calculate score: 100 XP per workout + 50 per streak day + baseline
        const workoutCount = logs.length || (u.id === user?.id ? 3 : 1);
        const streakDays = Math.min(workoutCount * 2, 10);
        const score = (workoutCount * 120) + (streakDays * 50) + 800;

        allAthletes.push({
          id: u.id,
          name: u.name,
          role: u.role || "athlete",
          score: score,
          streak: streakDays,
          completedWorkouts: workoutCount,
          level: prof.level || "intermediate",
          badge: "Active Competitor 🔥"
        });
      }
    });

    // If active user is logged in, ensure their live stats are computed & included
    if (user) {
      const userLogs = JSON.parse(localStorage.getItem(`workoutapp_logs_${user.id}`) || "[]");
      const userProf = profiles.find((p) => p.user_id === user.id) || {};
      const userWorkouts = userLogs.length;
      const userStreak = userWorkouts > 0 ? userWorkouts * 2 + 1 : 3;
      const userScore = (userWorkouts * 150) + (userStreak * 60) + 950;

      const existingIndex = allAthletes.findIndex((a) => a.id === user.id);
      const userObj = {
        id: user.id,
        name: `${user.name} (You)`,
        role: user.role || "athlete",
        score: userScore,
        streak: userStreak,
        completedWorkouts: userWorkouts,
        level: userProf.level || "intermediate",
        badge: "Challenger 🚀",
        isCurrentUser: true
      };

      if (existingIndex !== -1) {
        allAthletes[existingIndex] = userObj;
      } else {
        allAthletes.push(userObj);
      }
    }

    // Sort descending by total score
    allAthletes.sort((a, b) => b.score - a.score);

    // Assign rank badges
    allAthletes = allAthletes.map((athlete, idx) => {
      let badge = athlete.badge;
      if (idx === 0) badge = "Gold Champion 🥇";
      else if (idx === 1) badge = "Silver Master 🥈";
      else if (idx === 2) badge = "Bronze Titan 🥉";

      return { ...athlete, rank: idx + 1, badge };
    });

    setLeaderboard(allAthletes);

    if (user) {
      const myRank = allAthletes.find((a) => a.id === user.id);
      setCurrentUserRank(myRank);
    }
  }, [user]);

  return (
    <div className="container-width fade-in" style={{ padding: "40px 24px" }}>
      
      {/* Top Banner Header */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        marginBottom: "30px",
        backgroundColor: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "28px"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ padding: "8px", borderRadius: "50%", backgroundColor: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
              <Trophy size={24} />
            </div>
            <h1 className="heading-md" style={{ margin: 0 }}>Client Competition Leaderboard</h1>
          </div>
          <p className="text-mute" style={{ fontSize: "0.9rem", margin: 0 }}>
            Earn XP scores by logging workouts, maintaining daily streaks, and completing weekly athletic challenges!
          </p>
        </div>

        {/* Live Export CSV Actions */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button className="btn btn-secondary" onClick={exportClientsCSV} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
            <Download size={16} /> Export Clients CSV
          </button>
          <button className="btn btn-secondary" onClick={exportChatQuestionsCSV} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
            <Download size={16} /> Export Chat Questions Log CSV
          </button>
        </div>
      </div>

      {/* Current User Stats Scorecard Banner */}
      {currentUserRank && (
        <div className="glass-panel slide-up" style={{
          marginBottom: "30px",
          background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)",
          border: "1px solid var(--primary)",
          padding: "24px"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "var(--primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                fontWeight: "900",
                boxShadow: "0 0 16px rgba(124, 58, 237, 0.4)"
              }}>
                #{currentUserRank.rank}
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--primary-light)", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.05em" }}>
                  Your Leaderboard Standing
                </div>
                <h3 style={{ fontSize: "1.25rem", margin: "2px 0 4px", fontWeight: "800" }}>
                  {currentUserRank.name} — {currentUserRank.badge}
                </h3>
                <span className="badge badge-accent" style={{ fontSize: "0.75rem" }}>
                  Level: {currentUserRank.level.toUpperCase()}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>Total Score</div>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f59e0b", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Zap size={18} /> {currentUserRank.score} XP
                </div>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid var(--border-color)", paddingLeft: "24px" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>Active Streak</div>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#ef4444", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Flame size={18} /> {currentUserRank.streak} Days
                </div>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid var(--border-color)", paddingLeft: "24px" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>Workouts Done</div>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--accent)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <CheckCircle size={18} /> {currentUserRank.completedWorkouts}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Rankings & Weekly Challenges */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        
        {/* Leaderboard Rankings Table */}
        <div className="glass-panel" style={{ padding: "24px" }}>
          <div className="flex-between" style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <Users size={18} style={{ color: "var(--primary)" }} /> Global Client Leaderboard
            </h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Updated real-time
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "12px 8px" }}>Rank</th>
                  <th style={{ padding: "12px 8px" }}>Athlete</th>
                  <th style={{ padding: "12px 8px" }}>Level</th>
                  <th style={{ padding: "12px 8px" }}>Streak</th>
                  <th style={{ padding: "12px 8px" }}>Workouts</th>
                  <th style={{ padding: "12px 8px", textAlign: "right" }}>XP Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((ath) => (
                  <tr
                    key={ath.id}
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                      backgroundColor: ath.isCurrentUser ? "rgba(124, 58, 237, 0.12)" : "transparent"
                    }}
                  >
                    <td style={{ padding: "14px 8px", fontWeight: "800" }}>
                      {ath.rank === 1 ? "🥇 1" : ath.rank === 2 ? "🥈 2" : ath.rank === 3 ? "🥉 3" : `#${ath.rank}`}
                    </td>
                    <td style={{ padding: "14px 8px" }}>
                      <strong style={{ display: "block", color: ath.isCurrentUser ? "var(--primary-light)" : "var(--text-primary)" }}>
                        {ath.name}
                      </strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ath.badge}</span>
                    </td>
                    <td style={{ padding: "14px 8px" }}>
                      <span className="badge badge-secondary" style={{ fontSize: "0.72rem", textTransform: "capitalize" }}>
                        {ath.level}
                      </span>
                    </td>
                    <td style={{ padding: "14px 8px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#ef4444", fontWeight: "700" }}>
                        <Flame size={14} /> {ath.streak}d
                      </span>
                    </td>
                    <td style={{ padding: "14px 8px", fontWeight: "600" }}>
                      {ath.completedWorkouts} sessions
                    </td>
                    <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: "800", color: "#f59e0b" }}>
                      {ath.score} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Challenges Card Side Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Target size={18} style={{ color: "var(--accent)" }} /> Weekly Quests & Bonus XP
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              
              <div className="glass-card" style={{ padding: "14px", borderLeft: "3px solid var(--accent)" }}>
                <div className="flex-between" style={{ marginBottom: "4px" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Complete 3 Workouts</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: "700" }}>+300 XP</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                  Finish at least 3 athletic training sessions this week.
                </p>
              </div>

              <div className="glass-card" style={{ padding: "14px", borderLeft: "3px solid var(--primary)" }}>
                <div className="flex-between" style={{ marginBottom: "4px" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Maintain 5-Day Streak</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary-light)", fontWeight: "700" }}>+250 XP</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                  Log into the app and train 5 consecutive days.
                </p>
              </div>

              <div className="glass-card" style={{ padding: "14px", borderLeft: "3px solid #f59e0b" }}>
                <div className="flex-between" style={{ marginBottom: "4px" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Log PR or 1RM Target</strong>
                  <span style={{ fontSize: "0.75rem", color: "#f59e0b", fontWeight: "700" }}>+200 XP</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                  Update your squat or jump benchmark in Analytics.
                </p>
              </div>

            </div>
          </div>

          <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
            <Star size={32} style={{ color: "#f59e0b", marginBottom: "8px" }} />
            <h4 style={{ fontSize: "0.95rem", margin: "0 0 4px" }}>Coach Leaderboard Reward</h4>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
              The #1 ranked athlete each month wins a free 1-on-1 personalized form check & nutrition consultation!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
