import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { zones } from "@/data/mockData";
import { Map } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const zoneColors = [
  { bg: "hsl(142 60% 42% / 0.25)", border: "hsl(142 60% 42%)", text: "hsl(142 60% 30%)" },
  { bg: "hsl(45 93% 52% / 0.25)", border: "hsl(45 93% 52%)", text: "hsl(45 70% 30%)" },
  { bg: "hsl(142 60% 42% / 0.2)", border: "hsl(142 60% 42%)", text: "hsl(142 60% 30%)" },
  { bg: "hsl(210 70% 52% / 0.2)", border: "hsl(210 70% 52%)", text: "hsl(210 70% 30%)" },
  { bg: "hsl(0 75% 55% / 0.2)", border: "hsl(0 75% 55%)", text: "hsl(0 75% 35%)" },
  { bg: "hsl(85 55% 50% / 0.25)", border: "hsl(85 55% 50%)", text: "hsl(85 55% 30%)" },
];

const DigitalTwin = () => {
  const { t } = useLanguage();
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Map size={24} className="text-primary" /> {t("digitalTwin")}</motion.h2>

      <motion.div {...card(1)} className="glass-card rounded-2xl p-6">
        <div className="relative bg-gradient-to-br from-farm-green/10 via-secondary to-farm-cream rounded-xl overflow-hidden" style={{ height: 450 }}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke="hsl(var(--primary))" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Zones - 2 rows of 3 */}
          <div className="absolute inset-4 grid grid-cols-3 grid-rows-2 gap-3">
            {zones.map((z, idx) => {
              const statusClass = z.health > 75 ? "zone-healthy" : z.health > 50 ? "zone-moderate" : "zone-critical";
              const colors = zoneColors[idx];
              return (
                <motion.div key={z.id}
                  onHoverStart={() => setHoveredZone(z.id)} onHoverEnd={() => setHoveredZone(null)}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-xl ${statusClass} flex flex-col items-center justify-center cursor-pointer transition-all relative`}>
                  <span className="text-4xl mb-1">{z.emoji}</span>
                  <p className="font-bold text-base">Zone {z.id}</p>
                  <p className="text-sm text-muted-foreground">{t(z.crop)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{z.area}</p>

                  {/* Health indicator */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${z.health > 75 ? "bg-farm-green" : z.health > 50 ? "bg-farm-yellow" : "bg-farm-red"}`} />
                    <span className="text-[10px] font-semibold">{z.health}%</span>
                  </div>

                  {hoveredZone === z.id && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full bg-card border border-border rounded-lg p-3 shadow-lg z-10 w-48 text-sm">
                      <p className="font-semibold mb-1">Zone {z.id} {t("zoneDetails")}</p>
                      <p>{t("moisture")}: {z.moisture}%</p>
                      <p>{t("health")}: {z.health}%</p>
                      <p>{t("area")}: {z.area}</p>
                      <p>Status: {z.health > 75 ? "🟢 " + t("healthy") : z.health > 50 ? "🟡 " + t("moderate") : "🔴 " + t("critical")}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-card/90 rounded-lg p-3 text-xs space-y-1.5">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-farm-green" />{t("healthy")} (&gt;75%)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-farm-yellow" />{t("moderate")} (50-75%)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-farm-red" />{t("critical")} (&lt;50%)</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DigitalTwin;
