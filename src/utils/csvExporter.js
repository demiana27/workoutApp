/**
 * CSV Exporter Utility to download real-time client data & chat logs
 */

export function exportClientsCSV() {
  const users = JSON.parse(localStorage.getItem("workoutapp_users") || "[]");
  const profiles = JSON.parse(localStorage.getItem("workoutapp_profiles") || "[]");
  const programs = JSON.parse(localStorage.getItem("workoutapp_programs") || "[]");

  // Fallback demo clients if local storage is empty
  const defaultClients = [
    {
      id: "usr_101",
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      isVerified: true,
      role: "athlete",
      program: "Hypertrophy / Muscle Gain",
      completedWorkouts: 12,
      created_at: "2026-07-15 09:30:00"
    },
    {
      id: "usr_102",
      name: "Marcus Vance",
      email: "marcus.vance@example.com",
      phone: "+1 (555) 987-6543",
      isVerified: true,
      role: "athlete",
      program: "Fat Loss / Conditioning",
      completedWorkouts: 8,
      created_at: "2026-07-22 14:15:00"
    },
    {
      id: "usr_103",
      name: "Elena Rostova",
      email: "elena.r@example.com",
      phone: "+1 (555) 456-7890",
      isVerified: false,
      role: "athlete",
      program: "Strength & Power",
      completedWorkouts: 3,
      created_at: "2026-07-27 11:45:00"
    }
  ];

  const clientList = users.length > 0 ? users.map((u) => {
    const prof = profiles.find((p) => p.user_id === u.id) || {};
    const prog = programs.find((pr) => pr.user_id === u.id && pr.status === "active") || {};
    const logs = JSON.parse(localStorage.getItem(`workoutapp_logs_${u.id}`) || "[]");

    return {
      id: u.id,
      name: u.name || "Athlete",
      email: u.email || "n/a",
      phone: u.phone || "n/a",
      isVerified: u.isVerified !== false,
      role: u.role || "athlete",
      level: prof.level || "beginner",
      program: prog.goal ? prog.goal.replace(/_/g, " ") : "Athletic General Fitness",
      completedWorkouts: logs.length,
      created_at: u.created_at || new Date().toISOString()
    };
  }) : defaultClients;

  const header = '"User ID","Full Name","Email Address","Phone Number","Verification Status","Account Role","Experience Level","Active Program Goal","Workouts Completed","Registration Date"';

  const rows = clientList.map((c) => {
    const status = c.isVerified ? "Verified" : "Pending OTP Verification";
    const level = c.level || "beginner";
    return `"${c.id}","${c.name}","${c.email}","${c.phone}","${status}","${c.role}","${level}","${c.program}","${c.completedWorkouts || 0}","${c.created_at}"`;
  });

  const csvContent = [header, ...rows].join("\n");
  downloadCSVFile(csvContent, "clients_data.csv");
}

export function exportChatQuestionsCSV() {
  const existingLogs = JSON.parse(localStorage.getItem("workoutapp_chat_questions_log") || "[]");

  const defaultLogs = [
    {
      id: "log_1",
      userName: "Alex Mercer",
      userEmail: "alex@domain.com",
      question: "How do I perform a barbell squat properly with video?",
      answer: "Maintain neutral spine, drive through heels, keep chest up. Check YouTube video tutorial link.",
      timestamp: "2026-08-08T09:15:00.000Z"
    },
    {
      id: "log_2",
      userName: "Sarah Jenkins",
      userEmail: "sarah.j@example.com",
      question: "What is the best post-workout protein intake?",
      answer: "Aim for 1.6g - 2.2g of protein per kg of bodyweight daily with fast-absorbing protein after training.",
      timestamp: "2026-08-08T10:00:00.000Z"
    }
  ];

  const logsToExport = existingLogs.length > 0 ? existingLogs : defaultLogs;

  const header = '"Log ID","User Name","User Email","Question Asked","AI Assistant Answer","Timestamp"';
  const rows = logsToExport.map((l) => {
    const cleanQ = (l.question || "").replace(/"/g, '""');
    const cleanA = (l.answer || "").replace(/"/g, '""');
    return `"${l.id}","${l.userName}","${l.userEmail}","${cleanQ}","${cleanA}","${l.timestamp}"`;
  });

  const csvContent = [header, ...rows].join("\n");
  downloadCSVFile(csvContent, "chat_questions_log.csv");
}

function downloadCSVFile(content, fileName) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
