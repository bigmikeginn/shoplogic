import { useState, useCallback } from 'react';
import { solveTriangle, SOLVE_MODES } from '../utils/triangleSolver';
import TriangleSolverIllustration from './TriangleSolverIllustration';

export default function TriangleSolver() {
  const [mode, setMode] = useState('sss');
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleSolve = useCallback(() => {
    setResult(solveTriangle(mode, inputs));
  }, [mode, inputs]);

  const updateInput = (field, value) => setInputs(prev => ({ ...prev, [field]: value }));
  const currentMode = SOLVE_MODES.find(m => m.id === mode);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-wrap gap-1 mb-3">
        {SOLVE_MODES.map(m => (
          <button key={m.id} onClick={() => { setMode(m.id); setResult(null); setInputs({}); }} className={`px-2 py-1 text-xs rounded ${mode === m.id ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{m.label}</button>
        ))}
      </div>

      <div className="form-compact">
        {currentMode?.fields.map(f => (
          <input key={f} type="text" placeholder={f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} value={inputs[f] || ''} onChange={(e) => updateInput(f, e.target.value)} className="input-modern" />
        ))}
      </div>

      <button onClick={handleSolve} className="btn-gold w-full mt-3 sm:mt-4">Solve</button>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center"><span className="text-xs text-amber-400/60">Side a</span><p className="font-bold text-amber-400">{result.sides.a}</p></div>
              <div className="text-center"><span className="text-xs text-amber-400/60">Side b</span><p className="font-bold text-amber-400">{result.sides.b}</p></div>
              <div className="text-center"><span className="text-xs text-amber-400/60">Side c</span><p className="font-bold text-amber-400">{result.sides.c}</p></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center"><span className="text-xs text-amber-400/60">∠ A</span><p className="font-bold text-amber-400">{result.angles.A}°</p></div>
              <div className="text-center"><span className="text-xs text-amber-400/60">∠ B</span><p className="font-bold text-amber-400">{result.angles.B}°</p></div>
              <div className="text-center"><span className="text-xs text-amber-400/60">∠ C</span><p className="font-bold text-amber-400">{result.angles.C}°</p></div>
            </div>
            <div className="flex gap-2 mt-2 justify-center">
              {result.isRight && <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Right</span>}
              {result.isEquilateral && <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Equilateral</span>}
              {result.isIsosceles && !result.isEquilateral && <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Isosceles</span>}
            </div>
          </div>

          <div className="result-card">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-xs text-gray-500">Area</span><p className="font-bold text-white">{result.area}</p></div>
              <div><span className="text-xs text-gray-500">Perimeter</span><p className="font-bold text-white">{result.perimeter}</p></div>
              <div><span className="text-xs text-gray-500">Inradius</span><p className="font-bold text-white">{result.inradius}</p></div>
              <div><span className="text-xs text-gray-500">Circumradius</span><p className="font-bold text-white">{result.circumradius}</p></div>
            </div>
          </div>

          <div className="result-card">
            <p className="text-xs text-gray-500 mb-1">Heights (altitudes)</p>
            <div className="flex justify-between text-xs"><span className="text-gray-500">hₐ (to side a)</span><span className="text-white">{result.heights.hA}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">hᵦ (to side b)</span><span className="text-white">{result.heights.hB}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">h꜀ (to side c)</span><span className="text-white">{result.heights.hC}</span></div>
          </div>
        </div>
      )}

      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
      <TriangleSolverIllustration />
    </div>
  );
}