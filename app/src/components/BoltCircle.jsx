import { useState, useCallback } from 'react';
import { calculateBoltCircle, COMMON_PATTERNS } from '../utils/boltCircleCalculator';

export default function BoltCircle() {
  const [holes, setHoles] = useState('');
  const [pcd, setPcd] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateBoltCircle(holes, pcd));
  }, [holes, pcd]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="form-compact">
        <input type="text" placeholder="Number of holes" value={holes} onChange={(e) => setHoles(e.target.value)} className="input-modern" />
        <input type="text" placeholder="PCD (in or mm)" value={pcd} onChange={(e) => setPcd(e.target.value)} className="input-modern" />
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {COMMON_PATTERNS.map(p => (
          <button key={p.label} onClick={() => { setHoles(p.holes.toString()); setPcd(p.pcd.toString()); setResult(null); }} className="px-2 py-0.5 text-xs rounded border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]">{p.label}</button>
        ))}
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate</button>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-xs text-amber-400/60">Chord Spacing</span><p className="text-2xl font-bold text-amber-400 gold-glow-text">{result.chord}</p></div>
              <div><span className="text-xs text-amber-400/60">Angle</span><p className="text-2xl font-bold text-amber-400">{result.angle}°</p></div>
            </div>
          </div>

          <div className="result-card">
            <p className="text-xs text-gray-500 mb-2">Hole Coordinates (0° at top)</p>
            <div className="grid grid-cols-6 gap-1 text-xs">
              <div className="text-gray-500 col-span-1 text-center">#</div>
              <div className="text-gray-500 col-span-2 text-center">X</div>
              <div className="text-gray-500 col-span-3 text-center">Y</div>
              {result.coordinates.map(c => (
                <>
                  <div key={`h-${c.hole}`} className="text-gray-500 text-center">{c.hole}</div>
                  <div className="col-span-2 text-right font-mono text-white">{c.x}</div>
                  <div className="col-span-3 text-right font-mono text-white">{c.y}</div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}