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
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto scrollbar-styled flex items-start justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl">
        <h2 className="text-responsive-2xl font-bold mb-2 text-white">Finish Estimator</h2>
        <p className="text-responsive-base text-gray-300 mb-6 sm:mb-8">Calculate finish coverage for Oil, Polyurethane, or Shellac</p>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="text-responsive-base font-medium text-gray-300">Length (in)</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="input-modern text-responsive-base"
              min="1"
            />
          </div>
          <div>
            <label className="text-responsive-base font-medium text-gray-300">Width (in)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="input-modern text-responsive-base"
              min="1"
            />
          </div>
          <div>
            <label className="text-responsive-base font-medium text-gray-300">Height (in)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-modern text-responsive-base"
              min="0"
            />
          </div>

          <label className="flex items-center gap-2 p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
            <input
              type="checkbox"
              checked={isClosed}
              onChange={(e) => setIsClosed(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-responsive-base text-gray-300">Closed box (all 6 sides)</span>
          </label>

          <div className="border-t border-gray-700 pt-4 mt-4" />

          <h3 className="font-bold text-responsive-base text-white mt-4">Finish Type</h3>
          <div className="space-y-2">
            {Object.entries(FINISH_PRESETS).map(([key, preset]) => (
              <label key={key} className="flex items-center gap-2 p-3 bg-gray-800 bg-opacity-30 rounded-lg cursor-pointer hover:bg-opacity-50 transition border border-gray-700">
                <input
                  type="radio"
                  name="finish"
                  value={key}
                  checked={finishType === key}
                  onChange={(e) => setFinishType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-responsive-base text-gray-300">{preset.name}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">Coats (leave blank for preset)</label>
            <input
              type="number"
              value={customCoats || ''}
              onChange={(e) => setCustomCoats(e.target.value ? parseInt(e.target.value) : null)}
              className="input-modern text-responsive-base"
              min="1"
              max="10"
              placeholder="Default"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-lg hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-responsive-lg"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-6 sm:mt-8 space-y-4">
            {/* Area Card */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-lg border border-blue-400">
              <p className="text-responsive-base text-blue-100 mb-2">Surface Area</p>
              <p className="text-responsive-2xl font-bold text-white">{result.area} sq ft</p>
            </div>

            {/* Finish Details */}
            <div className="p-6 sm:p-8 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <h3 className="font-bold text-responsive-lg text-white mb-3">{result.finish.name}</h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-lg border border-orange-400">
                  <p className="text-xs text-orange-100">Coats</p>
                  <p className="text-responsive-xl font-bold text-white">{result.finish.coats}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg border border-purple-400">
                  <p className="text-xs text-purple-100">Coverage</p>
                  <p className="text-responsive-xl font-bold text-white">{result.finish.coverage} sq ft/qt</p>
                </div>
              </div>

              {/* Amount Needed */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 border border-green-400 p-4 rounded-lg mb-4">
                <p className="text-responsive-base text-green-100 mb-2">Amount Needed</p>
                <div className="flex gap-4 items-baseline">
                  <div>
                    <p className="text-responsive-2xl font-bold text-white">{result.finish.quartsNeeded}</p>
                    <p className="text-xs text-green-100">quarts</p>
                  </div>
                  <span className="text-green-100">or</span>
                  <div>
                    <p className="text-responsive-2xl font-bold text-white">{result.finish.gallonsNeeded}</p>
                    <p className="text-xs text-green-100">gallons</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg border border-gray-600">
                <p className="text-xs font-medium text-gray-300 mb-1">Tips:</p>
                <p className="text-xs text-gray-300">{result.finish.notes}</p>
                {result.finish.drySand && (
                  <p className="text-xs text-amber-400 mt-2">⚠ Sand between coats</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
