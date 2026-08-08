import React, { useState } from "react";
import { User, Mail, Lock, Phone, ShieldAlert, CheckCircle2, KeyRound } from "lucide-react";

export function AuthPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "athlete"
  });
  
  // OTP Verification Step State
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtpInput, setUserOtpInput] = useState("");
  
  const [error, setError] = useState("");
  const [passStrength, setPassStrength] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password" && isRegister) {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (pass) => {
    if (pass.length === 0) {
      setPassStrength("");
    } else if (pass.length < 6) {
      setPassStrength("Weak (min 6 chars)");
    } else if (!/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
      setPassStrength("Medium (add numbers & capital letters)");
    } else {
      setPassStrength("Strong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const existingUsers = JSON.parse(localStorage.getItem("workoutapp_users") || "[]");

    if (isRegister) {
      // Input Validation
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setError("Please fill out all fields including email and phone number.");
        return;
      }

      // Basic Email pattern validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address (e.g. name@domain.com).");
        return;
      }

      // Phone validation
      if (formData.phone.length < 7) {
        setError("Please enter a valid phone number.");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      
      const emailExists = existingUsers.some((u) => u.email.toLowerCase() === formData.email.toLowerCase());
      if (emailExists) {
        setError("An account with this email already exists.");
        return;
      }

      // Generate a 6-digit OTP code to verify email & phone
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomCode);
      setShowVerificationStep(true);

    } else {
      // Login flow
      if (!formData.email || !formData.password) {
        setError("Please enter your email and password.");
        return;
      }

      const matchedUser = existingUsers.find(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.password_hash === `hash_${formData.password}`
      );

      if (!matchedUser) {
        setError("Email or password incorrect.");
        return;
      }

      localStorage.setItem("workoutapp_currentUser", JSON.stringify(matchedUser));
      
      const userPrograms = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");
      const activeProgram = userPrograms.find((p) => p.user_id === matchedUser.id && p.status === "active");
      
      onLoginSuccess(matchedUser, !activeProgram);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (userOtpInput.trim() !== generatedOtp) {
      setError("Incorrect verification code. Please check code on screen.");
      return;
    }

    // OTP Verified! Complete registration
    const existingUsers = JSON.parse(localStorage.getItem("workoutapp_users") || "[]");
    
    const newUser = {
      id: `usr_${Date.now()}`,
      name: formData.name,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      isVerified: true,
      password_hash: `hash_${formData.password}`,
      role: formData.role,
      created_at: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem("workoutapp_users", JSON.stringify(existingUsers));
    localStorage.setItem("workoutapp_currentUser", JSON.stringify(newUser));

    onLoginSuccess(newUser, true);
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      padding: "24px"
    }} className="fade-in">
      <div className="glass-panel" style={{ width: "100%", maxWidth: "460px", padding: "40px 32px" }}>
        
        {/* Verification Step Modal View */}
        {showVerificationStep ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{
                display: "inline-flex",
                padding: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                marginBottom: "12px"
              }}>
                <KeyRound size={28} />
              </div>
              <h2 className="heading-md" style={{ marginBottom: "6px" }}>Verify Email & Phone</h2>
              <p className="text-mute" style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>
                We sent a 6-digit verification code to <strong>{formData.email}</strong> and SMS to <strong>{formData.phone}</strong>.
              </p>
            </div>

            {/* Verification Simulation Notification Banner */}
            <div style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-md)",
              padding: "14px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: "600" }}>
                SIMULATED VERIFICATION CODE (SMS/EMAIL):
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "900", letterSpacing: "6px", color: "var(--accent)", marginTop: "4px" }}>
                {generatedOtp}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                (In production, this code is sent to user's real SMS/Email via Twilio or Resend)
              </div>
            </div>

            {error && (
              <div style={{
                display: "flex",
                gap: "10px",
                backgroundColor: "var(--danger-light)",
                border: "1px solid var(--danger)",
                color: "var(--danger)",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                marginBottom: "20px"
              }}>
                <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label className="form-label">Enter 6-Digit Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={userOtpInput}
                  onChange={(e) => setUserOtpInput(e.target.value)}
                  className="form-input"
                  placeholder="123456"
                  style={{ textAlign: "center", letterSpacing: "4px", fontSize: "1.2rem", fontWeight: "700" }}
                />
              </div>

              <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: "12px", padding: "14px" }}>
                Confirm & Create Account
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                style={{ width: "100%", marginTop: "8px" }}
                onClick={() => {
                  setShowVerificationStep(false);
                  setError("");
                }}
              >
                Back to Registration
              </button>
            </form>
          </div>
        ) : (
          /* Normal Auth Form */
          <>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2 className="heading-md" style={{ marginBottom: "8px" }}>
                {isRegister ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-mute" style={{ fontSize: "0.9rem" }}>
                {isRegister ? "Join with verified email & phone number" : "Sign in to log your training"}
              </p>
            </div>

            {error && (
              <div style={{
                display: "flex",
                gap: "10px",
                backgroundColor: "var(--danger-light)",
                border: "1px solid var(--danger)",
                color: "var(--danger)",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                marginBottom: "20px"
              }}>
                <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div style={{ position: "relative" }}>
                    <User size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Alex Mercer"
                      style={{ paddingLeft: "42px" }}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="alex@domain.com"
                    style={{ paddingLeft: "42px" }}
                  />
                </div>
              </div>

              {isRegister && (
                <div className="form-group">
                  <label className="form-label">Phone Number (For OTP Verification)</label>
                  <div style={{ position: "relative" }}>
                    <Phone size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+1 (555) 019-2834"
                      style={{ paddingLeft: "42px" }}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="••••••••"
                    style={{ paddingLeft: "42px" }}
                  />
                </div>
                {isRegister && passStrength && (
                  <span style={{
                    fontSize: "0.75rem",
                    marginTop: "6px",
                    fontWeight: "600",
                    display: "block",
                    color: passStrength.includes("Strong") ? "var(--accent)" : passStrength.includes("Medium") ? "var(--warning)" : "var(--danger)"
                  }}>
                    Strength: {passStrength}
                  </span>
                )}
              </div>

              {isRegister && (
                <div className="form-group">
                  <label className="form-label">Account Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="athlete">Athlete (Training Program)</option>
                    <option value="coach">Coach (Manage Athletes & Clients)</option>
                  </select>
                </div>
              )}

              <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: "10px", padding: "14px" }}>
                {isRegister ? "Continue to Verification" : "Log In"}
              </button>
            </form>

            <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.9rem" }}>
              <span className="text-mute">
                {isRegister ? "Already have an account? " : "New to the platform? "}
              </span>
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary)",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {isRegister ? "Sign In" : "Register"}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
