import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { marketData } from "@/data/mockData";
import { TrendingUp, TrendingDown, Minus, Calculator } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const priceHistory = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  Rice: 1800 + Math.sin(i / 2) * 300 + Math.random() * 100,
  Wheat: 2000 + Math.cos(i / 3) * 250 + Math.random() * 80,
}));

const MarketPage = () => {
  const { t } = useLanguage();
  const [area, setArea] = useState("2.5");
  const [crop, setCrop] = useState("Rice");
  const selected = marketData.find((m) => m.crop === crop) || marketData[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><TrendingUp size={24} className="text-primary" /> {t("market")}</motion.h2>

      {/* Crop Prices */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketData.map((m, i) => (
          <motion.div key={m.crop} {...card(i + 1)} className="glass-card rounded-xl p-4 cursor-pointer hover:shadow-md transition" onClick={() => setCrop(m.crop)}>
            <p className="text-sm text-muted-foreground">{m.crop}</p>
            <p className="text-2xl font-bold mt-1">₹{m.price}</p>
            <div className="flex items-center gap-1 mt-1">
              {m.trend === "up" ? <TrendingUp size={14} className="text-farm-green" /> : m.trend === "down" ? <TrendingDown size={14} className="text-farm-red" /> : <Minus size={14} className="text-muted-foreground" />}
              <span className={`text-xs font-medium ${m.trend === "up" ? "text-farm-green" : m.trend === "down" ? "text-farm-red" : "text-muted-foreground"}`}>{m.trend}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Best: {m.bestTime}</p>
          </motion.div>
        ))}
      </div>

      {/* Price Chart */}
      <motion.div {...card(5)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4">Price Trends (₹/quintal)</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Line type="monotone" dataKey="Rice" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Wheat" stroke="#eab308" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Profit Calculator */}
      <motion.div {...card(6)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Calculator size={16} className="text-primary" /> {t("profitCalc")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">Crop</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm">
              {marketData.map((m) => <option key={m.crop}>{m.crop}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">{t("area")} (acres)</label>
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xs text-muted-foreground">Estimated Revenue</p>
            <p className="text-2xl font-bold text-farm-green">₹{(selected.price * parseFloat(area || "0") * 8).toLocaleString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketPage;
