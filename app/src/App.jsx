import { useState, useEffect } from 'react';
import ModuleMenu from './components/ModuleMenu';
import ToolLayout from './components/ToolLayout';
import BoardFeet from './components/BoardFeet';
import PlywoodPlanner from './components/PlywoodPlanner';
import FinishEstimator from './components/FinishEstimator';
import MetricConverter from './components/MetricConverter';
import WoodDatabase from './components/WoodDatabase';
import JoinerySpacing from './components/JoinerySpacing';
import CutListGenerator from './components/CutListGenerator';
import WoodMovementCalc from './components/WoodMovementCalc';
import FastenerCalculator from './components/FastenerCalculator';
import GoldenRatio from './components/GoldenRatio';
import StairCalculator from './components/StairCalculator';
import CompoundMiter from './components/CompoundMiter';
import ShelfSag from './components/ShelfSag';
import BoardFootPricing from './components/BoardFootPricing';
import ArcRadius from './components/ArcRadius';
import MetalWeight from './components/MetalWeight';
import TapDrill from './components/TapDrill';
import TorqueConverter from './components/TorqueConverter';
import GearRatio from './components/GearRatio';
import BoltCircle from './components/BoltCircle';
import TriangleSolver from './components/TriangleSolver';
import { getModuleById } from './utils/moduleConfig';

const COMPONENT_MAP = {
  'board-feet': BoardFeet,
  'plywood-planner': PlywoodPlanner,
  'finish-estimator': FinishEstimator,
  'metric-converter': MetricConverter,
  'wood-database': WoodDatabase,
  'joinery-spacer': JoinerySpacing,
  'cut-list-generator': CutListGenerator,
  'wood-movement-calc': WoodMovementCalc,
  'fastener-calculator': FastenerCalculator,
  'golden-ratio': GoldenRatio,
  'stair-calculator': StairCalculator,
  'compound-miter': CompoundMiter,
  'shelf-sag': ShelfSag,
  'board-foot-pricing': BoardFootPricing,
  'arc-radius': ArcRadius,
  'metal-weight': MetalWeight,
  'tap-drill': TapDrill,
  'torque-converter': TorqueConverter,
  'gear-ratio': GearRatio,
  'bolt-circle': BoltCircle,
  'triangle-solver': TriangleSolver,
};

export default function App() {
  const [viewMode, setViewMode] = useState('menu');
  const [activeModule, setActiveModule] = useState(null);

  const handleSelectModule = (moduleId) => {
    setActiveModule(moduleId);
    setViewMode('module');
    window.history.pushState({ viewMode: 'module', moduleId }, '');
  };

  const handleBackToMenu = () => {
    setViewMode('menu');
    setActiveModule(null);
  };

  useEffect(() => {
    const handlePopState = () => handleBackToMenu();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (viewMode === 'menu') {
    return <ModuleMenu onSelectModule={handleSelectModule} />;
  }

  const Component = COMPONENT_MAP[activeModule];
  const moduleConfig = getModuleById(activeModule);

  return (
    <ToolLayout
      title={moduleConfig?.title ?? ''}
      description={moduleConfig?.description ?? ''}
      onBack={handleBackToMenu}
    >
      {Component && <Component />}
    </ToolLayout>
  );
}