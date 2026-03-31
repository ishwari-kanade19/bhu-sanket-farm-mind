import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Power, SprayCan, Settings } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const IoTControl = () => {
  const { t } = useLanguage();
  const [pump, setPump] = useState(false);
  const [autoIrrigation, setAutoIrrigation] = useState(true);
  const [sprayer, setSprayer] = useState(false);

  const controls = [
    { label: pump ? t("pumpOn") : t("pumpOff"), active: pump, toggle: () => setPump(!pump), icon: Power, desc: t("waterPump"), color: "farm-blue" },
    { label: autoIrrigation ? t("irrigationAuto") : t("irrigationManual"), active: autoIrrigation, toggle: () => setAutoIrrigation(!autoIrrigation), icon: Settings, desc: t("irrigationMode"), color: "farm-green" },
    { label: sprayer ? t("sprayerOn") : t("sprayerOff"), active: sprayer, toggle: () => setSprayer(!sprayer), icon: SprayCan, desc: t("sprayerControl"), color: "farm-orange" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold">{t("iotControl")}</motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {controls.map((c, i) => (
          <motion.div key={i} {...card(i + 1)} className="glass-card rounded-2xl p-6 text-center">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${c.active ? `bg-${c.color} text-primary-foreground animate-pulse-green` : "bg-muted text-muted-foreground"}`}>
              <c.icon size={28} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{c.desc}</p>
            <p className="font-bold text-lg mb-4">{c.label}</p>
            <button onClick={c.toggle}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${c.active ? "bg-farm-red text-primary-foreground hover:bg-farm-red/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              {c.active ? t("turnOff") : t("turnOn")}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div {...card(4)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4">{t("liveStatus")}</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: t("pump"), active: pump },
            { label: t("irrigationAuto"), active: autoIrrigation },
            { label: t("sprayerOn").replace(" ON", "").replace(" चालू", "").replace(" चालू", ""), active: sprayer },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${s.active ? "bg-farm-green animate-pulse-green" : "bg-muted-foreground/30"}`} />
              <span className="text-sm">{s.label}: <span className={`font-semibold ${s.active ? "text-farm-green" : "text-muted-foreground"}`}>{s.active ? "ON" : "OFF"}</span></span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default IoTControl;
