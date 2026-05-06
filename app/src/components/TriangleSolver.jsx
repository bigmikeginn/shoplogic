import { useState, useCallback } from 'react';
import { solveTriangle, SOLVE_MODES } from '../utils/triangleSolver';

export default function TriangleSolver() {
  const [mode, setMode] = useState('sss');
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleSolve = useCallback(() => {
    setResult(solveTriangle(mode, inputs));
  }, [mode, inputs]);

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const currentMode = SOLVE_MODES.find(m => m.id === mode);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Triangle Solver</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Solve any triangle — sides, angles, area & more</p>

        {/* Mode selector */}
        <div className="flex flex-wrap gap-1 mb-3">
          {SOLVE_MODES.map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setResult(null); setInputs({}); }} className={`px-2 py-1 text-xs rounded ${mode === m.id ? 'bg-violet-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Input fields */}
        <div className="form-compact">
          {currentMode?.fields.map(f => (
            <input key={f} type="text" placeholder={f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} value={inputs[f] || ''} onChange={(e) => updateInput(f, e.target.value)} className="input-modern" />
          ))}
        </div>

        <button onClick={handleSolve} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Solve
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            {/* Sides & Angles */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-violet-500 to-purple-600 rounded shadow-lg border border-violet-400 text-white">
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center"><span className="text-xs opacity-70">Side a</span><p className="font-bold">{result.sides.a}</p></div>
                <div className="text-center"><span className="text-xs opacity-70">Side b</span><p className="font-bold">{result.sides.b}</p></div>
                <div className="text-center"><span className="text-xs opacity-70">Side c</span><p className="font-bold">{result.sides.c}</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center"><span className="text-xs opacity-70">∠ A</span><p className="font-bold">{result.angles.A}°</p></div>
                <div className="text-center"><span className="text-xs opacity-70">∠ B</span><p className="font-bold">{result.angles.B}°</p></div>
                <div className="text-center"><span className="text-xs opacity-70">∠ C</span><p className="font-bold">{result.angles.C}°</p></div>
              </div>
              <div className="flex gap-2 mt-2 justify-center">
                {result.isRight && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Right</span>}
                {result.isEquilateral && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Equilateral</span>}
                {result.isIsosceles && !result.isEquilateral && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Isosceles</span>}
              </div>
            </div>

            {/* Area & Perimeter */}
            <div className="p-4 sm:p-5 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs text-gray-400">Area</span><p className="font-bold">{result.area}</p></div>
                <div><span className="text-xs text-gray-400">Perimeter</span><p className="font-bold">{result.perimeter}</p></div>
                <div><span className="text-xs text-gray-400">Inradius</span><p className="font-bold">{result.inradius}</p></div>
                <div><span className="text-xs text-gray-400">Circumradius</span><p className="font-bold">{result.circumradius}</p></div>
              </div>
            </div>

            {/* Heights */}
            <div className="p-3 sm:p-4 bg-gray-700 bg-opacity-30 rounded border border-gray-600 text-white">
              <p className="text-xs text-gray-400 mb-1">Heights (altitudes)</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">hₐ (to side a)</span><span>{result.heights.hA}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">hᵦ (to side b)</span><span>{result.heights.hB}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">h꜀ (to side c)</span><span>{result.heights.hC}</span>
              </div>
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