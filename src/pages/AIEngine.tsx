import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Droplets, Bug, Leaf, Lightbulb } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const aiPredictions = {
  npk: { nitrogen: 280, phosphorus: 22, potassium: 310 },
  pestRisk: 35,
  waterReq: 42,
  recommendations: [
    { type: "irrigation", text: "Irrigate Zone B within 6 hours – moisture below threshold", reason: "Soil moisture at 45%, crop stress risk increases above 50% depletion." },
    { type: "fertilizer", text: "Apply Urea 50kg/acre in Zone A next week", reason: "Nitrogen levels declining by 8% weekly; tillering stage requires peak N supply." },
    { type: "pest", text: "Monitor Zone A for Brown Plant Hopper", reason: "Temperature + humidity pattern matches BPH outbreak conditions from historical data." },
  ],
};

const npkData = [
  { name: "N", value: 280, fill: "#22c55e" },
  { name: "P", value: 22, fill: "#f97316" },
  { name: "K", value: 310, fill: "#3b82f6" },
];

const AIEngine = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Brain size={24} className="text-primary" /> {t("aiEngine")}</motion.h2>

      {/* Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div {...card(1)} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3"><Leaf size={18} className="text-farm-green" /><h3 className="font-semibold text-sm">{t("npk")}</h3></div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={npkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div {...card(2)} className="glass-card rounded-xl p-5 flex flex-col items-center justify-center">
          <Bug size={24} className="text-farm-orange mb-2" />
          <p className="text-sm text-muted-foreground">{t("pestRisk")}</p>
          <p className="text-4xl font-bold text-farm-orange mt-2">{aiPredictions.pestRisk}%</p>
          <span className="text-xs bg-farm-cream text-farm-orange px-2 py-0.5 rounded-full mt-2 font-medium">Low-Medium</span>
        </motion.div>

        <motion.div {...card(3)} className="glass-card rounded-xl p-5 flex flex-col items-center justify-center">
          <Droplets size={24} className="text-farm-blue mb-2" />
          <p className="text-sm text-muted-foreground">{t("waterReq")}</p>
          <p className="text-4xl font-bold text-farm-blue mt-2">{aiPredictions.waterReq}L</p>
          <span className="text-xs bg-farm-sky text-farm-blue px-2 py-0.5 rounded-full mt-2 font-medium">Per sq. meter/day</span>
        </motion.div>
      </div>

      {/* Recommendations with Explainable AI */}
      <motion.div {...card(4)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Lightbulb size={16} className="text-farm-yellow" /> AI Recommendations (Explainable)</h3>
        <div className="space-y-4">
          {aiPredictions.recommendations.map((r, i) => (
            <motion.div key={i} {...card(5 + i)} className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${r.type === "irrigation" ? "bg-farm-sky text-farm-blue" : r.type === "fertilizer" ? "bg-secondary text-farm-green" : "bg-farm-cream text-farm-orange"}`}>
                  {r.type === "irrigation" ? <Droplets size={16} /> : r.type === "fertilizer" ? <Leaf size={16} /> : <Bug size={16} />}
                </div>
                <div>
                  <p className="font-semibold text-sm">{r.text}</p>
                  <div className="mt-2 text-xs text-muted-foreground bg-card rounded-md p-2 border border-border/50">
                    <span className="font-semibold text-foreground">💡 Why: </span>{r.reason}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AIEngine;
