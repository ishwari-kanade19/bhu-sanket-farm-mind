import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { weatherForecast } from "@/data/mockData";
import { Cloud, Thermometer, Droplets, AlertTriangle, Bug } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const risks = [
  { label: "Drought Risk", level: "Low", pct: 20, color: "bg-farm-green", icon: Droplets },
  { label: "Pest Alert", level: "Moderate", pct: 55, color: "bg-farm-orange", icon: Bug },
  { label: "Heat Stress", level: "Low", pct: 30, color: "bg-farm-yellow", icon: Thermometer },
];

const WeatherPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Cloud size={24} className="text-primary" /> {t("weather")}</motion.h2>

      {/* 7-day forecast */}
      <motion.div {...card(1)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-7 gap-2">
          {weatherForecast.map((d, i) => (
            <motion.div key={d.day} {...card(i + 2)} className={`text-center rounded-xl p-3 transition ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"}`}>
              <p className="text-xs font-medium">{d.day}</p>
              <p className="text-3xl my-2">{d.icon}</p>
              <p className="text-lg font-bold">{d.temp}°</p>
              <p className="text-xs opacity-75">{d.humidity}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Risk Assessment */}
      <motion.div {...card(3)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><AlertTriangle size={16} className="text-farm-orange" /> Risk Assessment</h3>
        <div className="space-y-4">
          {risks.map((r) => (
            <div key={r.label} className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-secondary"><r.icon size={18} className="text-muted-foreground" /></div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{r.label}</span>
                  <span className="font-semibold">{r.level} ({r.pct}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${r.color}`} initial={{ width: 0 }} animate={{ width: `${r.pct}%` }} transition={{ duration: 0.8 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherPage;
