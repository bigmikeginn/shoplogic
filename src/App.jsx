import { useState } from 'react';
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

const MODULES = [
  { id: 'board-feet', label: 'Board Feet', component: BoardFeet },
  { id: 'plywood-planner', label: 'Plywood Planner', component: PlywoodPlanner },
  { id: 'finish-estimator', label: 'Finish Estimator', component: FinishEstimator },
  { id: 'fraction-math', label: 'Fraction Math', component: FractionMath },
  { id: 'metric-converter', label: 'Converter', component: MetricConverter },
  { id: 'wood-database', label: 'Wood Database', component: WoodDatabase },
  { id: 'joinery-spacing', label: 'Joinery Spacer', component: JoinerySpacing },
  { id: 'cut-list', label: 'Cut List', component: CutListGenerator },
  { id: 'wood-movement', label: 'Movement', component: WoodMovementCalc },
  { id: 'fastener-calc', label: 'Fasteners', component: FastenerCalculator },
];

export default function App() {
  const [activeModule, setActiveModule] = useState('board-feet');
  const module = MODULES.find(m => m.id === activeModule);
  const Component = module?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">ShopLogic Utility</h1>
          <p className="text-gray-600">Woodworking Tools & Calculators</p>

          <nav className="flex gap-2 mt-4">
            {MODULES.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  activeModule === m.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8">
        {Component && <Component />}
      </main>
    </div>
  );
}
