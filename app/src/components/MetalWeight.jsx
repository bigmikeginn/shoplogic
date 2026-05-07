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

  const updateDim = (field, value) => setDims(prev => ({ ...prev, [field]: value }));
  const stock = STOCK_TYPES.find(s => s.id === stockType);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-wrap gap-1 mb-3">
        {STOCK_TYPES.map(s => (
          <button key={s.id} onClick={() => { setStockType(s.id); setResult(null); }} className={`px-2 py-1 text-xs rounded ${stockType === s.id ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{s.label}</button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {METAL_DENSITIES.map(m => (
          <button key={m.name} onClick={() => { setMaterial(m.name); setResult(null); }} className={`px-2 py-1 text-xs rounded ${material === m.name ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{m.name}</button>
        ))}
      </div>

      <div className="form-compact">
        {stock?.fields.map(f => (
          <input key={f} type="text" placeholder={f.charAt(0).toUpperCase() + f.slice(1) + ' (in)'} value={dims[f] || ''} onChange={(e) => updateDim(f, e.target.value)} className="input-modern" />
        ))}
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate Weight</button>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <p className="text-xs text-amber-400/60 mb-1">Weight</p>
            <div className="flex gap-4">
              <div className="flex-1"><span className="text-xs text-amber-400/60">lbs</span><p className="text-2xl font-bold text-amber-400">{result.weightLbs}</p></div>
              <div className="flex-1"><span className="text-xs text-amber-400/60">kg</span><p className="text-2xl font-bold text-amber-400">{result.weightKg}</p></div>
            </div>
          </div>
          <div className="result-card text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Volume</span><span className="text-white">{result.volume} in³</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Material</span><span className="text-white">{result.material} ({result.density} lbs/in³)</span></div>
          </div>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}