import { useState, useCallback } from 'react';
import { calculateStairs, STAIR_DEFAULTS } from '../utils/stairCalculator';

export default function StairCalculator() {
  const [totalRise, setTotalRise] = useState('');
  const [totalRun, setTotalRun] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    const r = calculateStairs(totalRise, totalRun);
    setResult(r);
  }, [totalRise, totalRun]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Stair Calculator</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">IRC code defaults: max riser {STAIR_DEFAULTS.maxRiser}", min tread {STAIR_DEFAULTS.minTread}"</p>

        <div className="form-compact">
          <input type="text" placeholder="Total rise (in) e.g. 108" value={totalRise} onChange={(e) => setTotalRise(e.target.value)} className="input-modern" />
          <input type="text" placeholder="Available run (in) — optional" value={totalRun} onChange={(e) => setTotalRun(e.target.value)} className="input-modern" />
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className={`p-4 sm:p-5 rounded shadow-lg border ${result.isCodeCompliant ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400' : 'bg-gradient-to-br from-yellow-500 to-amber-600 border-yellow-400'}`}>
              <p className="text-responsive-xs text-white/80 mb-1">{result.isCodeCompliant ? '✓ Code Compliant' : '⚠ Code Issues'}</p>
              <div className="grid grid-cols-2 gap-2 text-white">
                <div><span className="text-xs opacity-70">Risers</span><p className="text-responsive-lg font-bold">{result.risers}</p></div>
                <div><span className="text-xs opacity-70">Treads</span><p className="text-responsive-lg font-bold">{result.treads}</p></div>
                <div><span className="text-xs opacity-70">Riser H</span><p className="font-bold">{result.riserHeight.toFixed(2)}"</p></div>
                <div><span className="text-xs opacity-70">Tread D</span><p className="font-bold">{result.treadDepth.toFixed(2)}"</p></div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs text-gray-400">Total Run</span><p className="font-bold">{result.totalRun.toFixed(1)}"</p></div>
                <div><span className="text-xs text-gray-400">Angle</span><p className="font-bold">{result.angle}°</p></div>
                <div><span className="text-xs text-gray-400">Stringer</span><p className="font-bold">{result.stringerLength.toFixed(1)}"</p></div>
                <div><span className="text-xs text-gray-400">Rise + Run</span><p className="font-bold">{result.riseRunSum}"</p></div>
              </div>
            </div>

            {result.issues.length > 0 && (
              <div className="p-3 sm:p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-xs">
                {result.issues.map((issue, i) => <p key={i}>• {issue}</p>)}
              </div>
            )}
          </div>
        )}

        {result && result.error && (
          <div className="mt-3 sm:mt-4 p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-sm">{result.error}</div>
        )}
      </div>
    </div>
  );
}