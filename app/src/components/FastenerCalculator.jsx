import { useState } from 'react';
import {
  SCREW_SIZES,
  getPilotHoleSize,
  calculateScrewLayout,
  APPLICATIONS,
  getRecommendation,
} from '../utils/fastenerCalculator';

export default function FastenerCalculator() {
  const [tab, setTab] = useState('pilot'); // 'pilot' or 'layout' or 'app'
  const [screwSize, setScrewSize] = useState('#8');
  const [woodType, setWoodType] = useState('hardwood');
  const [boardLength, setBoardLength] = useState('');
  const [spacing, setSpacing] = useState('');
  const [edgeInset, setEdgeInset] = useState('');
  const [application, setApplication] = useState('General Assembly');
  const [result, setResult] = useState(null);

  const handleCalculatePilot = () => {
    const info = getPilotHoleSize(screwSize, woodType);
    setResult({ type: 'pilot', data: info });
  };

  const handleCalculateLayout = () => {
    const layout = calculateScrewLayout(boardLength, spacing, edgeInset);
    setResult({ type: 'layout', data: layout });
  };

  const handleCalculateApp = () => {
    const rec = getRecommendation(application, woodType);
    setResult({ type: 'app', data: rec });
  };

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Screw & Fastener Calculator</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Pilot hole sizing and fastener recommendations</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-5 overflow-x-auto">
          <button
            onClick={() => setTab('pilot')}
            className={`px-3 sm:px-4 py-2 rounded font-medium transition whitespace-nowrap text-sm sm:text-base ${
              tab === 'pilot'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
            }`}
          >
            Pilot Holes
          </button>
          <button
            onClick={() => setTab('layout')}
            className={`px-3 sm:px-4 py-2 rounded font-medium transition whitespace-nowrap text-sm sm:text-base ${
              tab === 'layout'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
            }`}
          >
            Layout
          </button>
          <button
            onClick={() => setTab('app')}
            className={`px-3 sm:px-4 py-2 rounded font-medium transition whitespace-nowrap text-sm sm:text-base ${
              tab === 'app'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
            }`}
          >
            Application
          </button>
        </div>

        {/* Pilot Holes */}
        {tab === 'pilot' && (
          <div className="form-compact">
            <select
              value={screwSize}
              onChange={(e) => setScrewSize(e.target.value)}
              className="input-modern"
            >
              {Object.keys(SCREW_SIZES).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <select
              value={woodType}
              onChange={(e) => setWoodType(e.target.value)}
              className="input-modern"
            >
              <option value="hardwood">Hardwood</option>
              <option value="softwood">Softwood</option>
            </select>

            <button
              onClick={handleCalculatePilot}
              className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
            >
              Calculate
            </button>

            {result?.type === 'pilot' && (
              <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded shadow-lg border border-green-400">
                <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white mb-3">Pilot Hole Sizes</h3>
                <div className="space-y-2">
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-green-400">
                    <p className="text-xs text-green-100">Screw Diameter</p>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                      {result.data.screwDiameter.toFixed(3)}"
                    </p>
                  </div>
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-green-400">
                    <p className="text-xs text-green-100">Pilot Hole</p>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                      {result.data.pilotHoleDiameter.toFixed(3)}"
                    </p>
                    <p className="text-xs text-green-100 mt-1">{result.data.tip}</p>
                  </div>
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-green-400">
                    <p className="text-xs text-green-100">Clearance Hole (for bolts)</p>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.data.clearanceHoleDiameter.toFixed(3)}"</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Layout */}
        {tab === 'layout' && (
          <div className="form-compact">
            <input
              type="number"
              step="0.5"
              placeholder="Board Length (in)"
              value={boardLength}
              onChange={(e) => setBoardLength(parseFloat(e.target.value))}
              className="input-modern"
            />

            <input
              type="number"
              step="0.5"
              placeholder="Spacing (in)"
              value={spacing}
              onChange={(e) => setSpacing(parseFloat(e.target.value))}
              className="input-modern"
            />

            <input
              type="number"
              step="0.5"
              placeholder="Edge Inset (in)"
              value={edgeInset}
              onChange={(e) => setEdgeInset(parseFloat(e.target.value))}
              className="input-modern"
            />

            <button
              onClick={handleCalculateLayout}
              className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
            >
              Calculate Layout
            </button>

            {result?.type === 'layout' && (
              <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded shadow-lg border border-blue-400">
                <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white mb-3">Screw Positions</h3>
                {result.data.error ? (
                  <p className="text-red-200 text-sm">{result.data.error}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-blue-400">
                      <p className="text-xs text-blue-100">Number of Screws</p>
                      <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.data.count}</p>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-blue-400">
                      <p className="text-xs text-blue-100">Actual Spacing</p>
                      <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.data.spacing}"</p>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-blue-400 text-xs font-mono">
                      <p className="text-blue-100 mb-1">Positions:</p>
                      <p className="text-blue-100 break-all">{result.data.positions.join(', ')}"</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Application */}
        {tab === 'app' && (
          <div className="form-compact">
            <select
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="input-modern"
            >
              {Object.keys(APPLICATIONS).map((app) => (
                <option key={app} value={app}>
                  {app}
                </option>
              ))}
            </select>

            <select
              value={woodType}
              onChange={(e) => setWoodType(e.target.value)}
              className="input-modern"
            >
              <option value="hardwood">Hardwood</option>
              <option value="softwood">Softwood</option>
            </select>

            <button
              onClick={handleCalculateApp}
              className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
            >
              Get Recommendation
            </button>

            {result?.type === 'app' && result.data && (
              <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded shadow-lg border border-purple-400">
                <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white mb-3">{result.data.application}</h3>
                <div className="space-y-2">
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-purple-400">
                    <p className="text-xs text-purple-100">Fastener Type</p>
                    <p className="text-responsive-sm sm:text-responsive-base font-bold text-white">{result.data.recommendation.type}</p>
                  </div>
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-purple-400">
                    <p className="text-xs text-purple-100">Recommended Size</p>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                      {result.data.screwSize}
                    </p>
                  </div>
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-purple-400">
                    <p className="text-xs text-purple-100">Pilot Hole</p>
                    <p className="font-mono text-responsive-sm sm:text-responsive-base text-white">
                      {result.data.pilotInfo.pilotHoleDiameter.toFixed(3)}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
