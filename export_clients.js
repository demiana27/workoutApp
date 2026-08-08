// Node.js script to export all client and user registration data to Excel / CSV format
import fs from 'fs';
import path from 'path';

// Output CSV path
const csvPath = path.join(process.cwd(), 'clients_data.csv');

// Sample dataset / local database export template
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
  },
  {
    id: "usr_104",
    name: "David Miller",
    email: "david.m@example.com",
    phone: "+1 (555) 321-9876",
    isVerified: true,
    role: "athlete",
    program: "General Fitness",
    completedWorkouts: 5,
    created_at: "2026-07-28 16:20:00"
  }
];

function generateCSV(data) {
  const header = '"User ID","Full Name","Email Address","Phone Number","Verification Status","Account Role","Active Program Goal","Workouts Completed","Registration Date"';
  
  const rows = data.map(c => {
    const status = c.isVerified ? "Verified" : "Pending OTP Verification";
    return `"${c.id}","${c.name}","${c.email}","${c.phone}","${status}","${c.role}","${c.program}","${c.completedWorkouts}","${c.created_at}"`;
  });

  return [header, ...rows].join('\n');
}

fs.writeFileSync(csvPath, generateCSV(defaultClients), 'utf8');
console.log(`✅ Success! Client spreadsheet updated at: ${csvPath}`);
