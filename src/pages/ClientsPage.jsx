import React, { useState, useEffect } from "react";
import { Users, Search, CheckCircle, AlertCircle, Mail, Phone, Dumbbell, Shield, Filter, UserCheck } from "lucide-react";

export function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    loadClientsData();
  }, []);

  const loadClientsData = () => {
    // Read registered users from localStorage
    let users = JSON.parse(localStorage.getItem("workoutapp_users") || "[]");
    const programs = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
    const workoutLogs = JSON.parse(localStorage.getItem("workoutapp_workout_logs") || "[]");

    // Enrich users with program & log metrics
    const enriched = users.map((u) => {
      const activeProg = programs.find((p) => p.user_id === u.id && p.status === "active");
      const logs = workoutLogs.filter((l) => l.user_id === u.id);
      
      return {
        ...u,
        phone: u.phone || "Not provided",
        isVerified: u.isVerified !== undefined ? u.isVerified : true,
        activeProgramName: activeProg ? activeProg.goal : (u.role === "coach" ? "Coach Account" : "Needs Onboarding"),
        completedWorkouts: logs.length,
        lastActive: logs.length > 0 ? logs[logs.length - 1].date : u.created_at
      };
    });

    setClients(enriched);
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    
    const matchesRole = filterRole === "all" || c.role === filterRole;

    return matchesSearch && matchesRole;
  });

  const totalVerified = clients.filter((c) => c.isVerified).length;
  const totalAthletes = clients.filter((c) => c.role === "athlete").length;

  return (
    <div className="container-width fade-in" style={{ padding: "32px 16px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)", padding: "8px", borderRadius: "var(--radius-md)" }}>
            <Users size={24} />
          </div>
          <h1 className="heading-lg" style={{ margin: 0 }}>Client & User Roster</h1>
        </div>
        <p className="text-mute" style={{ margin: 0 }}>
          Monitor client accounts, check email & phone verification status, and track training adherence.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid-3" style={{ marginBottom: "32px" }}>
        <div className="card-glass flex-between">
          <div>
            <span className="text-mute" style={{ fontSize: "0.85rem", fontWeight: "600" }}>TOTAL REGISTERED USERS</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", marginTop: "4px" }}>{clients.length}</div>
          </div>
          <div style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", padding: "12px", borderRadius: "50%" }}>
            <Users size={22} />
          </div>
        </div>

        <div className="card-glass flex-between">
          <div>
            <span className="text-mute" style={{ fontSize: "0.85rem", fontWeight: "600" }}>VERIFIED CLIENTS</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent)", marginTop: "4px" }}>
              {totalVerified} / {clients.length}
            </div>
          </div>
          <div style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "var(--accent)", padding: "12px", borderRadius: "50%" }}>
            <UserCheck size={22} />
          </div>
        </div>

        <div className="card-glass flex-between">
          <div>
            <span className="text-mute" style={{ fontSize: "0.85rem", fontWeight: "600" }}>ACTIVE ATHLETES</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", marginTop: "4px" }}>{totalAthletes}</div>
          </div>
          <div style={{ backgroundColor: "rgba(245, 158, 11, 0.15)", color: "var(--warning)", padding: "12px", borderRadius: "50%" }}>
            <Dumbbell size={22} />
          </div>
        </div>
      </div>

      {/* Controls: Search and Filter */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <div style={{ position: "relative", minWidth: "280px", flex: "1" }}>
          <Search size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "42px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Filter size={16} style={{ color: "var(--text-muted)" }} />
          <select
            className="form-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ minWidth: "150px" }}
          >
            <option value="all">All Roles</option>
            <option value="athlete">Athletes Only</option>
            <option value="coach">Coaches Only</option>
          </select>
        </div>
      </div>

      {/* Client Table / List */}
      <div className="card-glass" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                <th style={{ padding: "16px 20px", fontWeight: "700" }}>Client Name</th>
                <th style={{ padding: "16px 20px", fontWeight: "700" }}>Role</th>
                <th style={{ padding: "16px 20px", fontWeight: "700" }}>Contact Info</th>
                <th style={{ padding: "16px 20px", fontWeight: "700" }}>Verification</th>
                <th style={{ padding: "16px 20px", fontWeight: "700" }}>Current Plan</th>
                <th style={{ padding: "16px 20px", fontWeight: "700" }}>Workouts</th>
                <th style={{ padding: "16px 20px", fontWeight: "700" }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
                    {clients.length === 0
                      ? "No registered clients yet. Accounts appear here after athletes sign up."
                      : "No clients found matching your search."}
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                      cursor: "pointer",
                      transition: "background 0.2s ease"
                    }}
                    className="table-row-hover"
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: "var(--primary)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          fontSize: "0.9rem"
                        }}>
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>{client.name}</div>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: {client.id}</span>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "16px 20px" }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        backgroundColor: client.role === "coach" ? "rgba(139, 92, 246, 0.15)" : "rgba(59, 130, 246, 0.15)",
                        color: client.role === "coach" ? "#8b5cf6" : "#3b82f6"
                      }}>
                        {client.role === "coach" ? <Shield size={12} /> : <Dumbbell size={12} />}
                        {client.role.charAt(0).toUpperCase() + client.role.slice(1)}
                      </span>
                    </td>

                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>
                          <Mail size={13} style={{ color: "var(--text-muted)" }} />
                          {client.email}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          <Phone size={13} />
                          {client.phone}
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "16px 20px" }}>
                      {client.isVerified ? (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "var(--accent)",
                          fontSize: "0.8rem",
                          fontWeight: "600"
                        }}>
                          <CheckCircle size={15} /> Verified
                        </span>
                      ) : (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "var(--warning)",
                          fontSize: "0.8rem",
                          fontWeight: "600"
                        }}>
                          <AlertCircle size={15} /> Unverified
                        </span>
                      )}
                    </td>

                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontWeight: "600", textTransform: "capitalize" }}>
                        {client.activeProgramName}
                      </span>
                    </td>

                    <td style={{ padding: "16px 20px", fontWeight: "600" }}>
                      {client.completedWorkouts} Done
                    </td>

                    <td style={{ padding: "16px 20px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {new Date(client.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Client Modal / Detailed View */}
      {selectedClient && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div className="glass-panel fade-in" style={{ width: "100%", maxWidth: "520px", padding: "32px", position: "relative" }}>
            <button
              onClick={() => setSelectedClient(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                cursor: "pointer"
              }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "var(--primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "800"
              }}>
                {selectedClient.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="heading-md" style={{ margin: 0 }}>{selectedClient.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{selectedClient.role.toUpperCase()}</span>
                  •
                  {selectedClient.isVerified ? (
                    <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: "600" }}>Verified Account</span>
                  ) : (
                    <span style={{ color: "var(--warning)", fontSize: "0.8rem", fontWeight: "600" }}>Pending Verification</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
              <div>
                <div className="text-mute" style={{ fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>EMAIL ADDRESS</div>
                <div style={{ fontWeight: "600" }}>{selectedClient.email}</div>
              </div>

              <div>
                <div className="text-mute" style={{ fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>PHONE NUMBER</div>
                <div style={{ fontWeight: "600" }}>{selectedClient.phone}</div>
              </div>

              <div>
                <div className="text-mute" style={{ fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>ACTIVE PROGRAM</div>
                <div style={{ fontWeight: "600", textTransform: "capitalize" }}>{selectedClient.activeProgramName}</div>
              </div>

              <div>
                <div className="text-mute" style={{ fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>WORKOUTS LOGGED</div>
                <div style={{ fontWeight: "600" }}>{selectedClient.completedWorkouts} session(s) completed</div>
              </div>

              <div>
                <div className="text-mute" style={{ fontSize: "0.8rem", fontWeight: "600", marginBottom: "4px" }}>REGISTRATION DATE</div>
                <div style={{ fontWeight: "600" }}>{new Date(selectedClient.created_at).toLocaleString()}</div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "28px" }}
              onClick={() => setSelectedClient(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
