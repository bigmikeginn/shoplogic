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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Wood Movement Calculator</h2>
      <p className="text-sm text-gray-600 mb-6">Estimate seasonal wood expansion & contraction</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          <h3 className="font-bold mb-3">Settings</h3>

          <div>
            <label className="text-sm font-medium">Wood Species</label>
            <select
              value={selectedWood}
              onChange={(e) => setSelectedWood(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {WOOD_DATABASE.map((w) => (
                <option key={w.name} value={w.name}>
                  {w.name} (Movement: {w.movement}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Panel Width (in)</label>
            <input
              type="number"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Location/Climate</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(SEASONAL_RH).map((loc) => (
                <option key={loc} value={loc}>
                  {loc} (RH range: {SEASONAL_RH[loc].range}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Grain Direction</label>
            <div className="space-y-2 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="tangential"
                  checked={grainDirection === 'tangential'}
                  onChange={(e) => setGrainDirection(e.target.value)}
                  className="w-3 h-3"
                />
                <span className="text-sm">Tangential (face grain, max movement)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="radial"
                  checked={grainDirection === 'radial'}
                  onChange={(e) => setGrainDirection(e.target.value)}
                  className="w-3 h-3"
                />
                <span className="text-sm">Radial (across rings, ~50% movement)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          >
            Calculate Movement
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-bold mb-3">Seasonal Movement</h3>

              <div className="space-y-2 mb-4">
                <div className="bg-white p-3 rounded border border-amber-100">
                  <p className="text-xs text-gray-600">Width at Minimum MC</p>
                  <p className="text-lg font-bold text-blue-700">{result.movement.minWidth}"</p>
                </div>
                <div className="bg-white p-3 rounded border border-amber-100">
                  <p className="text-xs text-gray-600">Width at Maximum MC</p>
                  <p className="text-lg font-bold text-orange-700">{result.movement.maxWidth}"</p>
                </div>
                <div className="bg-white p-3 rounded border border-amber-100">
                  <p className="text-xs text-gray-600">Total Width Change</p>
                  <p className="text-lg font-bold text-red-700">{result.movement.changeInches}" ({result.movement.changePercent}%)</p>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="font-semibold text-sm mb-2">Frame & Panel Advice</p>
                <p className="text-xs text-gray-700 mb-2">
                  Recommended gap on each side of panel:
                </p>
                <p className="text-lg font-bold text-blue-700 mb-2">{result.frameAdvice.recommendedGap}"</p>
                <p className="text-xs text-gray-600">{result.frameAdvice.tip}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
