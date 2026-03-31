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
  market: { en: "Market & Finance", hi: "बाजार और वित्त", mr: "बाजार आणि वित्त" },
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
