import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { alertsData } from "@/data/mockData";
import { Bell, AlertTriangle, CheckCircle, Info, Volume2 } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const iconMap: Record<string, typeof AlertTriangle> = { danger: AlertTriangle, warning: AlertTriangle, info: Info, success: CheckCircle };
const colorMap: Record<string, string> = { danger: "text-farm-red bg-farm-red/10", warning: "text-farm-yellow bg-farm-yellow/10", info: "text-farm-blue bg-farm-blue/10", success: "text-farm-green bg-farm-green/10" };
const alertKeys: Record<number, string> = { 1: "lowMoistureZoneB", 2: "highTempAlert", 3: "pestRiskZoneA", 4: "irrigationComplete" };

const AlertsPage = () => {
  const { t } = useLanguage();

  const speak = (msg: string) => {
    const u = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Bell size={24} className="text-primary" /> {t("alerts")}</motion.h2>

      <div className="space-y-3">
        {alertsData.map((a, i) => {
          const Icon = iconMap[a.type] || Info;
          const cls = colorMap[a.type] || colorMap.info;
          const msg = alertKeys[a.id] ? t(alertKeys[a.id]) : a.message;
          return (
            <motion.div key={a.id} {...card(i + 1)} className="glass-card rounded-xl p-4 flex items-start gap-4">
              <div className={`p-2 rounded-lg shrink-0 ${cls}`}><Icon size={20} /></div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{msg}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
              </div>
              <button onClick={() => speak(msg)} className="p-2 rounded-lg hover:bg-secondary transition" title={t("readAloud")}>
                <Volume2 size={16} className="text-muted-foreground" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPage;
