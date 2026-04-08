import { useState, useEffect } from 'react';
import ModuleMenu from './components/ModuleMenu';
import BoardFeet from './components/BoardFeet';
import PlywoodPlanner from './components/PlywoodPlanner';
import FinishEstimator from './components/FinishEstimator';
import FractionMath from './components/FractionMath';
import MetricConverter from './components/MetricConverter';
import WoodDatabase from './components/WoodDatabase';
import JoinerySpacing from './components/JoinerySpacing';
import CutListGenerator from './components/CutListGenerator';
import WoodMovementCalc from './components/WoodMovementCalc';
import FastenerCalculator from './components/FastenerCalculator';
import { getModuleById } from './utils/moduleConfig';

const COMPONENT_MAP = {
  'board-feet': BoardFeet,
  'plywood-planner': PlywoodPlanner,
  'finish-estimator': FinishEstimator,
  'fraction-math': FractionMath,
  'metric-converter': MetricConverter,
  'wood-database': WoodDatabase,
  'joinery-spacer': JoinerySpacing,
  'cut-list-generator': CutListGenerator,
  'wood-movement-calc': WoodMovementCalc,
  'fastener-calculator': FastenerCalculator,
};

export default function App() {
  const [viewMode, setViewMode] = useState('menu'); // 'menu' or 'module'
  const [activeModule, setActiveModule] = useState(null);

  const handleSelectModule = (moduleId) => {
    setActiveModule(moduleId);
    setViewMode('module');
    // Push state to browser history
    window.history.pushState({ viewMode: 'module', moduleId }, '');
  };

  const handleBackToMenu = () => {
    setViewMode('menu');
    setActiveModule(null);
  };

  // Listen for browser back button
  useEffect(() => {
    const handlePopState = () => {
      handleBackToMenu();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (viewMode === 'menu') {
    return <ModuleMenu onSelectModule={handleSelectModule} />;
  }

  const Component = COMPONENT_MAP[activeModule];
  const moduleConfig = getModuleById(activeModule);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      {/* Header with back button */}
      <header className="bg-gray-800 bg-opacity-50 backdrop-blur border-b border-gray-700 sticky top-0 z-10">
        <div className="h-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={handleBackToMenu}
              className="flex-shrink-0 p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Back to menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="min-w-0">
              <div className="text-responsive-lg font-bold text-white truncate">
                {moduleConfig?.icon} {moduleConfig?.title}
              </div>
              <p className="text-responsive-sm text-gray-300 truncate">
                {moduleConfig?.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Module Content - Full screen */}
      <main className="flex-1 w-full overflow-auto">
        <div className="w-full h-full">
          {Component && <Component />}
        </div>
      </main>
    </div>
  );
}
