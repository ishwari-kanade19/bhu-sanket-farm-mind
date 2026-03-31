import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { diseases } from "@/data/mockData";
import { Bug, Upload, Search, CheckCircle, Image } from "lucide-react";

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const DiseaseDetection = () => {
  const { t } = useLanguage();
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof diseases[0] | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target?.result as string);
        runAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = () => {
    setUploaded(true);
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(diseases[Math.floor(Math.random() * diseases.length)]);
    }, 2000);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.h2 {...card(0)} className="text-xl font-bold flex items-center gap-2"><Bug size={24} className="text-primary" /> {t("diseaseDetection")}</motion.h2>

      <motion.div {...card(1)} className="glass-card rounded-2xl p-8">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div onClick={handleUpload}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all">
          {preview ? (
            <div className="flex flex-col items-center">
              <img src={preview} alt="Uploaded" className="w-48 h-48 object-cover rounded-xl mb-3" />
              <p className="text-sm text-muted-foreground">{t("uploadImage")} — click to change</p>
            </div>
          ) : (
            <>
              <Upload size={40} className="mx-auto text-muted-foreground mb-3" />
              <p className="font-semibold">{t("uploadImage")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("dragDrop")}</p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1"><Image size={12} /> JPG, PNG, WEBP</p>
            </>
          )}
        </div>
      </motion.div>

      {analyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6 text-center">
          <Search size={32} className="mx-auto text-primary animate-pulse mb-2" />
          <p className="font-semibold">{t("analyzing")}</p>
        </motion.div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-farm-red/10"><Bug size={24} className="text-farm-red" /></div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{result.name}</h3>
              <p className="text-sm text-muted-foreground">{t("cropName")}: {result.crop}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-farm-orange rounded-full" initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }} />
                </div>
                <span className="text-sm font-semibold">{t("confidence")}: {result.confidence}%</span>
              </div>
              <div className="mt-4 bg-farm-green/5 border border-farm-green/20 rounded-lg p-4">
                <p className="flex items-center gap-2 font-semibold text-sm text-farm-green mb-1"><CheckCircle size={16} />{t("solution")}</p>
                <p className="text-sm">{result.solution}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DiseaseDetection;
