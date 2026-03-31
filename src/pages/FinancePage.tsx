import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { financeData, marketData } from "@/data/mockData";
import { IndianRupee, Calculator, TrendingUp, ArrowDown, ArrowUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const COLORS = ["#22c55e", "#eab308", "#f97316", "#3b82f6", "#8b5cf6", "#ec4899", "#64748b"];

const FinancePage = () => {
  const { t } = useLanguage();
  const [area, setArea] = useState("2.5");
  const [crop, setCrop] = useState("Rice");
  const selected = marketData.find((m) => m.crop === crop) || marketData[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><IndianRupee size={24} className="text-primary" /> {t("finance")}</motion.h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div {...card(1)} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDown size={18} className="text-farm-red" />
            <p className="text-sm text-muted-foreground">{t("totalCost")}</p>
          </div>
          <p className="text-3xl font-bold text-farm-red">₹{financeData.totalCost.toLocaleString()}</p>
        </motion.div>

        <motion.div {...card(2)} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUp size={18} className="text-farm-blue" />
            <p className="text-sm text-muted-foreground">{t("revenue")}</p>
          </div>
          <p className="text-3xl font-bold text-farm-blue">₹{financeData.revenue.toLocaleString()}</p>
        </motion.div>

        <motion.div {...card(3)} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-farm-green" />
            <p className="text-sm text-muted-foreground">{t("profit")}</p>
          </div>
          <p className="text-3xl font-bold text-farm-green">₹{financeData.profit.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div {...card(4)} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">{t("expenseBreakdown")}</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={financeData.expenses} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={85} label={({ name, percent }) => `${name} ${((percent || 0) as number * 100).toFixed(0)}%`} labelLine={false}>
                  {financeData.expenses.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} contentStyle={{ borderRadius: 12, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div {...card(5)} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">{t("expenseBreakdown")}</h3>
          <div className="space-y-2.5">
            {financeData.expenses.map((e, i) => (
              <div key={e.category} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-sm flex-1">{e.category}</span>
                <span className="text-sm font-semibold">₹{e.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Profit Calculator */}
      <motion.div {...card(6)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Calculator size={16} className="text-primary" /> {t("profitCalc")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">{t("cropName")}</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm">
              {marketData.map((m) => <option key={m.crop}>{m.crop}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">{t("area")} (acres)</label>
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xs text-muted-foreground">{t("revenue")}</p>
            <p className="text-2xl font-bold text-farm-green">₹{(selected.price * parseFloat(area || "0") * 8).toLocaleString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinancePage;
