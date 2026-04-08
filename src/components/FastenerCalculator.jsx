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
  const [boardLength, setBoardLength] = useState(24);
  const [spacing, setSpacing] = useState(6);
  const [edgeInset, setEdgeInset] = useState(2);
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Screw & Fastener Calculator</h2>
      <p className="text-sm text-gray-600 mb-6">Pilot hole sizing and fastener recommendations</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setTab('pilot')}
          className={`px-4 py-2 rounded font-medium transition whitespace-nowrap ${
            tab === 'pilot'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pilot Holes
        </button>
        <button
          onClick={() => setTab('layout')}
          className={`px-4 py-2 rounded font-medium transition whitespace-nowrap ${
            tab === 'layout'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Layout
        </button>
        <button
          onClick={() => setTab('app')}
          className={`px-4 py-2 rounded font-medium transition whitespace-nowrap ${
            tab === 'app'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Application
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pilot Holes */}
        {tab === 'pilot' && (
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
              <h3 className="font-bold">Pilot Hole Sizing</h3>

              <div>
                <label className="text-sm font-medium">Screw Size</label>
                <select
                  value={screwSize}
                  onChange={(e) => setScrewSize(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                >
                  {Object.keys(SCREW_SIZES).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Wood Type</label>
                <select
                  value={woodType}
                  onChange={(e) => setWoodType(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                >
                  <option value="hardwood">Hardwood</option>
                  <option value="softwood">Softwood</option>
                </select>
              </div>

              <button
                onClick={handleCalculatePilot}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
              >
                Calculate
              </button>
            </div>

            {result?.type === 'pilot' && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4">
                <h3 className="font-bold mb-3">Pilot Hole Sizes</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-xs text-gray-600">Screw Diameter</p>
                    <p className="text-lg font-bold text-gray-800">
                      {result.data.screwDiameter.toFixed(3)}"
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-xs text-gray-600">Pilot Hole</p>
                    <p className="text-lg font-bold text-green-700">
                      {result.data.pilotHoleDiameter.toFixed(3)}"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{result.data.tip}</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-xs text-gray-600">Clearance Hole (for bolts)</p>
                    <p className="text-lg font-bold">{result.data.clearanceHoleDiameter.toFixed(3)}"</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Layout */}
        {tab === 'layout' && (
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
              <h3 className="font-bold">Screw Layout</h3>

              <div>
                <label className="text-sm font-medium">Board Length (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={boardLength}
                  onChange={(e) => setBoardLength(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Spacing (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={spacing}
                  onChange={(e) => setSpacing(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Edge Inset (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={edgeInset}
                  onChange={(e) => setEdgeInset(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>

              <button
                onClick={handleCalculateLayout}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
              >
                Calculate Layout
              </button>
            </div>

            {result?.type === 'layout' && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-300 rounded-lg p-4">
                <h3 className="font-bold mb-3">Screw Positions</h3>
                {result.data.error ? (
                  <p className="text-red-600 text-sm">{result.data.error}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-xs text-gray-600">Number of Screws</p>
                      <p className="text-2xl font-bold text-blue-700">{result.data.count}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-xs text-gray-600">Actual Spacing</p>
                      <p className="text-lg font-bold">{result.data.spacing}"</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-blue-200 text-xs font-mono">
                      <p className="text-gray-600 mb-1">Positions:</p>
                      <p className="text-gray-800">{result.data.positions.join(', ')}"</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Application */}
        {tab === 'app' && (
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
              <h3 className="font-bold">Application</h3>

              <div>
                <label className="text-sm font-medium">Application Type</label>
                <select
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                >
                  {Object.keys(APPLICATIONS).map((app) => (
                    <option key={app} value={app}>
                      {app}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Wood Type</label>
                <select
                  value={woodType}
                  onChange={(e) => setWoodType(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                >
                  <option value="hardwood">Hardwood</option>
                  <option value="softwood">Softwood</option>
                </select>
              </div>

              <button
                onClick={handleCalculateApp}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
              >
                Get Recommendation
              </button>
            </div>

            {result?.type === 'app' && result.data && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-300 rounded-lg p-4">
                <h3 className="font-bold mb-3">{result.data.application}</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-xs text-gray-600">Fastener Type</p>
                    <p className="font-bold">{result.data.recommendation.type}</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-xs text-gray-600">Recommended Size</p>
                    <p className="text-lg font-bold text-purple-700">
                      {result.data.screwSize}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-xs text-gray-600">Pilot Hole</p>
                    <p className="font-mono text-sm">
                      {result.data.pilotInfo.pilotHoleDiameter.toFixed(3)}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
