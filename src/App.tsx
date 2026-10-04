import { useState, useEffect } from 'react';
import { ApiHealthResponse, PredictionResponse } from './types/prediction';
import { predictionApi } from './services/predictionApi';

// Layout components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Page sections
import { Hero } from './sections/Hero';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { FeaturedProject } from './sections/FeaturedProject';
import { PredictionCenter } from './sections/PredictionCenter';
import { WhatIfSimulator } from './sections/WhatIfSimulator';
import { SolarScenarioLab } from './sections/SolarScenarioLab';
import { PredictionHistory } from './sections/PredictionHistory';
import { AnalyticsSection } from './sections/AnalyticsSection';
import { ModelExplainer } from './sections/ModelExplainer';
import { ModelPerformance } from './sections/ModelPerformance';
import { DatasetExplorer } from './sections/DatasetExplorer';
import { ArchitectureSection } from './sections/ArchitectureSection';
import { ProgressTimeline } from './sections/ProgressTimeline';
import { ModelHealthCard } from './sections/ModelHealthCard';
import { ProjectsSection } from './sections/ProjectsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { ContactSection } from './sections/ContactSection';
import { PredictionReportModal } from './sections/PredictionReportModal';

export function App() {
  const [health, setHealth] = useState<ApiHealthResponse>({
    status: 'offline',
    model_loaded: false,
    timestamp: new Date().toISOString()
  });

  const [lastPrediction, setLastPrediction] = useState<PredictionResponse | null>(null);
  const [reportModalPrediction, setReportModalPrediction] = useState<PredictionResponse | null>(null);

  // Perform real API health check ping
  const checkHealth = async () => {
    const status = await predictionApi.checkHealth();
    setHealth(status);
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 10000); // refresh status every 10s
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-solar-dark text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Sticky Navbar with real API health indicator */}
      <Navbar health={health} onNavigate={scrollToSection} />

      {/* Main Page Content */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <Hero
          health={health}
          onExploreClick={() => scrollToSection('solarpulse-ai')}
          onPredictClick={() => scrollToSection('prediction')}
        />

        {/* 2. About Me Section */}
        <AboutSection />

        {/* 3. Skills Section */}
        <SkillsSection />

        {/* 4. Featured Project — SolarPulse AI */}
        <FeaturedProject />

        {/* 5, 6, 7, 8. Live Solar Prediction Center */}
        <PredictionCenter
          health={health}
          onPredictionSuccess={(res) => setLastPrediction(res)}
          onOpenReportModal={(res) => setReportModalPrediction(res)}
        />

        {/* 9. What-If Scenario Simulator */}
        <WhatIfSimulator health={health} />

        {/* 17. Solar Scenario Lab */}
        <SolarScenarioLab />

        {/* 10. Prediction History */}
        <PredictionHistory lastPrediction={lastPrediction} />

        {/* 11. Analytics Dashboard */}
        <AnalyticsSection />

        {/* 12. Model Explainer (How the AI Works) */}
        <ModelExplainer />

        {/* 13. Model Performance Metrics */}
        <ModelPerformance />

        {/* 14. Dataset Explorer */}
        <DatasetExplorer />

        {/* 15. Project Architecture */}
        <ArchitectureSection />

        {/* 16. Project Progress Timeline */}
        <ProgressTimeline />

        {/* 19. Model Infrastructure Health Monitor */}
        <ModelHealthCard
          health={health}
          lastPredictionTime={lastPrediction?.timestamp || null}
        />

        {/* 20. Portfolio Projects */}
        <ProjectsSection />

        {/* 21. Key Achievements */}
        <AchievementsSection />

        {/* 22. Contact Section */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Report Modal */}
      {reportModalPrediction && (
        <PredictionReportModal
          prediction={reportModalPrediction}
          onClose={() => setReportModalPrediction(null)}
        />
      )}

    </div>
  );
}

export default App;
