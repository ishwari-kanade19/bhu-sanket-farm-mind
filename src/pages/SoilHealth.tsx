import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { soilData } from "@/data/mockData";
import { Layers, Beaker, Leaf } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const SoilHealth = () => {
  const { t } = useLanguage();

  const npk = [
    { label: "Nitrogen (N)", value: soilData.nitrogen, unit: "kg/ha", max: 500, color: "bg-farm-green" },
    { label: "Phosphorus (P)", value: soilData.phosphorus, unit: "kg/ha", max: 50, color: "bg-farm-orange" },
    { label: "Potassium (K)", value: soilData.potassium, unit: "kg/ha", max: 500, color: "bg-farm-blue" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Layers size={24} className="text-primary" /> {t("soilHealth")}</motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div {...card(1)} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">{t("soilProfile")}</h3>
          <div className="space-y-3">
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">{t("soilType")}</p>
              <p className="font-semibold">{soilData.type}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">{t("phLevel")}</p>
              <p className="font-semibold">{soilData.ph}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">{t("organicCarbon")}</p>
              <p className="font-semibold">{soilData.organicCarbon}%</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{t("fertilityScore")}</span>
                <span className="font-bold">{soilData.fertility}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-farm-green" initial={{ width: 0 }} animate={{ width: `${soilData.fertility}%` }} transition={{ duration: 1 }} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...card(2)} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Beaker size={16} className="text-primary" /> {t("npk")}</h3>
          <div className="space-y-4">
            {npk.map((n) => (
              <div key={n.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{n.label}</span>
                  <span className="font-semibold">{n.value} {n.unit}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${n.color}`} initial={{ width: 0 }} animate={{ width: `${(n.value / n.max) * 100}%` }} transition={{ duration: 0.8 }} />
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-sm mt-6 mb-3 flex items-center gap-2"><Leaf size={16} className="text-farm-green" /> {t("recommendedCrops")}</h3>
          <div className="flex flex-wrap gap-2">
            {soilData.recommendations.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SoilHealth;
