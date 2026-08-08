const DEMO_USER_IDS = new Set(["usr_101", "usr_102", "usr_103", "usr_104"]);
const DEMO_LOG_IDS = new Set(["log_201", "log_202", "log_203"]);
const PURGE_FLAG = "workoutapp_demo_seed_purged_v1";

export function purgeDemoSeedDataFromStorage() {
  if (localStorage.getItem(PURGE_FLAG) === "1") return;

  const users = JSON.parse(localStorage.getItem("workoutapp_users") || "[]");
  const filteredUsers = users.filter((u) => !DEMO_USER_IDS.has(u.id));
  if (filteredUsers.length !== users.length) {
    localStorage.setItem("workoutapp_users", JSON.stringify(filteredUsers));
  }

  const chatLogs = JSON.parse(localStorage.getItem("workoutapp_chat_questions_log") || "[]");
  const filteredLogs = chatLogs.filter((l) => !DEMO_LOG_IDS.has(l.id));
  if (filteredLogs.length !== chatLogs.length) {
    localStorage.setItem("workoutapp_chat_questions_log", JSON.stringify(filteredLogs));
  }

  localStorage.setItem(PURGE_FLAG, "1");
}
