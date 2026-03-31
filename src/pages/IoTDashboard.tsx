import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { sensorData, generateTimeSeriesData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Droplets, Thermometer, Wind, Sun, Battery, Wifi, WifiOff } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.07 } });

const IoTDashboard = () => {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<"24h" | "7d">("24h");
  const data = generateTimeSeriesData(period === "24h" ? 24 : 168);

  const sensors = [
    { key: "soilMoisture", value: sensorData.soilMoisture, unit: "%", icon: Droplets, color: "#3b82f6", bg: "bg-farm-sky" },
    { key: "temperature", value: sensorData.temperature, unit: "°C", icon: Thermometer, color: "#f97316", bg: "bg-farm-cream" },
    { key: "humidity", value: sensorData.humidity, unit: "%", icon: Wind, color: "#22c55e", bg: "bg-secondary" },
    { key: "sunlight", value: sensorData.sunlight, unit: " lux", icon: Sun, color: "#eab308", bg: "bg-farm-cream" },
  ];

  const devices = Object.entries(sensorData.deviceStatus).map(([id, status], i) => ({
    id, status, battery: Object.values(sensorData.batteryLevels)[i],
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold">{t("iotSensors")}</motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sensors.map((s, i) => (
          <motion.div key={s.key} {...card(i + 1)} className="glass-card rounded-xl p-4">
            <div className={`inline-flex p-2 rounded-lg ${s.bg} mb-2`}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <p className="text-xs text-muted-foreground font-medium">{t(s.key)}</p>
            <p className="text-2xl font-bold mt-1">{s.value}{s.unit}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...card(5)} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-3">{t("deviceStatus")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {devices.map((d) => (
            <div key={d.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
              {d.status === "online" ? <Wifi size={16} className="text-farm-green" /> : <WifiOff size={16} className="text-farm-red" />}
              <div className="flex-1">
                <p className="text-sm font-medium capitalize">{d.id.replace("sensor", "Sensor ")}</p>
                <p className={`text-xs ${d.status === "online" ? "text-farm-green" : "text-farm-red"}`}>{t(d.status)}</p>
              </div>
              <div className="flex items-center gap-1">
                <Battery size={14} className={d.battery < 50 ? "text-farm-orange" : "text-farm-green"} />
                <span className="text-xs font-medium">{d.battery}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...card(6)} className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">{t("sensorHistory")}</h3>
          <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
            <button onClick={() => setPeriod("24h")} className={`px-3 py-1 rounded-md text-xs font-medium transition ${period === "24h" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{t("last24h")}</button>
            <button onClick={() => setPeriod("7d")} className={`px-3 py-1 rounded-md text-xs font-medium transition ${period === "7d" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{t("last7d")}</button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.filter((_, i) => period === "24h" || i % 6 === 0)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Line type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={2} dot={false} name={t("moisture")} />
              <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} name={t("temperature")} />
              <Line type="monotone" dataKey="humidity" stroke="#22c55e" strokeWidth={2} dot={false} name={t("humidity")} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default IoTDashboard;
