import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { zones } from "@/data/mockData";
import { Play, Square, Droplets, Sun, Wind } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

const WaterDrops = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 30 }).map((_, i) => (
      <div key={i} className="absolute animate-sprinkle"
        style={{
          left: `${10 + Math.random() * 80}%`,
          top: `${Math.random() * 40}%`,
          animationDelay: `${Math.random() * 1}s`,
          animationDuration: `${0.6 + Math.random() * 0.6}s`,
        }}>
        <Droplets size={8 + Math.random() * 6} className="text-farm-blue/70" />
      </div>
    ))}
  </div>
);

const FarmSimulation = () => {
  const { t } = useLanguage();
  const [selectedZone, setSelectedZone] = useState("A");
  const [irrigating, setIrrigating] = useState<Record<string, boolean>>({ A: false, B: false });
  const [sunPosition, setSunPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSunPosition((p) => (p + 0.3) % 360), 50);
    return () => clearInterval(interval);
  }, []);

  const toggleIrrigation = () => {
    setIrrigating((prev) => ({ ...prev, [selectedZone]: !prev[selectedZone] }));
  };

  const zone = zones.find((z) => z.id === selectedZone)!;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold">{t("simulation")}</motion.h2>

      {/* Farm View */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-2xl overflow-hidden" style={{ height: "480px" }}>
        <img src={farmHero} alt="Farm" className="w-full h-full object-cover" />

        {/* Sun */}
        <div className="absolute top-4 animate-sun">
          <div className="w-12 h-12 rounded-full bg-farm-yellow/80 blur-sm" />
          <Sun size={32} className="absolute inset-0 m-auto text-farm-yellow" />
        </div>

        {/* Wind overlay */}
        <div className="absolute top-8 right-8 flex items-center gap-1 text-primary-foreground/60">
          <Wind size={16} className="animate-sway" />
          <span className="text-xs">12 km/h</span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

        {/* Zones */}
        <div className="absolute inset-0 flex">
          {zones.map((z) => {
            const isSelected = selectedZone === z.id;
            const isIrrigating = irrigating[z.id];
            return (
              <div key={z.id} onClick={() => setSelectedZone(z.id)}
                className={`relative flex-1 cursor-pointer border-r border-primary-foreground/10 transition-all duration-300 ${isSelected ? "ring-2 ring-inset ring-farm-lime" : ""}`}>
                {/* Zone label */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-4xl">{z.emoji}</span>
                  <p className="text-primary-foreground font-bold text-lg mt-1 drop-shadow-lg">Zone {z.id}</p>
                  <p className="text-primary-foreground/80 text-sm drop-shadow">{t(z.crop)}</p>
                </div>

                {/* Crop sway */}
                <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center gap-1 overflow-hidden">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="animate-sway text-2xl origin-bottom" style={{ animationDelay: `${i * 0.15}s` }}>
                      {z.emoji}
                    </div>
                  ))}
                </div>

                {/* Water spray */}
                <AnimatePresence>
                  {isIrrigating && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <WaterDrops />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status badge */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${isIrrigating ? "bg-farm-blue text-primary-foreground" : "bg-card/80 text-foreground"}`}>
                  {isIrrigating ? "💧 Irrigating" : "Idle"}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Irrigation Controls</h3>
          <div className="flex gap-3 mb-4">
            {zones.map((z) => (
              <button key={z.id} onClick={() => setSelectedZone(z.id)}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition ${selectedZone === z.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {z.emoji} Zone {z.id}
              </button>
            ))}
          </div>
          <button onClick={toggleIrrigation}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${irrigating[selectedZone] ? "bg-farm-red text-primary-foreground" : "bg-farm-blue text-primary-foreground"}`}>
            {irrigating[selectedZone] ? <><Square size={16} /> {t("stopIrrigation")}</> : <><Play size={16} /> {t("startIrrigation")}</>}
          </button>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-secondary/50 rounded-lg p-3">
              <span className="text-muted-foreground">Pump:</span>
              <span className={`ml-2 font-semibold ${irrigating[selectedZone] ? "text-farm-green" : "text-muted-foreground"}`}>{irrigating[selectedZone] ? "ON" : "OFF"}</span>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <span className="text-muted-foreground">{t("irrigationStatus")}:</span>
              <span className={`ml-2 font-semibold ${irrigating[selectedZone] ? "text-farm-blue" : "text-muted-foreground"}`}>{irrigating[selectedZone] ? "Active" : "Idle"}</span>
            </div>
          </div>
        </motion.div>

        {/* Zone Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Zone {selectedZone} Details</h3>
          <div className="space-y-3">
            {[
              { label: t("cropName"), value: `${zone.emoji} ${t(zone.crop)}` },
              { label: t("area"), value: zone.area },
              { label: t("moisture"), value: `${zone.moisture}%`, bar: true, pct: zone.moisture, color: "bg-farm-blue" },
              { label: t("health"), value: `${zone.health}%`, bar: true, pct: zone.health, color: zone.health > 75 ? "bg-farm-green" : "bg-farm-yellow" },
              { label: t("irrigationStatus"), value: irrigating[selectedZone] ? "Active 💧" : "Idle" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
                {item.bar && (
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full ${item.color}`}
                      initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 0.8 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmSimulation;
