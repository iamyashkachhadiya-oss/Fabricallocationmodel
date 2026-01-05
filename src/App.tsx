import React, { useState } from 'react';
import { Fabric, Machine, Worker, Recommendation } from './types';
import { PremiumFabricForm } from './components/PremiumFabricForm';
import { MachineManagement } from './components/MachineManagement';
import { WorkerManagement } from './components/WorkerManagement';
import { EnhancedRecommendationOutput } from './components/EnhancedRecommendationOutput';
import { WeavingKnowledgeEngine } from './logic/weavingKnowledgeEngine';
import { sampleMachines, sampleWorkers } from './data/sampleData';
import { PremiumHeader } from './components/PremiumHeader';
import { PremiumNavigation } from './components/PremiumNavigation';
import { PremiumFooter } from './components/PremiumFooter';
import './styles/globals.css';

function App() {
  const [machines, setMachines] = useState<Machine[]>(sampleMachines);
  const [workers, setWorkers] = useState<Worker[]>(sampleWorkers);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [activeTab, setActiveTab] = useState<'fabric' | 'machines' | 'workers'>('fabric');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const recommendationEngine = new WeavingKnowledgeEngine();

  const handleFabricSubmit = async (fabric: Fabric) => {
    setIsAnalyzing(true);
    // Simulate analysis time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    const rec = recommendationEngine.getRecommendation(fabric, machines, workers);
    setRecommendation(rec);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Premium Header */}
      <PremiumHeader />

      {/* Premium Navigation */}
      <PremiumNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input/Management */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'fabric' && (
              <PremiumFabricForm onFabricSubmit={handleFabricSubmit} isAnalyzing={isAnalyzing} />
            )}
            {activeTab === 'machines' && (
              <MachineManagement machines={machines} onMachinesUpdate={setMachines} />
            )}
            {activeTab === 'workers' && (
              <WorkerManagement workers={workers} onWorkersUpdate={setWorkers} />
            )}
          </div>

          {/* Right Column - Recommendation */}
          <div className="lg:col-span-1">
            <EnhancedRecommendationOutput recommendation={recommendation} />
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <PremiumFooter />
    </div>
  );
}

export default App;
