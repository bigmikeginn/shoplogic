import { useState, useCallback } from 'react';
import { calculateMetalWeight, METAL_DENSITIES, STOCK_TYPES } from '../utils/metalWeightCalculator';

export default function MetalWeight() {
  const [stockType, setStockType] = useState('plate');
  const [material, setMaterial] = useState('Steel (Mild)');
  const [dims, setDims] = useState({});
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateMetalWeight(stockType, dims, material));
  }, [stockType, dims, material]);

  const updateDim = (field, value) => {
    setDims(prev => ({ ...prev, [field]: value }));
  };

  const stock = STOCK_TYPES.find(s => s.id === stockType);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Metal Weight</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Calculate weight by shape, dimensions & material</p>

        {/* Stock type */}
        <div className="flex flex-wrap gap-1 mb-3">
          {STOCK_TYPES.map(s => (
            <button key={s.id} onClick={() => { setStockType(s.id); setResult(null); }} className={`px-2 py-1 text-xs rounded ${stockType === s.id ? 'bg-slate-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Material */}
        <div className="flex flex-wrap gap-1 mb-3">
          {METAL_DENSITIES.map(m => (
            <button key={m.name} onClick={() => { setMaterial(m.name); setResult(null); }} className={`px-2 py-1 text-xs rounded ${material === m.name ? 'bg-slate-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {m.name}
            </button>
          ))}
        </div>

        {/* Dimension fields */}
        <div className="form-compact">
          {stock?.fields.map(f => (
            <input key={f} type="text" placeholder={f.charAt(0).toUpperCase() + f.slice(1) + ' (in)'} value={dims[f] || ''} onChange={(e) => updateDim(f, e.target.value)} className="input-modern" />
          ))}
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-slate-500 to-gray-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate Weight
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-500 to-gray-600 rounded shadow-lg border border-slate-400 text-white">
              <p className="text-xs text-white/70 mb-1">Weight</p>
              <div className="flex gap-4">
                <div className="flex-1"><span className="text-xs opacity-70">lbs</span><p className="text-responsive-xl font-bold">{result.weightLbs}</p></div>
                <div className="flex-1"><span className="text-xs opacity-70">kg</span><p className="text-responsive-xl font-bold">{result.weightKg}</p></div>
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Volume</span><span>{result.volume} in³</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Material</span><span>{result.material} ({result.density} lbs/in³)</span></div>
            </div>
          </div>
        )}
        {result && result.error && <div className="mt-3 sm:mt-4 p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-sm">{result.error}</div>}
      </div>
    </div>
  );
}