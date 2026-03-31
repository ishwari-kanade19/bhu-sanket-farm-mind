import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { marketData } from "@/data/mockData";
import { TrendingUp, TrendingDown, Minus, ShoppingCart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const priceHistory = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  Rice: 1800 + Math.sin(i / 2) * 300 + Math.random() * 100,
  Wheat: 2000 + Math.cos(i / 3) * 250 + Math.random() * 80,
}));

const MarketPage = () => {
  const { t } = useLanguage();
  const [crop, setCrop] = useState("Rice");

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
            <p className="text-xs text-muted-foreground mt-2">{t("bestSellTime")}: {m.bestTime}</p>
          </motion.div>
        ))}
      </div>

      {/* Price Chart */}
      <motion.div {...card(5)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4">{t("priceTrends")} (₹/quintal)</h3>
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

      {/* Selling Suggestion */}
      <motion.div {...card(6)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><ShoppingCart size={16} className="text-primary" /> {t("sellingSuggestion")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketData.filter(m => m.trend === "up").map((m) => (
            <div key={m.crop} className="border-l-4 border-farm-green bg-farm-green/5 rounded-r-lg p-4">
              <p className="font-bold">{m.crop}</p>
              <p className="text-sm text-muted-foreground">📈 {t("priceTrends")}: {m.trend}</p>
              <p className="text-sm font-semibold text-farm-green mt-1">✅ Sell in {m.bestTime} for best price</p>
            </div>
          ))}
          {marketData.filter(m => m.trend === "down").map((m) => (
            <div key={m.crop} className="border-l-4 border-farm-red bg-farm-red/5 rounded-r-lg p-4">
              <p className="font-bold">{m.crop}</p>
              <p className="text-sm text-muted-foreground">📉 {t("priceTrends")}: {m.trend}</p>
              <p className="text-sm font-semibold text-farm-red mt-1">⏳ Hold — prices may recover</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketPage;
