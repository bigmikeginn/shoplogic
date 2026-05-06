import { useState } from 'react';
import { WOOD_DATABASE } from '../utils/woodDatabase';
import { calculateMovement, SEASONAL_RH, getFramePanelAdvice } from '../utils/woodMovement';

export default function WoodMovementCalc() {
  const [width, setWidth] = useState('');
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
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Wood Movement Calculator</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Estimate seasonal wood expansion & contraction</p>

        <div className="form-compact">
          <select
            value={selectedWood}
            onChange={(e) => setSelectedWood(e.target.value)}
            className="input-modern"
          >
            {WOOD_DATABASE.map((w) => (
              <option key={w.name} value={w.name}>
                {w.name} (Movement: {w.movement}%)
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.1"
            placeholder="Panel Width (in)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="input-modern"
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-modern"
          >
            {Object.keys(SEASONAL_RH).map((loc) => (
              <option key={loc} value={loc}>
                {loc} (RH range: {SEASONAL_RH[loc].range}%)
              </option>
            ))}
          </select>

          <div className="space-y-2 pb-3 border-b border-gray-700">
            <label className="flex items-center gap-2 p-2 sm:p-3 bg-gray-800 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition border border-gray-700 text-sm">
              <input
                type="radio"
                value="tangential"
                checked={grainDirection === 'tangential'}
                onChange={(e) => setGrainDirection(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-gray-300">Tangential (face grain, max movement)</span>
            </label>
            <label className="flex items-center gap-2 p-2 sm:p-3 bg-gray-800 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition border border-gray-700 text-sm">
              <input
                type="radio"
                value="radial"
                checked={grainDirection === 'radial'}
                onChange={(e) => setGrainDirection(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-gray-300">Radial (across rings, ~50% movement)</span>
            </label>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
          >
            Calculate Movement
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded shadow-lg border border-amber-400">
            <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white mb-2 sm:mb-3">Seasonal Movement</h3>

            <div className="space-y-2 mb-3">
              <div className="bg-gray-900 bg-opacity-50 p-3 sm:p-4 rounded border border-amber-400">
                <p className="text-xs text-amber-100">Width at Minimum MC</p>
                <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.movement.minWidth}"</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 sm:p-4 rounded border border-amber-400">
                <p className="text-xs text-amber-100">Width at Maximum MC</p>
                <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.movement.maxWidth}"</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 sm:p-4 rounded border border-amber-400">
                <p className="text-xs text-amber-100">Total Width Change</p>
                <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.movement.changeInches}" ({result.movement.changePercent}%)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 sm:p-4 rounded border border-blue-400">
              <p className="font-semibold text-responsive-sm sm:text-responsive-base text-white mb-2">Frame & Panel Advice</p>
              <p className="text-xs text-blue-100 mb-2">
                Recommended gap on each side of panel:
              </p>
              <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white mb-2">{result.frameAdvice.recommendedGap}"</p>
              <p className="text-xs text-blue-100">{result.frameAdvice.tip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
