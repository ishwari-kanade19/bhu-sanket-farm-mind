import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import IoTDashboard from "@/pages/IoTDashboard";
import IoTControl from "@/pages/IoTControl";
import FarmSimulation from "@/pages/FarmSimulation";
import AIEngine from "@/pages/AIEngine";
import DigitalTwin from "@/pages/DigitalTwin";
import CropManagement from "@/pages/CropManagement";
import DiseaseDetection from "@/pages/DiseaseDetection";
import WeatherPage from "@/pages/WeatherPage";
import MarketPage from "@/pages/MarketPage";
import FinancePage from "@/pages/FinancePage";
import SoilHealth from "@/pages/SoilHealth";
import AlertsPage from "@/pages/AlertsPage";
import GovCompensation from "@/pages/GovCompensation";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/iot" element={<IoTDashboard />} />
              <Route path="/control" element={<IoTControl />} />
              <Route path="/simulation" element={<FarmSimulation />} />
              <Route path="/ai" element={<AIEngine />} />
              <Route path="/digital-twin" element={<DigitalTwin />} />
              <Route path="/crops" element={<CropManagement />} />
              <Route path="/disease" element={<DiseaseDetection />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/soil" element={<SoilHealth />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/compensation" element={<GovCompensation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
