import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { govSchemes, sensorData } from "@/data/mockData";
import { Shield, AlertTriangle, CheckCircle, Search, FileText } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const damageScenarios = [
  { type: "Heavy Rain Damage", reason: "Continuous rainfall >120mm detected; soil moisture 95%+ for 48hrs", amount: 12500 },
  { type: "Drought Damage", reason: "Soil moisture below 20% for 7+ days; no rainfall detected", amount: 18000 },
  { type: "Flood Damage", reason: "Excessive water logging detected via IoT sensors; crop submergence >24hrs", amount: 25000 },
  { type: "Pest Infestation", reason: "High pest activity detected via AI analysis; >60% crop affected", amount: 15000 },
];

const GovCompensation = () => {
  const { t } = useLanguage();
  const [checking, setChecking] = useState(false);
  const [damageResult, setDamageResult] = useState<typeof damageScenarios[0] | null>(null);
  const [noDamage, setNoDamage] = useState(false);

  const checkDamage = () => {
    setChecking(true);
    setDamageResult(null);
    setNoDamage(false);
    setTimeout(() => {
      setChecking(false);
      // Simulate: 70% chance of detecting damage
      if (Math.random() > 0.3) {
        const scenario = damageScenarios[Math.floor(Math.random() * damageScenarios.length)];
        const amount = scenario.amount + Math.floor(Math.random() * 5000);
        setDamageResult({ ...scenario, amount });
      } else {
        setNoDamage(true);
      }
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Shield size={24} className="text-primary" /> {t("govCompensation")}</motion.h2>

      {/* Sensor-based Damage Check */}
      <motion.div {...card(1)} className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Search size={16} className="text-primary" /> {t("checkDamage")}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Uses IoT sensor data (rainfall, soil moisture, temperature) to detect crop damage automatically.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">{t("soilMoisture")}</p>
            <p className="font-bold text-lg">{sensorData.soilMoisture}%</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">{t("temperature")}</p>
            <p className="font-bold text-lg">{sensorData.temperature}°C</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">{t("humidity")}</p>
            <p className="font-bold text-lg">{sensorData.humidity}%</p>
          </div>
        </div>
        <button onClick={checkDamage} disabled={checking}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition disabled:opacity-50">
          {checking ? "🔍 Analyzing sensor data..." : t("checkDamage")}
        </button>
      </motion.div>

      {/* Result: Damage Detected */}
      {damageResult && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-farm-red/10">
              <AlertTriangle size={24} className="text-farm-red" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-farm-red">{t("cropDamageDetected")}</h3>
              <p className="text-sm font-semibold mt-1">{damageResult.type}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("damageReason")}: {damageResult.reason}</p>

              <div className="mt-4 bg-farm-green/5 border border-farm-green/20 rounded-lg p-4">
                <p className="flex items-center gap-2 font-semibold text-sm text-farm-green mb-1">
                  <CheckCircle size={16} /> {t("eligibleCompensation")}
                </p>
                <p className="text-2xl font-bold text-farm-green mt-2">
                  ✅ {t("compensationApproved")}: ₹{damageResult.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Result: No Damage */}
      {noDamage && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 text-center">
          <CheckCircle size={32} className="mx-auto text-farm-green mb-2" />
          <p className="font-semibold text-farm-green">{t("noDamage")}</p>
          <p className="text-sm text-muted-foreground mt-1">All sensor readings are within normal range.</p>
        </motion.div>
      )}

      {/* Government Schemes */}
      <motion.div {...card(2)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><FileText size={16} className="text-primary" /> {t("govSchemes")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {govSchemes.map((s) => (
            <div key={s.name} className="bg-secondary/50 rounded-lg p-4">
              <p className="font-bold text-sm">{s.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
              <p className="text-xs text-primary font-medium mt-2">👤 {s.eligibility}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GovCompensation;
