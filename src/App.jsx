import React, { useState, useEffect } from "react";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { WorkoutPage } from "./pages/WorkoutPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { AIChatbot } from "./components/AIChatbot";
import { purgeDemoSeedDataFromStorage } from "./utils/purgeDemoSeedData";
import { LogOut, LayoutDashboard, BarChart2, Sun, Moon, Dumbbell, Trophy } from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [program, setProgram] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [page, setPage] = useState("landing"); // landing, auth, onboarding, dashboard, analytics, workout, leaderboard
  const [theme, setTheme] = useState(localStorage.getItem("workoutapp_theme") || "dark");

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("workoutapp_theme", theme);
  }, [theme]);

  // Load Session on Mount
  useEffect(() => {
    purgeDemoSeedDataFromStorage();

    const currentUser = JSON.parse(localStorage.getItem("workoutapp_currentUser"));
    if (currentUser) {
      setUser(currentUser);
      
      // Load user program
      const programs = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
      const activeProg = programs.find((p) => p.user_id === currentUser.id && p.status === "active");
      if (activeProg) {
        setProgram(activeProg);
        setPage("dashboard");
      } else {
        setPage("onboarding");
      }
    }
  }, []);

  const handleLoginSuccess = (loggedInUser, needsOnboarding) => {
    setUser(loggedInUser);
    const programs = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
    const activeProg = programs.find((p) => p.user_id === loggedInUser.id && p.status === "active");

    if (activeProg) {
      setProgram(activeProg);
      setPage("dashboard");
    } else if (needsOnboarding) {
      setPage("onboarding");
    } else {
      setPage("dashboard");
    }
  };

  const handleOnboardingComplete = (newProgram) => {
    setProgram(newProgram);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("workoutapp_currentUser");
    setUser(null);
    setProgram(null);
    setPage("landing");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleResetOnboarding = () => {
    // Archives old programs
    if (program) {
      const programs = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
      const updated = programs.map((p) => p.id === program.id ? { ...p, status: "archived" } : p);
      localStorage.setItem("workoutapp_programs", JSON.stringify(updated));
    }
    setProgram(null);
    setPage("onboarding");
  };

  return (
    <>
      {/* Navigation Header */}
      <header style={{
        backgroundColor: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div className="container-width flex-between" style={{ height: "70px" }}>
          {/* Logo */}
          <div
            onClick={() => setPage(user ? (program ? "dashboard" : "onboarding") : "landing")}
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <div style={{
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              padding: "6px",
              borderRadius: "var(--radius-md)"
            }}>
              <Dumbbell size={20} />
            </div>
            <strong style={{ fontSize: "1.2rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
              AI Workout Coach
            </strong>
          </div>

          {/* Navigation Items */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {user && page !== "workout" && (
              <nav style={{ display: "flex", gap: "8px" }}>
                {program && (
                  <>
                    <button
                      className={`btn ${page === "dashboard" ? "btn-primary" : "btn-ghost"}`}
                      style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                      onClick={() => setPage("dashboard")}
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </button>
                    <button
                      className={`btn ${page === "analytics" ? "btn-primary" : "btn-ghost"}`}
                      style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                      onClick={() => setPage("analytics")}
                    >
                      <BarChart2 size={14} /> Analytics
                    </button>
                  </>
                )}
                <button
                  className={`btn ${page === "leaderboard" ? "btn-primary" : "btn-ghost"}`}
                  style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                  onClick={() => setPage("leaderboard")}
                >
                  <Trophy size={14} /> Leaderboard
                </button>
              </nav>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: user ? "1px solid var(--border-color)" : "none", paddingLeft: user ? "16px" : 0 }}>
              {/* Theme Toggle */}
              <button
                className="btn btn-secondary"
                style={{ padding: "8px", borderRadius: "50%", width: "36px", height: "36px" }}
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: "8px", borderRadius: "50%", width: "36px", height: "36px" }}
                    onClick={handleLogout}
                    title="Log Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                page !== "auth" && (
                  <button className="btn btn-primary" onClick={() => setPage("auth")} style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                    Log In
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {page === "landing" && <LandingPage onNavigate={setPage} />}
        
        {page === "auth" && <AuthPage onLoginSuccess={handleLoginSuccess} />}
        
        {page === "onboarding" && (
          <OnboardingPage user={user} onComplete={handleOnboardingComplete} />
        )}
        
        {page === "dashboard" && program && (
          <DashboardPage
            user={user}
            program={program}
            onSelectWorkout={(day) => {
              setActiveWorkout(day);
              setPage("workout");
            }}
            onProgramUpdate={setProgram}
            onResetOnboarding={handleResetOnboarding}
          />
        )}
        
        {page === "workout" && activeWorkout && (
          <WorkoutPage
            user={user}
            workout={activeWorkout}
            onCompleteWorkout={() => {
              setActiveWorkout(null);
              setPage("dashboard");
            }}
            onCancel={() => {
              setActiveWorkout(null);
              setPage("dashboard");
            }}
          />
        )}

        {page === "analytics" && program && (
          <AnalyticsPage user={user} program={program} />
        )}

        {page === "leaderboard" && (
          <LeaderboardPage user={user} />
        )}
      </main>

      {/* Floating 24/7 AI Chatbot Assistant Widget */}
      <AIChatbot currentUser={user} />

      <footer style={{
        borderTop: "1px solid var(--border-color)",
        backgroundColor: "var(--bg-card)",
        padding: "24px",
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        textAlign: "center"
      }}>
        <div className="container-width">
          © 2026 AI Workout Coach. Phase 1 MVP. All rights reserved.
        </div>
      </footer>
    </>
  );
}
