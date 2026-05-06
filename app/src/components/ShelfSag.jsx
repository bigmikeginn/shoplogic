import { useState, useCallback } from 'react';
import { calculateShelfSag, recommendedThickness, SHELF_MATERIALS } from '../utils/shelfSagCalculator';

export default function ShelfSag() {
  const [span, setSpan] = useState('');
  const [depth, setDepth] = useState('');
  const [thickness, setThickness] = useState('');
  const [load, setLoad] = useState('');
  const [material, setMaterial] = useState('Cherry');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateShelfSag(span, depth, thickness, load, material));
  }, [span, depth, thickness, load, material]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Shelf Sag</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Estimate deflection under load (L/240 industry standard)</p>

        <div className="form-compact">
          <input type="text" placeholder="Span between supports (in)" value={span} onChange={(e) => setSpan(e.target.value)} className="input-modern" />
          <input type="text" placeholder="Shelf depth front-to-back (in)" value={depth} onChange={(e) => setDepth(e.target.value)} className="input-modern" />
          <input type="text" placeholder="Shelf thickness (in) e.g. 0.75" value={thickness} onChange={(e) => setThickness(e.target.value)} className="input-modern" />
          <input type="text" placeholder="Expected load (lbs)" value={load} onChange={(e) => setLoad(e.target.value)} className="input-modern" />
        </div>

        <div className="mt-3">
          <label className="block text-xs text-gray-400 mb-1">Material</label>
          <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            {SHELF_MATERIALS.map((m) => (
              <option key={m.name} value={m.name}>{m.name}</option>
            ))}
          </select>
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className={`p-4 sm:p-5 rounded shadow-lg border ${result.isSafe ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400' : 'bg-gradient-to-br from-red-500 to-rose-600 border-red-400'}`}>
              <p className="text-xs text-white/70 mb-1">{result.isSafe ? '✓ Safe — No Sagging' : '⚠ May Sag'}</p>
              <div className="grid grid-cols-2 gap-2 text-white">
                <div><span className="text-xs opacity-70">Deflection</span><p className="font-bold">{result.deflection.toFixed(4)}"</p></div>
                <div><span className="text-xs opacity-70">Limit</span><p className="font-bold">{result.maxSafeDeflection.toFixed(4)}"</p></div>
                <div><span className="text-xs opacity-70">Safety Factor</span><p className="font-bold">{typeof result.safetyFactor === 'number' ? `${result.safetyFactor}×` : result.safetyFactor}</p></div>
                <div><span className="text-xs opacity-70">Material</span><p className="font-bold text-sm">{result.material}</p></div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs text-gray-400">Max Safe Load</span><p className="font-bold">{result.maxSafeLoad} lbs</p></div>
                <div><span className="text-xs text-gray-400">Max Safe Span</span><p className="font-bold">{result.maxSafeSpan}"</p></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{result.notes}</p>
            </div>
          </div>
        )}

        {result && result.error && (
          <div className="mt-3 sm:mt-4 p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-sm">{result.error}</div>
        )}
      </div>
    </div>
  );
}