import React, { createContext, useContext, useState, useCallback } from "react";

export type Language = "en" | "hi" | "mr";

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  appName: { en: "BhuSanket", hi: "भूसंकेत", mr: "भूसंकेत" },
  tagline: { en: "Autonomous Farm Intelligence System", hi: "स्वायत्त कृषि बुद्धिमत्ता प्रणाली", mr: "स्वायत्त शेती बुद्धिमत्ता प्रणाली" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड", mr: "डॅशबोर्ड" },
  iotSensors: { en: "IoT Sensors", hi: "IoT सेंसर", mr: "IoT सेन्सर" },
  iotControl: { en: "IoT Control", hi: "IoT नियंत्रण", mr: "IoT नियंत्रण" },
  simulation: { en: "Farm Simulation", hi: "खेत सिमुलेशन", mr: "शेत सिम्युलेशन" },
  aiEngine: { en: "AI Engine", hi: "AI इंजन", mr: "AI इंजिन" },
  digitalTwin: { en: "Digital Twin", hi: "डिजिटल ट्विन", mr: "डिजिटल ट्विन" },
  cropManagement: { en: "Crop Management", hi: "फसल प्रबंधन", mr: "पीक व्यवस्थापन" },
  diseaseDetection: { en: "Disease Detection", hi: "रोग पहचान", mr: "रोग ओळख" },
  weather: { en: "Weather & Risk", hi: "मौसम और जोखिम", mr: "हवामान आणि धोका" },
  market: { en: "Market", hi: "बाजार", mr: "बाजार" },
  finance: { en: "Finance", hi: "वित्त", mr: "वित्त" },
  soilHealth: { en: "Soil Health", hi: "मिट्टी स्वास्थ्य", mr: "माती आरोग्य" },
  alerts: { en: "Alerts", hi: "अलर्ट", mr: "सूचना" },
  farmHealth: { en: "Farm Health Score", hi: "खेत स्वास्थ्य स्कोर", mr: "शेत आरोग्य स्कोअर" },
  soilMoisture: { en: "Soil Moisture", hi: "मिट्टी की नमी", mr: "मातीतील ओलावा" },
  temperature: { en: "Temperature", hi: "तापमान", mr: "तापमान" },
  humidity: { en: "Humidity", hi: "आर्द्रता", mr: "आर्द्रता" },
  sunlight: { en: "Sunlight", hi: "धूप", mr: "सूर्यप्रकाश" },
  pumpOn: { en: "Pump ON", hi: "पंप चालू", mr: "पंप चालू" },
  pumpOff: { en: "Pump OFF", hi: "पंप बंद", mr: "पंप बंद" },
  irrigationAuto: { en: "Auto Irrigation", hi: "ऑटो सिंचाई", mr: "ऑटो सिंचन" },
  irrigationManual: { en: "Manual Irrigation", hi: "मैनुअल सिंचाई", mr: "मॅन्युअल सिंचन" },
  sprayerOn: { en: "Sprayer ON", hi: "स्प्रेयर चालू", mr: "फवारणी चालू" },
  sprayerOff: { en: "Sprayer OFF", hi: "स्प्रेयर बंद", mr: "फवारणी बंद" },
  startIrrigation: { en: "Start Irrigation", hi: "सिंचाई शुरू करें", mr: "सिंचन सुरू करा" },
  stopIrrigation: { en: "Stop Irrigation", hi: "सिंचाई बंद करें", mr: "सिंचन बंद करा" },
  selectZone: { en: "Select Zone", hi: "ज़ोन चुनें", mr: "झोन निवडा" },
  healthy: { en: "Healthy", hi: "स्वस्थ", mr: "निरोगी" },
  moderate: { en: "Moderate", hi: "सामान्य", mr: "मध्यम" },
  critical: { en: "Critical", hi: "गंभीर", mr: "गंभीर" },
  online: { en: "Online", hi: "ऑनलाइन", mr: "ऑनलाइन" },
  offline: { en: "Offline", hi: "ऑफलाइन", mr: "ऑफलाइन" },
  weatherSummary: { en: "Weather Summary", hi: "मौसम सारांश", mr: "हवामान सारांश" },
  activeAlerts: { en: "Active Alerts", hi: "सक्रिय अलर्ट", mr: "सक्रिय सूचना" },
  cropName: { en: "Crop", hi: "फसल", mr: "पीक" },
  area: { en: "Area", hi: "क्षेत्र", mr: "क्षेत्र" },
  moisture: { en: "Moisture", hi: "नमी", mr: "ओलावा" },
  health: { en: "Health", hi: "स्वास्थ्य", mr: "आरोग्य" },
  irrigationStatus: { en: "Irrigation Status", hi: "सिंचाई स्थिति", mr: "सिंचन स्थिती" },
  rice: { en: "Rice", hi: "चावल", mr: "तांदूळ" },
  wheat: { en: "Wheat", hi: "गेहूं", mr: "गहू" },
  cotton: { en: "Cotton", hi: "कपास", mr: "कापूस" },
  sugarcane: { en: "Sugarcane", hi: "गन्ना", mr: "ऊस" },
  soybean: { en: "Soybean", hi: "सोयाबीन", mr: "सोयाबीन" },
  corn: { en: "Corn", hi: "मक्का", mr: "मका" },
  uploadImage: { en: "Upload Plant Image", hi: "पौधे की फोटो अपलोड करें", mr: "वनस्पतीचा फोटो अपलोड करा" },
  predict: { en: "Predict", hi: "पूर्वानुमान", mr: "अंदाज" },
  yieldPrediction: { en: "Yield Prediction", hi: "उपज पूर्वानुमान", mr: "उत्पादन अंदाज" },
  govSchemes: { en: "Govt. Schemes", hi: "सरकारी योजनाएं", mr: "सरकारी योजना" },
  profitCalc: { en: "Profit Calculator", hi: "लाभ कैलकुलेटर", mr: "नफा कॅल्क्युलेटर" },
  last24h: { en: "Last 24 Hours", hi: "पिछले 24 घंटे", mr: "मागील 24 तास" },
  last7d: { en: "Last 7 Days", hi: "पिछले 7 दिन", mr: "मागील 7 दिवस" },
  npk: { en: "NPK Levels", hi: "NPK स्तर", mr: "NPK पातळी" },
  pestRisk: { en: "Pest Risk", hi: "कीट जोखिम", mr: "कीटक धोका" },
  waterReq: { en: "Water Requirement", hi: "पानी की आवश्यकता", mr: "पाण्याची गरज" },
  voiceAssistant: { en: "Voice Assistant", hi: "वॉइस असिस्टेंट", mr: "व्हॉइस असिस्टंट" },
  // AI Engine
  aiRecommendations: { en: "AI Recommendations", hi: "AI सिफारिशें", mr: "AI शिफारसी" },
  decision: { en: "Decision", hi: "निर्णय", mr: "निर्णय" },
  reason: { en: "Reason", hi: "कारण", mr: "कारण" },
  confidence: { en: "Confidence", hi: "विश्वास", mr: "आत्मविश्वास" },
  irrigationNeeded: { en: "Irrigation Needed", hi: "सिंचाई आवश्यक", mr: "सिंचन आवश्यक" },
  irrigationNotNeeded: { en: "Irrigation Not Needed", hi: "सिंचाई आवश्यक नहीं", mr: "सिंचन आवश्यक नाही" },
  // Crop Management
  farmingCalendar: { en: "Farming Calendar", hi: "कृषि कैलेंडर", mr: "शेती कॅलेंडर" },
  sowing: { en: "Sowing", hi: "बुवाई", mr: "पेरणी" },
  fertilizer: { en: "Fertilizer", hi: "उर्वरक", mr: "खत" },
  irrigation: { en: "Irrigation", hi: "सिंचाई", mr: "सिंचन" },
  harvest: { en: "Harvest", hi: "कटाई", mr: "कापणी" },
  completed: { en: "Completed", hi: "पूर्ण", mr: "पूर्ण" },
  pending: { en: "Pending", hi: "लंबित", mr: "प्रलंबित" },
  requirements: { en: "Requirements", hi: "आवश्यकताएं", mr: "आवश्यकता" },
  growthStages: { en: "Growth Stages", hi: "वृद्धि चरण", mr: "वाढीचे टप्पे" },
  // Disease Detection
  analyzing: { en: "Analyzing image with AI...", hi: "AI से छवि का विश्लेषण...", mr: "AI ने प्रतिमेचे विश्लेषण..." },
  diseaseName: { en: "Disease Name", hi: "रोग का नाम", mr: "रोगाचे नाव" },
  solution: { en: "Solution", hi: "समाधान", mr: "उपाय" },
  dragDrop: { en: "Click to upload or drag and drop", hi: "अपलोड करने के लिए क्लिक करें या खींचें", mr: "अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग करा" },
  // Market
  cropPrices: { en: "Crop Prices", hi: "फसल मूल्य", mr: "पीक किंमती" },
  priceTrends: { en: "Price Trends", hi: "मूल्य प्रवृत्ति", mr: "किंमत कल" },
  bestSellTime: { en: "Best Selling Time", hi: "बेचने का सर्वोत्तम समय", mr: "विक्रीसाठी सर्वोत्तम वेळ" },
  sellingSuggestion: { en: "Selling Suggestion", hi: "विक्री सुझाव", mr: "विक्री सूचना" },
  // Finance
  totalCost: { en: "Total Cost", hi: "कुल लागत", mr: "एकूण खर्च" },
  revenue: { en: "Revenue", hi: "राजस्व", mr: "महसूल" },
  profit: { en: "Profit", hi: "लाभ", mr: "नफा" },
  expenseBreakdown: { en: "Expense Breakdown", hi: "व्यय विवरण", mr: "खर्च तपशील" },
  // Weather
  forecast7day: { en: "7-Day Forecast", hi: "7-दिन का पूर्वानुमान", mr: "7-दिवसांचा अंदाज" },
  riskAssessment: { en: "Risk Assessment", hi: "जोखिम मूल्यांकन", mr: "जोखीम मूल्यांकन" },
  droughtRisk: { en: "Drought Risk", hi: "सूखे का जोखिम", mr: "दुष्काळ धोका" },
  pestAlert: { en: "Pest Alert", hi: "कीट चेतावनी", mr: "कीटक सावधानता" },
  heatStress: { en: "Heat Stress", hi: "ताप तनाव", mr: "उष्णता ताण" },
  // Soil Health
  soilProfile: { en: "Soil Profile", hi: "मिट्टी प्रोफ़ाइल", mr: "माती प्रोफाइल" },
  soilType: { en: "Soil Type", hi: "मिट्टी का प्रकार", mr: "मातीचा प्रकार" },
  phLevel: { en: "pH Level", hi: "pH स्तर", mr: "pH पातळी" },
  organicCarbon: { en: "Organic Carbon", hi: "जैविक कार्बन", mr: "सेंद्रिय कार्बन" },
  fertilityScore: { en: "Fertility Score", hi: "उर्वरता स्कोर", mr: "सुपीकता स्कोअर" },
  recommendedCrops: { en: "Recommended Crops", hi: "अनुशंसित फसलें", mr: "शिफारस केलेली पिके" },
  // IoT
  deviceStatus: { en: "Device Status", hi: "डिवाइस स्थिति", mr: "डिव्हाइस स्थिती" },
  sensorHistory: { en: "Sensor History", hi: "सेंसर इतिहास", mr: "सेन्सर इतिहास" },
  // IoT Control
  waterPump: { en: "Water pump motor control", hi: "पानी पंप मोटर नियंत्रण", mr: "पाणी पंप मोटर नियंत्रण" },
  irrigationMode: { en: "Irrigation mode selector", hi: "सिंचाई मोड चयनकर्ता", mr: "सिंचन मोड निवडक" },
  sprayerControl: { en: "Pesticide sprayer control", hi: "कीटनाशक स्प्रेयर नियंत्रण", mr: "कीटकनाशक फवारणी नियंत्रण" },
  liveStatus: { en: "Live Status", hi: "लाइव स्थिति", mr: "लाइव्ह स्थिती" },
  turnOn: { en: "Turn ON", hi: "चालू करें", mr: "चालू करा" },
  turnOff: { en: "Turn OFF", hi: "बंद करें", mr: "बंद करा" },
  // Alerts
  readAloud: { en: "Read aloud", hi: "पढ़कर सुनाएं", mr: "वाचून दाखवा" },
  lowMoistureZoneB: { en: "Low soil moisture in Zone B", hi: "ज़ोन B में कम मिट्टी नमी", mr: "झोन B मध्ये कमी माती ओलावा" },
  highTempAlert: { en: "High temperature alert: 38°C", hi: "उच्च तापमान चेतावनी: 38°C", mr: "उच्च तापमान सावधानता: 38°C" },
  pestRiskZoneA: { en: "Pest risk moderate in Zone A", hi: "ज़ोन A में कीट जोखिम मध्यम", mr: "झोन A मध्ये कीटक धोका मध्यम" },
  irrigationComplete: { en: "Irrigation completed in Zone A", hi: "ज़ोन A में सिंचाई पूर्ण", mr: "झोन A मध्ये सिंचन पूर्ण" },
  // Simulation
  irrigationControls: { en: "Irrigation Controls", hi: "सिंचाई नियंत्रण", mr: "सिंचन नियंत्रण" },
  pump: { en: "Pump", hi: "पंप", mr: "पंप" },
  active: { en: "Active", hi: "सक्रिय", mr: "सक्रिय" },
  idle: { en: "Idle", hi: "निष्क्रिय", mr: "निष्क्रिय" },
  irrigating: { en: "Irrigating", hi: "सिंचाई हो रही है", mr: "सिंचन सुरू आहे" },
  zoneDetails: { en: "Zone Details", hi: "ज़ोन विवरण", mr: "झोन तपशील" },
  // Government Compensation
  govCompensation: { en: "Govt. Compensation", hi: "सरकारी मुआवज़ा", mr: "सरकारी भरपाई" },
  cropDamageDetected: { en: "Crop Damage Detected", hi: "फसल हानि का पता चला", mr: "पीक नुकसान आढळले" },
  eligibleCompensation: { en: "Eligible for Compensation", hi: "मुआवज़े के लिए पात्र", mr: "भरपाईसाठी पात्र" },
  compensationApproved: { en: "Compensation Approved", hi: "मुआवज़ा स्वीकृत", mr: "भरपाई मंजूर" },
  noDamage: { en: "No crop damage detected", hi: "कोई फसल हानि नहीं", mr: "पीक नुकसान आढळले नाही" },
  checkDamage: { en: "Check for Crop Damage", hi: "फसल हानि जांचें", mr: "पीक नुकसान तपासा" },
  damageReason: { en: "Reason", hi: "कारण", mr: "कारण" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const t = useCallback((key: string) => translations[key]?.[language] || key, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
