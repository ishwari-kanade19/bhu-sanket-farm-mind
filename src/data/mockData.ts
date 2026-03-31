export const sensorData = {
  soilMoisture: 62,
  temperature: 32,
  humidity: 71,
  sunlight: 840,
  batteryLevels: { sensor1: 87, sensor2: 64, sensor3: 92, sensor4: 45 },
  deviceStatus: { sensor1: "online", sensor2: "online", sensor3: "online", sensor4: "offline" } as Record<string, string>,
};

export const generateTimeSeriesData = (hours: number) => {
  return Array.from({ length: hours }, (_, i) => ({
    time: `${i}:00`,
    moisture: 55 + Math.sin(i / 3) * 15 + Math.random() * 5,
    temperature: 28 + Math.sin(i / 4) * 6 + Math.random() * 2,
    humidity: 65 + Math.cos(i / 5) * 12 + Math.random() * 4,
    sunlight: Math.max(0, 600 + Math.sin((i - 6) / 3.8) * 500),
  }));
};

export const zones = [
  { id: "A", crop: "rice", emoji: "🌾", color: "green" as const, area: "2.5 acres", moisture: 72, health: 88, irrigating: false },
  { id: "B", crop: "wheat", emoji: "🌿", color: "yellow" as const, area: "3.0 acres", moisture: 45, health: 65, irrigating: false },
  { id: "C", crop: "cotton", emoji: "🌼", color: "green" as const, area: "2.0 acres", moisture: 58, health: 78, irrigating: false },
  { id: "D", crop: "sugarcane", emoji: "🎋", color: "green" as const, area: "3.5 acres", moisture: 80, health: 92, irrigating: false },
  { id: "E", crop: "soybean", emoji: "🫘", color: "yellow" as const, area: "1.8 acres", moisture: 38, health: 52, irrigating: false },
  { id: "F", crop: "corn", emoji: "🌽", color: "green" as const, area: "2.2 acres", moisture: 65, health: 85, irrigating: false },
];

export const weatherForecast = [
  { day: "Mon", temp: 32, humidity: 70, condition: "sunny", icon: "☀️" },
  { day: "Tue", temp: 30, humidity: 75, condition: "cloudy", icon: "⛅" },
  { day: "Wed", temp: 28, humidity: 82, condition: "rainy", icon: "🌧️" },
  { day: "Thu", temp: 31, humidity: 68, condition: "sunny", icon: "☀️" },
  { day: "Fri", temp: 33, humidity: 65, condition: "sunny", icon: "☀️" },
  { day: "Sat", temp: 29, humidity: 78, condition: "cloudy", icon: "⛅" },
  { day: "Sun", temp: 27, humidity: 85, condition: "rainy", icon: "🌧️" },
];

export const cropDatabase = [
  { name: "Rice", water: "High", sunlight: "Full", stages: ["Nursery (20d)", "Transplanting (25d)", "Tillering (30d)", "Flowering (20d)", "Harvest (25d)"], calendar: { sowing: "June", fertilizer: "July/Aug", harvest: "October" } },
  { name: "Wheat", water: "Medium", sunlight: "Full", stages: ["Germination (7d)", "Seedling (15d)", "Tillering (25d)", "Flowering (20d)", "Harvest (30d)"], calendar: { sowing: "November", fertilizer: "Dec/Jan", harvest: "March" } },
  { name: "Cotton", water: "Medium", sunlight: "Full", stages: ["Germination (10d)", "Vegetative (40d)", "Flowering (30d)", "Boll (40d)", "Harvest (20d)"], calendar: { sowing: "April", fertilizer: "May/Jun", harvest: "October" } },
  { name: "Sugarcane", water: "High", sunlight: "Full", stages: ["Germination (30d)", "Tillering (60d)", "Grand Growth (120d)", "Maturation (60d)"], calendar: { sowing: "February", fertilizer: "Apr/Jun", harvest: "January" } },
];

export const soilData = {
  type: "Black Cotton Soil (Vertisol)",
  fertility: 74,
  nitrogen: 280,
  phosphorus: 22,
  potassium: 310,
  ph: 7.2,
  organicCarbon: 0.65,
  recommendations: ["Rice", "Wheat", "Cotton", "Soybean"],
};

export const marketData = [
  { crop: "Rice", price: 2200, trend: "up", bestTime: "November" },
  { crop: "Wheat", price: 2400, trend: "stable", bestTime: "April" },
  { crop: "Cotton", price: 6500, trend: "down", bestTime: "December" },
  { crop: "Sugarcane", price: 350, trend: "up", bestTime: "February" },
];

export const alertsData = [
  { id: 1, type: "warning", message: "Low soil moisture in Zone B", time: "10 min ago", color: "farm-yellow" },
  { id: 2, type: "danger", message: "High temperature alert: 38°C", time: "25 min ago", color: "farm-red" },
  { id: 3, type: "info", message: "Pest risk moderate in Zone A", time: "1 hr ago", color: "farm-orange" },
  { id: 4, type: "success", message: "Irrigation completed in Zone A", time: "2 hrs ago", color: "farm-green" },
];

export const diseases = [
  { name: "Bacterial Leaf Blight", confidence: 87, crop: "Rice", solution: "Apply Streptocycline 0.01% + Copper Oxychloride 0.25%. Drain excess water. Use resistant varieties." },
  { name: "Brown Spot", confidence: 72, crop: "Rice", solution: "Spray Mancozeb 75WP @ 2.5g/L or Carbendazim 50WP @ 1g/L. Improve drainage." },
  { name: "Rust", confidence: 91, crop: "Wheat", solution: "Apply Propiconazole 25EC @ 1ml/L. Use resistant varieties like HD-2967." },
];

export const govSchemes = [
  { name: "PM-KISAN", description: "₹6,000/year direct benefit", eligibility: "All farmers" },
  { name: "PMFBY", description: "Crop insurance at 2% premium", eligibility: "All crop farmers" },
  { name: "Soil Health Card", description: "Free soil testing", eligibility: "All farmers" },
  { name: "Kisan Credit Card", description: "Low interest farm loans", eligibility: "Land-owning farmers" },
];

export const farmingTasks = [
  { id: 1, type: "sowing", crop: "Rice", date: "2026-06-15", status: "completed" as const },
  { id: 2, type: "fertilizer", crop: "Rice", date: "2026-07-20", status: "completed" as const },
  { id: 3, type: "irrigation", crop: "Rice", date: "2026-08-05", status: "completed" as const },
  { id: 4, type: "fertilizer", crop: "Rice", date: "2026-08-25", status: "pending" as const },
  { id: 5, type: "harvest", crop: "Rice", date: "2026-10-15", status: "pending" as const },
  { id: 6, type: "sowing", crop: "Wheat", date: "2026-11-10", status: "pending" as const },
  { id: 7, type: "fertilizer", crop: "Wheat", date: "2026-12-15", status: "pending" as const },
  { id: 8, type: "irrigation", crop: "Wheat", date: "2026-12-28", status: "pending" as const },
  { id: 9, type: "harvest", crop: "Wheat", date: "2027-03-20", status: "pending" as const },
  { id: 10, type: "sowing", crop: "Cotton", date: "2026-04-10", status: "completed" as const },
  { id: 11, type: "irrigation", crop: "Cotton", date: "2026-05-20", status: "completed" as const },
  { id: 12, type: "fertilizer", crop: "Cotton", date: "2026-06-01", status: "completed" as const },
];

export const financeData = {
  totalCost: 185000,
  revenue: 342000,
  profit: 157000,
  expenses: [
    { category: "Seeds", amount: 25000 },
    { category: "Fertilizer", amount: 42000 },
    { category: "Pesticides", amount: 18000 },
    { category: "Labour", amount: 55000 },
    { category: "Irrigation", amount: 22000 },
    { category: "Equipment", amount: 15000 },
    { category: "Transport", amount: 8000 },
  ],
};
