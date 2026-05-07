import { useState, useCallback } from 'react';
import { calculateShelfSag, SHELF_MATERIALS } from '../utils/shelfSagCalculator';
import CustomSelect from './CustomSelect';

export default function ShelfSag() {
  const [material, setMaterial] = useState('');
  const [thickness, setThickness] = useState('0.75');
  const [depth, setDepth] = useState('12');
  const [span, setSpan] = useState('36');
  const [load, setLoad] = useState('50');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateShelfSag(span, depth, thickness, load, material));
  }, [material, thickness, depth, span, load]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="space-y-3">
        <CustomSelect value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="">Select material...</option>
          {SHELF_MATERIALS.map((m) => <option key={m.name} value={m.name}>{m.name}</option>)}
        </CustomSelect>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Thickness (in)" value={thickness} onChange={(e) => setThickness(e.target.value)} className="input-modern" />
          <input type="text" placeholder="Depth (in)" value={depth} onChange={(e) => setDepth(e.target.value)} className="input-modern" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Span (in)" value={span} onChange={(e) => setSpan(e.target.value)} className="input-modern" />
          <input type="text" placeholder="Load (lbs)" value={load} onChange={(e) => setLoad(e.target.value)} className="input-modern" />
        </div>
        <button onClick={handleCalculate} className="btn-gold w-full">Calculate</button>
      </div>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <span className="text-xs text-amber-400/60">Deflection</span>
            <p className="text-2xl font-bold text-amber-400 gold-glow-text">{result.deflection}"</p>
            {result.isSafe !== undefined && (
              <span className={`text-xs ml-2 px-2 py-0.5 rounded ${result.isSafe ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {result.isSafe ? 'Safe' : 'Excessive'}
              </span>
            )}
          </div>
          <div className="result-card space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Material</span><span className="text-white">{result.material}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">MOE</span><span className="text-white">{(result.moe / 1000000).toFixed(2)}M psi</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Max Safe Deflection</span><span className="text-white">{result.maxSafeDeflection}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Safety Factor</span><span className="text-white">{result.safetyFactor}x</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Max Safe Load</span><span className="text-white">{result.maxSafeLoad} lbs</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Max Safe Span</span><span className="text-white">{result.maxSafeSpan}"</span></div>
          </div>
          <p className="text-xs text-gray-500 px-1">{result.notes}</p>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}