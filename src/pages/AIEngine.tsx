import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Droplets, Bug, Leaf, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const aiPredictions = {
  npk: { nitrogen: 280, phosphorus: 22, potassium: 310 },
  pestRisk: 35,
  waterReq: 42,
  recommendations: [
    {
      type: "irrigation",
      decision: true,
      text: "Irrigate Zone B within 6 hours",
      reason: "Soil moisture at 45% (below 55% threshold) + no rain forecast for next 3 days",
      confidence: 92,
    },
    {
      type: "fertilizer",
      decision: true,
      text: "Apply Urea 50kg/acre in Zone A next week",
      reason: "Nitrogen levels declining by 8% weekly; tillering stage requires peak N supply",
      confidence: 87,
    },
    {
      type: "pest",
      decision: false,
      text: "No immediate pest treatment needed in Zone A",
      reason: "Temperature + humidity pattern shows low BPH risk (35%). Continue monitoring.",
      confidence: 78,
    },
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

      {/* Recommendations with Decision, Reason, Confidence */}
      <motion.div {...card(4)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Lightbulb size={16} className="text-farm-yellow" /> {t("aiRecommendations")}</h3>
        <div className="space-y-4">
          {aiPredictions.recommendations.map((r, i) => (
            <motion.div key={i} {...card(5 + i)} className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${r.type === "irrigation" ? "bg-farm-sky text-farm-blue" : r.type === "fertilizer" ? "bg-secondary text-farm-green" : "bg-farm-cream text-farm-orange"}`}>
                  {r.type === "irrigation" ? <Droplets size={16} /> : r.type === "fertilizer" ? <Leaf size={16} /> : <Bug size={16} />}
                </div>
                <div className="flex-1">
                  {/* Decision badge */}
                  <div className="flex items-center gap-2 mb-1.5">
                    {r.decision ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-farm-green/15 text-farm-green text-xs font-semibold">
                        <CheckCircle size={12} /> {t("decision")}: {r.type === "irrigation" ? t("irrigationNeeded") : "Action Required"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                        <XCircle size={12} /> {t("decision")}: Not Required
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {t("confidence")}: {r.confidence}%
                    </span>
                  </div>
                  <p className="font-semibold text-sm">{r.text}</p>
                  <div className="mt-2 text-xs text-muted-foreground bg-card rounded-md p-2 border border-border/50">
                    <span className="font-semibold text-foreground">💡 {t("reason")}: </span>{r.reason}
                  </div>
                  {/* Confidence bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${r.confidence > 85 ? "bg-farm-green" : r.confidence > 70 ? "bg-farm-yellow" : "bg-farm-orange"}`}
                        initial={{ width: 0 }} animate={{ width: `${r.confidence}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
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
