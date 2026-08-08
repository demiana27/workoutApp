// Daily Pro Coach Knowledge Base & Educational Tips
export const dailyTipsDb = [
  {
    id: "tip_nutrition_fueling",
    category: "Nutrition & Fueling",
    title: "Pre-Workout Intra-Carb Fueling",
    content: "Athletic explosiveness relies heavily on muscle glycogen. Consume 25-40g of fast-acting carbs (like a banana, dried fruit, or rice cake) 30-45 minutes before training for explosive force output.",
    icon: "🍎"
  },
  {
    id: "tip_fat_loss_coach",
    category: "Professional Fat Loss",
    title: "Coach Advice for Cutting Fat While Retaining Athletic Muscle",
    content: "To drop fat without losing sprint power, keep protein high (1.8-2.2g per kg bodyweight). Maintain high lifting intensity (RPE 8-9) with lower volume, and place cardio AFTER strength training, never before.",
    icon: "🔥"
  },
  {
    id: "tip_sleep_recovery",
    category: "Sleep & Circadian Science",
    title: "Deep Sleep & Human Growth Hormone Peak",
    content: "90% of your muscle repair and nervous system recovery occurs during slow-wave Deep Sleep. Keep your bedroom cool (65-68°F / 18-20°C) and eliminate screen light 45 minutes before bed.",
    icon: "🌙"
  },
  {
    id: "tip_hydration_electrolytes",
    category: "Hydration & Performance",
    title: "Electrolyte Balance for Fast Footwork",
    content: "Even a 2% drop in body water causes a 10% drop in speed and jump height. Drink 500ml of water with a pinch of unrefined salt or sodium/potassium electrolyte powder 1 hour before practice.",
    icon: "💧"
  },
  {
    id: "tip_speed_power",
    category: "Speed & Explosiveness",
    title: "Ground Contact Time & Stiffness",
    content: "Speed isn't just about pushing hard—it's about spending as little time on the ground as possible. Think of your ankles like stiff steel springs during pogo hops and ladder footwork drills.",
    icon: "⚡"
  },
  {
    id: "tip_female_follicular",
    category: "Female Health & Cycle Advice",
    title: "Follicular Phase: Peak Power Window",
    content: "Estrogen rises in the follicular phase (days 1-14 after period starts), increasing pain tolerance, glycogen storage, and recovery rates. This is your best window to push heavy PRs and maximum sprint volume!",
    icon: "🌸"
  },
  {
    id: "tip_female_luteal",
    category: "Female Health & Cycle Advice",
    title: "Luteal Phase: Joint Stability & Hydration Protocol",
    content: "Progesterone increases in the luteal phase, raising core body temperature and relaxing connective ligaments. Focus on controlled eccentric movements, joint stability, and increase fluid + sodium intake.",
    icon: "🌺"
  },
  {
    id: "tip_hyperactivity",
    category: "Energy Management",
    title: "Channeling High Energy into Explosive Output",
    content: "If you have high energy/hyperactivity, focus that drive into fast intent on every single rep! Move the load with maximum velocity during the concentric phase, then take controlled rests to allow full ATP recharge.",
    icon: "⚡"
  }
];

export function getRandomOrCategoryTip(categoryFilter = null) {
  if (categoryFilter) {
    const filtered = dailyTipsDb.filter((t) => t.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
  }
  return dailyTipsDb[Math.floor(Math.random() * dailyTipsDb.length)];
}
