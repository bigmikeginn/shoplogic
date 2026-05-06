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
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Bolt Circle</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">PCD chord spacing & hole coordinates</p>

        <div className="form-compact">
          <input type="text" placeholder="Number of holes" value={holes} onChange={(e) => setHoles(e.target.value)} className="input-modern" />
          <input type="text" placeholder="PCD (in or mm)" value={pcd} onChange={(e) => setPcd(e.target.value)} className="input-modern" />
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {COMMON_PATTERNS.map(p => (
            <button key={p.label} onClick={() => { setHoles(p.holes.toString()); setPcd(p.pcd.toString()); setResult(null); }} className="px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
              {p.label}
            </button>
          ))}
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded shadow-lg border border-cyan-400 text-white">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs opacity-70">Chord Spacing</span><p className="text-responsive-lg font-bold">{result.chord}</p></div>
                <div><span className="text-xs opacity-70">Angle</span><p className="text-responsive-lg font-bold">{result.angle}°</p></div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <p className="text-xs text-gray-400 mb-2">Hole Coordinates (0° at top)</p>
              <div className="grid grid-cols-6 gap-1 text-xs">
                <div className="text-gray-500 col-span-1 text-center">#</div>
                <div className="text-gray-500 col-span-2 text-center">X</div>
                <div className="text-gray-500 col-span-3 text-center">Y</div>
                {result.coordinates.map(c => (
                  <>
                    <div key={`h-${c.hole}`} className="text-gray-400 text-center">{c.hole}</div>
                    <div className="col-span-2 text-right font-mono">{c.x}</div>
                    <div className="col-span-3 text-right font-mono">{c.y}</div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {result && result.error && <div className="mt-3 sm:mt-4 p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-sm">{result.error}</div>}
      </div>
    </div>
  );
}