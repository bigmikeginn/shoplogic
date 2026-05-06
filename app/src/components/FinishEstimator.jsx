import { useState } from 'react';
import { calculateSurfaceArea, calculateFinish, FINISH_PRESETS } from '../utils/finishCalculator';

const FURNITURE_TYPES = {
  table: {
    name: 'Table',
    description: 'Large top & bottom, negligible sides',
    geometry: (length, width) => ({ length, width, height: 0, isClosed: false })
  },
  cabinet: {
    name: 'Cabinet',
    description: 'All outside & inside surfaces',
    geometry: (length, width, height) => ({ length, width, height, isClosed: true })
  },
  box: {
    name: 'Box/Drawer',
    description: 'Closed 6-sided box',
    geometry: (length, width, height) => ({ length, width, height, isClosed: true })
  },
  openBox: {
    name: 'Open Box',
    description: 'Open top (5 sides)',
    geometry: (length, width, height) => ({ length, width, height, isClosed: false })
  },
  panel: {
    name: 'Panel/Door',
    description: 'Flat surface only',
    geometry: (length, width) => ({ length, width, height: 0, isClosed: false })
  }
};

export default function FinishEstimator() {
  const [furnitureType, setFurnitureType] = useState('table');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [finishType, setFinishType] = useState('poly');
  const [customCoats, setCustomCoats] = useState(null);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    if (l <= 0 || w <= 0) return;

    const furniture = FURNITURE_TYPES[furnitureType];
    const geometry = furniture.geometry(l, w, h);

    const area = calculateSurfaceArea(geometry.length, geometry.width, geometry.height, geometry.isClosed);
    const finish = calculateFinish(area, finishType, customCoats);

    setResult({ area, finish });
  };

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Finish Estimator</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Calculate finish coverage for various wood finishes</p>

        <div className="form-compact">
          <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Furniture Type</label>
          <div className="space-y-1 mb-3">
            {Object.entries(FURNITURE_TYPES).map(([key, furniture]) => (
              <label key={key} className="flex items-center gap-2 p-2 sm:p-3 bg-gray-800 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition border border-gray-700 text-sm sm:text-base">
                <input
                  type="radio"
                  name="furniture"
                  value={key}
                  checked={furnitureType === key}
                  onChange={(e) => setFurnitureType(e.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="text-gray-300 font-medium">{furniture.name}</p>
                  <p className="text-xs text-gray-400">{furniture.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-3 mt-3" />

          <input
            type="number"
            placeholder="Length (inches)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="input-modern"
            min="1"
          />
          <input
            type="number"
            placeholder="Width (inches)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="input-modern"
            min="1"
          />
          {(furnitureType === 'cabinet' || furnitureType === 'box' || furnitureType === 'openBox') && (
            <input
              type="number"
              placeholder="Height (inches)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-modern"
              min="1"
            />
          )}

          <div className="border-t border-gray-700 pt-3 mt-3" />

          <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Finish Type</label>
          <div className="space-y-1">
            {Object.entries(FINISH_PRESETS).map(([key, preset]) => (
              <label key={key} className="flex items-center gap-2 p-2 sm:p-3 bg-gray-800 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition border border-gray-700 text-sm sm:text-base">
                <input
                  type="radio"
                  name="finish"
                  value={key}
                  checked={finishType === key}
                  onChange={(e) => setFinishType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">{preset.name}</span>
              </label>
            ))}
          </div>

          <input
            type="number"
            placeholder="Coats (optional - leave blank for preset)"
            value={customCoats || ''}
            onChange={(e) => setCustomCoats(e.target.value ? parseInt(e.target.value) : null)}
            className="input-modern"
            min="1"
            max="10"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-2 sm:space-y-3">
            {/* Area Card */}
            <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded shadow-lg border border-blue-400">
              <p className="text-xs sm:text-sm text-blue-100 mb-1">Surface Area</p>
              <p className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold text-white">{result.area} sq ft</p>
            </div>

            {/* Finish Details */}
            <div className="p-4 sm:p-5 lg:p-6 bg-gray-800 bg-opacity-50 rounded border border-gray-700 space-y-2">
              <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white">{result.finish.name}</h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 sm:p-3 rounded border border-orange-400">
                  <p className="text-xs text-orange-100">Coats</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.finish.coats}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 sm:p-3 rounded border border-purple-400">
                  <p className="text-xs text-purple-100">Coverage</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.finish.coverage} sq ft/qt</p>
                </div>
              </div>

              {/* Amount Needed */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 border border-green-400 p-3 sm:p-4 rounded">
                <p className="text-xs sm:text-sm text-green-100 mb-2">Amount Needed</p>
                <div className="flex gap-3 items-baseline text-sm sm:text-base">
                  <div>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.finish.quartsNeeded}</p>
                    <p className="text-xs text-green-100">quarts</p>
                  </div>
                  <span className="text-green-100">or</span>
                  <div>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.finish.gallonsNeeded}</p>
                    <p className="text-xs text-green-100">gallons</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-700 bg-opacity-50 p-2 sm:p-3 rounded border border-gray-600 text-xs">
                <p className="font-medium text-gray-300 mb-1">Tips:</p>
                <p className="text-gray-300">{result.finish.notes}</p>
                {result.finish.drySand && (
                  <p className="text-amber-400 mt-1">⚠ Sand between coats</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
