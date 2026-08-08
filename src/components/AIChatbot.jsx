import React, { useState, useEffect, useRef } from "react";
import { Send, X, Bot, User, Video, ExternalLink, Download } from "lucide-react";
import { exerciseDb } from "../database/exerciseDb";
import { exportChatQuestionsCSV } from "../utils/csvExporter";

export function AIChatbot({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: `Hello ${currentUser ? currentUser.name.split(" ")[0] : "there"}! 👋 I am your 24/7 AI Training & Nutrition Assistant. Ask me anything about your exercises, form tips, workout videos, or diet!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Intelligent AI response engine logic with exercise & video search
  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // 1. Search exercise database for matching exercises
    const matchedExercise = exerciseDb.find((ex) => {
      const nameMatch = ex.name.toLowerCase().includes(q) || q.includes(ex.name.toLowerCase());
      const keywords = ex.name.toLowerCase().split(" ");
      const keywordMatch = keywords.some(kw => kw.length > 3 && q.includes(kw));
      return nameMatch || keywordMatch;
    });

    // If explicit video request or exercise query matched
    if (matchedExercise || q.includes("video") || q.includes("how to do") || q.includes("form") || q.includes("demonstrate")) {
      let exName = matchedExercise ? matchedExercise.name : userQuery.replace(/video|how to do|show me|demonstration|please|form/gi, "").trim();
      if (!exName) exName = "Barbell Back Squat";

      const videoLink = matchedExercise ? matchedExercise.video_url : `https://www.youtube.com/results?search_query=how+to+do+${encodeURIComponent(exName)}+exercise`;
      const tipsText = matchedExercise ? matchedExercise.tips : "Maintain a neutral spine, control the movement tempo, and drive through mid-foot.";
      const targetText = matchedExercise ? matchedExercise.body_regions.join(", ") : "full body";

      return {
        text: `🏋️ **Exercise Guide for ${exName}**\n\n🎯 **Targets:** ${targetText}\n\n💡 **Form Tip:** ${tipsText}\n\n📺 Click below to watch the video demonstration!`,
        videoUrl: videoLink,
        videoTitle: `Watch ${exName} Video Tutorial`
      };
    }

    // 2. Nutrition and Diet queries
    if (q.includes("eat") || q.includes("food") || q.includes("diet") || q.includes("nutrition") || q.includes("protein") || q.includes("meal")) {
      return {
        text: "🥗 **Nutrition Tip:** Aim for 1.6g - 2.2g of protein per kg of bodyweight daily for muscle recovery. Eat a balanced meal with complex carbs and protein 1-2 hours before training!"
      };
    }

    // 3. Soreness & Recovery
    if (q.includes("sore") || q.includes("rest") || q.includes("pain") || q.includes("recovery") || q.includes("sleep")) {
      return {
        text: "💤 **Recovery Advice:** DOMS (muscle soreness) is normal. If soreness is mild, perform active recovery like walking or stretching. Prioritize 7-9 hours of sleep and adequate hydration!"
      };
    }

    // 4. Sets & Reps / Hypertrophy vs Strength
    if (q.includes("set") || q.includes("rep") || q.includes("weight") || q.includes("heavy") || q.includes("rpe")) {
      return {
        text: "⚡️ **Training Volume:** For Hypertrophy (muscle size), perform 8-12 reps per set at RPE 7-9. For Max Strength, target 3-6 reps with heavier loads and 2-3 min rest between sets."
      };
    }

    // 5. Warmup & Stretching
    if (q.includes("warm") || q.includes("stretch") || q.includes("prepare") || q.includes("mobility")) {
      return {
        text: "🔥 **Dynamic Warmup:** Always start with 5-10 minutes of dynamic movements (hip openers, leg swings, arm circles) before lifting to prime your nervous system and prevent injury."
      };
    }

    // Default friendly answer
    return {
      text: `Great question! For "${userQuery}", maintain consistent technique, apply progressive overload weekly, and prioritize rest. Feel free to ask me for any exercise video tutorials!`
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const timestamp = new Date();
    const timeStr = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      time: timeStr
    };

    const responseObj = generateAIResponse(query);

    // Bot message
    const botMsg = {
      id: Date.now() + 1,
      sender: "bot",
      text: responseObj.text,
      videoUrl: responseObj.videoUrl,
      videoTitle: responseObj.videoTitle,
      time: timeStr
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");

    // LOG QUESTION & ANSWER TO BROWSER AUDIT LOG FOR COACH REVIEW
    saveQuestionToAuditLog({
      id: `log_${Date.now()}`,
      userName: currentUser ? currentUser.name : "Guest Athlete",
      userEmail: currentUser ? currentUser.email : "guest@domain.com",
      question: query,
      answer: responseObj.text,
      timestamp: timestamp.toISOString()
    });
  };

  const saveQuestionToAuditLog = (logEntry) => {
    const existingLogs = JSON.parse(localStorage.getItem("workoutapp_chat_questions_log") || "[]");
    existingLogs.unshift(logEntry);
    localStorage.setItem("workoutapp_chat_questions_log", JSON.stringify(existingLogs));
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000 }}>
      {/* Collapsible Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary"
          style={{
            borderRadius: "30px",
            padding: "12px 20px",
            boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.9rem",
            fontWeight: "700"
          }}
        >
          <Bot size={22} />
          <span>Ask AI Coach (24/7)</span>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#10b981",
            boxShadow: "0 0 8px #10b981"
          }}></span>
        </button>
      )}

      {/* Floating Chat Box Window */}
      {isOpen && (
        <div className="glass-panel fade-in" style={{
          width: "380px",
          height: "540px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
          border: "1px solid var(--border-color)",
          overflow: "hidden"
        }}>
          {/* Chat Header */}
          <div style={{
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "6px",
                borderRadius: "50%"
              }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>24/7 AI Coach Assistant</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>Form check & video guide ready</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={exportChatQuestionsCSV}
                title="Download Question Log CSV"
                style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "6px", borderRadius: "50%", cursor: "pointer" }}
              >
                <Download size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "var(--bg-main)"
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  display: "flex",
                  gap: "8px",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row"
                }}
              >
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: msg.sender === "user" ? "var(--accent)" : "var(--primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "0.75rem",
                  fontWeight: "700"
                }}>
                  {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>

                <div>
                  <div style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    backgroundColor: msg.sender === "user" ? "var(--primary)" : "var(--bg-card)",
                    color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
                    border: msg.sender === "bot" ? "1px solid var(--border-color)" : "none",
                    fontSize: "0.85rem",
                    lineHeight: "1.45",
                    whiteSpace: "pre-line"
                  }}>
                    {msg.text}

                    {/* Video URL Link or Embed */}
                    {msg.videoUrl && (
                      <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
                        {msg.videoUrl.includes("youtube.com/embed") ? (
                          <div style={{ borderRadius: "8px", overflow: "hidden", marginTop: "6px" }}>
                            <iframe
                              width="100%"
                              height="160"
                              src={msg.videoUrl}
                              title="Exercise Demonstration"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <a
                            href={msg.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "8px 12px",
                              fontSize: "0.78rem",
                              fontWeight: "700",
                              color: "#ffffff",
                              backgroundColor: "#ef4444",
                              borderRadius: "8px",
                              textDecoration: "none",
                              marginTop: "4px"
                            }}
                          >
                            <Video size={14} />
                            <span>{msg.videoTitle || "Watch Video Demonstration"}</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    marginTop: "3px",
                    textAlign: msg.sender === "user" ? "right" : "left"
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              display: "flex",
              padding: "12px",
              gap: "8px",
              backgroundColor: "var(--bg-card)",
              borderTop: "1px solid var(--border-color)"
            }}
          >
            <input
              type="text"
              className="form-input"
              placeholder="Ask about exercises, videos, diet..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ fontSize: "0.85rem", padding: "10px 14px" }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: "10px 14px", flexShrink: 0 }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
