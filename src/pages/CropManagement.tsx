import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cropDatabase } from "@/data/mockData";
import { Sprout, Droplets, Sun, Calendar } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const CropManagement = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const crop = cropDatabase[selected];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Sprout size={24} className="text-primary" /> {t("cropManagement")}</motion.h2>

      <motion.div {...card(1)} className="flex gap-2 flex-wrap">
        {cropDatabase.map((c, i) => (
          <button key={c.name} onClick={() => setSelected(i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${selected === i ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
            {c.name}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div {...card(2)} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Requirements</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
              <Droplets size={18} className="text-farm-blue" />
              <div><p className="text-xs text-muted-foreground">{t("waterReq")}</p><p className="font-semibold">{crop.water}</p></div>
            </div>
            <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
              <Sun size={18} className="text-farm-yellow" />
              <div><p className="text-xs text-muted-foreground">{t("sunlight")}</p><p className="font-semibold">{crop.sunlight}</p></div>
            </div>
          </div>

          <h3 className="font-semibold text-sm mt-5 mb-3">Growth Stages</h3>
          <div className="space-y-2">
            {crop.stages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <span className="text-sm">{stage}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...card(3)} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Calendar size={16} className="text-primary" /> AI Farming Calendar</h3>
          <div className="space-y-4">
            {[
              { label: "🌱 Sowing", value: crop.calendar.sowing, color: "bg-farm-green/10 border-farm-green" },
              { label: "🧪 Fertilizer", value: crop.calendar.fertilizer, color: "bg-farm-yellow/10 border-farm-yellow" },
              { label: "🌾 Harvest", value: crop.calendar.harvest, color: "bg-farm-orange/10 border-farm-orange" },
            ].map((item) => (
              <div key={item.label} className={`border-l-4 ${item.color} rounded-r-lg p-4`}>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-bold text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CropManagement;
