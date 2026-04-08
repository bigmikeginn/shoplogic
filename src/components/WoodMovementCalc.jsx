import { useState } from 'react';
import { WOOD_DATABASE } from '../utils/woodDatabase';
import { calculateMovement, SEASONAL_RH, getFramePanelAdvice } from '../utils/woodMovement';

export default function WoodMovementCalc() {
  const [width, setWidth] = useState(18);
  const [selectedWood, setSelectedWood] = useState('White Oak');
  const [location, setLocation] = useState('Temperate');
  const [grainDirection, setGrainDirection] = useState('tangential');
  const [result, setResult] = useState(null);

  const wood = WOOD_DATABASE.find((w) => w.name === selectedWood);
  const rh = SEASONAL_RH[location];

  const handleCalculate = () => {
    if (!wood || !rh) return;

    const movement = calculateMovement(width, wood.movement, rh.range, grainDirection);
    const frameAdvice = getFramePanelAdvice(width, parseFloat(movement.changePercent));

    setResult({ movement, frameAdvice, location, wood });
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto scrollbar-styled flex items-start justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl">
        <h2 className="text-responsive-2xl font-bold mb-2 text-white">Wood Movement Calculator</h2>
        <p className="text-responsive-base text-gray-300 mb-6 sm:mb-8">Estimate seasonal wood expansion & contraction</p>

        <div className="space-y-3 sm:space-y-4 mb-6">
          <h3 className="font-bold text-responsive-lg text-white">Settings</h3>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">Wood Species</label>
            <select
              value={selectedWood}
              onChange={(e) => setSelectedWood(e.target.value)}
              className="input-modern text-responsive-base"
            >
              {WOOD_DATABASE.map((w) => (
                <option key={w.name} value={w.name}>
                  {w.name} (Movement: {w.movement}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">Panel Width (in)</label>
            <input
              type="number"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="input-modern text-responsive-base"
            />
          </div>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">Location/Climate</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-modern text-responsive-base"
            >
              {Object.keys(SEASONAL_RH).map((loc) => (
                <option key={loc} value={loc}>
                  {loc} (RH range: {SEASONAL_RH[loc].range}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">Grain Direction</label>
            <div className="space-y-2 mt-2">
              <label className="flex items-center gap-2 p-3 bg-gray-800 bg-opacity-30 rounded-lg cursor-pointer hover:bg-opacity-50 transition border border-gray-700">
                <input
                  type="radio"
                  value="tangential"
                  checked={grainDirection === 'tangential'}
                  onChange={(e) => setGrainDirection(e.target.value)}
                  className="w-3 h-3"
                />
                <span className="text-responsive-base text-gray-300">Tangential (face grain, max movement)</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-gray-800 bg-opacity-30 rounded-lg cursor-pointer hover:bg-opacity-50 transition border border-gray-700">
                <input
                  type="radio"
                  value="radial"
                  checked={grainDirection === 'radial'}
                  onChange={(e) => setGrainDirection(e.target.value)}
                  className="w-3 h-3"
                />
                <span className="text-responsive-base text-gray-300">Radial (across rings, ~50% movement)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-lg hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-responsive-lg"
          >
            Calculate Movement
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg border border-amber-400">
            <h3 className="font-bold text-responsive-lg text-white mb-3">Seasonal Movement</h3>

            <div className="space-y-2 mb-4">
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Width at Minimum MC</p>
                <p className="text-responsive-xl font-bold text-white">{result.movement.minWidth}"</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Width at Maximum MC</p>
                <p className="text-responsive-xl font-bold text-white">{result.movement.maxWidth}"</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Total Width Change</p>
                <p className="text-responsive-xl font-bold text-white">{result.movement.changeInches}" ({result.movement.changePercent}%)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-lg border border-blue-400">
              <p className="font-semibold text-responsive-base text-white mb-2">Frame & Panel Advice</p>
              <p className="text-xs text-blue-100 mb-2">
                Recommended gap on each side of panel:
              </p>
              <p className="text-responsive-xl font-bold text-white mb-2">{result.frameAdvice.recommendedGap}"</p>
              <p className="text-xs text-blue-100">{result.frameAdvice.tip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
