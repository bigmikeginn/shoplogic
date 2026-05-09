import { useState, useCallback } from 'react';
import { calculateStairs } from '../utils/stairCalculator';
import StairsIllustration from './StairsIllustration';

export default function StairCalculator() {
  const [totalRise, setTotalRise] = useState('');
  const [totalRun, setTotalRun] = useState('');
  const [desiredRiser, setDesiredRiser] = useState('7');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateStairs(totalRise, totalRun, { maxRiser: parseFloat(desiredRiser) || 7.75 }));
  }, [totalRise, totalRun, desiredRiser]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="space-y-3">
        <input type="text" placeholder="Total Rise (in)" value={totalRise} onChange={(e) => setTotalRise(e.target.value)} className="input-modern" />
        <input type="text" placeholder="Total Run (in, optional)" value={totalRun} onChange={(e) => setTotalRun(e.target.value)} className="input-modern" />
        <input type="text" placeholder="Max Riser Height (in)" value={desiredRiser} onChange={(e) => setDesiredRiser(e.target.value)} className="input-modern" />
        <button onClick={handleCalculate} className="btn-gold w-full">Calculate Stairs</button>
      </div>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="result-card-highlight"><span className="text-xs text-amber-400/60">Risers</span><p className="text-xl font-bold text-amber-400">{result.risers}</p></div>
            <div className="result-card-highlight"><span className="text-xs text-amber-400/60">Riser Ht</span><p className="text-xl font-bold text-amber-400">{result.riserHeight}"</p></div>
          </div>
          <div className="result-card space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Treads</span><span className="text-white">{result.treads}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tread Depth</span><span className="text-white">{result.treadDepth}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Total Run</span><span className="text-white">{result.totalRun}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Stringer Length</span><span className="text-white">{result.stringerLength}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Angle</span><span className="text-white">{result.angle}°</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Rise+Run Sum</span><span className="text-white">{result.riseRunSum}"</span></div>
          </div>
          {!result.isCodeCompliant && result.issues && (
            <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] text-xs">
              <p className="text-amber-400 font-medium mb-1">Issues:</p>
              {result.issues.map((issue, i) => <p key={i} className="text-amber-300">• {issue}</p>)}
            </div>
          )}
          {result.isCodeCompliant && (
            <div className="p-2 text-xs text-green-400 text-center bg-green-500/5 border border-green-500/15 rounded-lg">✓ Code compliant</div>
          )}
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
      <StairsIllustration />
    </div>
  );
}