import { useState } from 'react';
import { calculateSurfaceArea, calculateFinish, FINISH_PRESETS } from '../utils/finishCalculator';

export default function FinishEstimator() {
  const [length, setLength] = useState(48);
  const [width, setWidth] = useState(24);
  const [height, setHeight] = useState(18);
  const [isClosed, setIsClosed] = useState(false);
  const [finishType, setFinishType] = useState('poly');
  const [customCoats, setCustomCoats] = useState(null);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    const area = calculateSurfaceArea(l, w, h, isClosed);
    const finish = calculateFinish(area, finishType, customCoats);

    setResult({ area, finish });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Finish Estimator</h2>
      <p className="text-sm text-gray-600 mb-6">Calculate finish coverage for Oil, Polyurethane, or Shellac</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold mb-4">Dimensions</h3>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-sm font-medium">Length (in)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Width (in)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Height (in)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              <input
                type="checkbox"
                checked={isClosed}
                onChange={(e) => setIsClosed(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Closed box (all 6 sides)</span>
            </label>
          </div>

          <hr className="my-4" />

          <h3 className="font-bold mb-3">Finish Type</h3>
          <div className="space-y-2 mb-4">
            {Object.entries(FINISH_PRESETS).map(([key, preset]) => (
              <label key={key} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="finish"
                  value={key}
                  checked={finishType === key}
                  onChange={(e) => setFinishType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{preset.name}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium">Coats (leave blank for preset)</label>
            <input
              type="number"
              value={customCoats || ''}
              onChange={(e) => setCustomCoats(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="10"
              placeholder="Default"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
          >
            Calculate
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              {/* Area Card */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Surface Area</p>
                <p className="text-3xl font-bold text-blue-700">{result.area} sq ft</p>
              </div>

              {/* Finish Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold mb-3">{result.finish.name}</h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                    <p className="text-xs text-gray-600">Coats</p>
                    <p className="text-2xl font-bold text-orange-700">{result.finish.coats}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                    <p className="text-xs text-gray-600">Coverage</p>
                    <p className="text-2xl font-bold text-purple-700">{result.finish.coverage} sq ft/qt</p>
                  </div>
                </div>

                {/* Amount Needed */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2">Amount Needed</p>
                  <div className="flex gap-4 items-baseline">
                    <div>
                      <p className="text-3xl font-bold text-green-700">{result.finish.quartsNeeded}</p>
                      <p className="text-xs text-gray-600">quarts</p>
                    </div>
                    <span className="text-gray-400">or</span>
                    <div>
                      <p className="text-3xl font-bold text-emerald-700">{result.finish.gallonsNeeded}</p>
                      <p className="text-xs text-gray-600">gallons</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-1">Tips:</p>
                  <p className="text-xs text-gray-600">{result.finish.notes}</p>
                  {result.finish.drySand && (
                    <p className="text-xs text-amber-700 mt-2">⚠ Sand between coats</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-500">Click "Calculate" to estimate finish</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
