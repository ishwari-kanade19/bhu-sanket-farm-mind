import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { alertsData, sensorData, weatherForecast } from "@/data/mockData";
import { Droplets, Thermometer, Wind, Sun, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08, duration: 0.4 } });

const Dashboard = () => {
  const { t } = useLanguage();
  const healthScore = 82;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero */}
      <motion.div {...card(0)} className="relative rounded-2xl overflow-hidden h-52 md:h-64">
        <img src={farmHero} alt="Farm" className="w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 gradient-hero flex items-end p-6 md:p-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-primary-foreground">🌱 {t("appName")}</h1>
            <p className="text-primary-foreground/80 text-sm md:text-base mt-1">{t("tagline")}</p>
          </div>
        </div>
      </motion.div>

      {/* Score + Weather + Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div {...card(1)} className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
          <Shield className="text-farm-green mb-2" size={28} />
          <p className="text-sm text-muted-foreground font-medium">{t("farmHealth")}</p>
          <div className="relative w-24 h-24 mt-3">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <motion.circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--farm-green))" strokeWidth="8"
                strokeLinecap="round" strokeDasharray={264} initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * healthScore) / 100 }} transition={{ duration: 1.2, delay: 0.3 }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">{healthScore}</span>
          </div>
          <span className="text-xs text-farm-green font-semibold mt-2">{t("healthy")}</span>
        </motion.div>

        <motion.div {...card(2)} className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">{t("weatherSummary")}</h3>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{weatherForecast[0].icon}</span>
            <div>
              <p className="text-3xl font-bold">{weatherForecast[0].temp}°C</p>
              <p className="text-sm text-muted-foreground capitalize">{weatherForecast[0].condition}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {weatherForecast.slice(1, 4).map((d) => (
              <div key={d.day} className="text-center bg-secondary/50 rounded-lg py-2">
                <p className="text-xs text-muted-foreground">{d.day}</p>
                <p className="text-lg">{d.icon}</p>
                <p className="text-xs font-semibold">{d.temp}°</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...card(3)} className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">{t("activeAlerts")}</h3>
          <div className="space-y-2.5">
            {alertsData.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-2.5 text-sm">
                {a.type === "danger" ? <AlertTriangle size={16} className="text-farm-red mt-0.5 shrink-0" /> :
                 a.type === "warning" ? <AlertTriangle size={16} className="text-farm-yellow mt-0.5 shrink-0" /> :
                 <CheckCircle size={16} className="text-farm-green mt-0.5 shrink-0" />}
                <div>
                  <p className="font-medium leading-tight">{a.message}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sensor Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: "soilMoisture", value: `${sensorData.soilMoisture}%`, icon: Droplets, color: "text-farm-blue" },
          { key: "temperature", value: `${sensorData.temperature}°C`, icon: Thermometer, color: "text-farm-orange" },
          { key: "humidity", value: `${sensorData.humidity}%`, icon: Wind, color: "text-farm-green" },
          { key: "sunlight", value: `${sensorData.sunlight} lux`, icon: Sun, color: "text-farm-yellow" },
        ].map((s, i) => (
          <motion.div key={s.key} {...card(4 + i)} className="glass-card rounded-xl p-4 flex items-center gap-3 sensor-glow">
            <div className={`p-2.5 rounded-lg bg-secondary ${s.color}`}><s.icon size={20} /></div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{t(s.key)}</p>
              <p className="text-lg font-bold">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
