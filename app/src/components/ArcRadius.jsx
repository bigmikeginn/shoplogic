import { useState, useCallback } from 'react';
import { arcFromChordRise, arcFromChordRadius, arcFromRadiusAngle, bentLaminationPlies } from '../utils/arcRadiusCalculator';

const INPUT_MODES = [
  { id: 'chord-rise', label: 'Chord + Rise', fn: arcFromChordRise },
  { id: 'chord-radius', label: 'Chord + Radius', fn: arcFromChordRadius },
  { id: 'radius-angle', label: 'Radius + Angle', fn: arcFromRadiusAngle },
];

export default function ArcRadius() {
  const [mode, setMode] = useState('chord-rise');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [plyThickness, setPlyThickness] = useState('0.125');
  const [result, setResult] = useState(null);

  const labels = {
    'chord-rise': ['Chord (in)', 'Rise (in)'],
    'chord-radius': ['Chord (in)', 'Radius (in)'],
    'radius-angle': ['Radius (in)', 'Angle (°)'],
  };

  const handleCalculate = useCallback(() => {
    const modeObj = INPUT_MODES.find((m) => m.id === mode);
    if (!modeObj) return;
    setResult(modeObj.fn(input1, input2));
  }, [mode, input1, input2]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="flex rounded-lg overflow-hidden mb-3 border border-white/[0.08]">
        {INPUT_MODES.map((m) => (
          <button key={m.id} onClick={() => { setMode(m.id); setResult(null); }} className={`flex-1 py-2 text-xs font-medium transition-colors ${mode === m.id ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{m.label}</button>
        ))}
      </div>

      <div className="form-compact">
        <input type="text" placeholder={labels[mode][0]} value={input1} onChange={(e) => setInput1(e.target.value)} className="input-modern" />
        <input type="text" placeholder={labels[mode][1]} value={input2} onChange={(e) => setInput2(e.target.value)} className="input-modern" />
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate</button>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-xs text-amber-400/60">Radius</span><p className="font-bold text-amber-400">{result.radius}"</p></div>
              <div><span className="text-xs text-amber-400/60">Angle</span><p className="font-bold text-amber-400">{result.angle}°</p></div>
              <div><span className="text-xs text-amber-400/60">Arc Length</span><p className="font-bold text-amber-400">{result.arcLength}"</p></div>
              <div><span className="text-xs text-amber-400/60">Chord</span><p className="font-bold text-amber-400">{result.chord}"</p></div>
            </div>
          </div>

          <div className="result-card">
            <div className="grid grid-cols-3 gap-2">
              <div><span className="text-xs text-gray-500">Rise</span><p className="font-bold text-white">{result.rise}"</p></div>
              <div><span className="text-xs text-gray-500">Seg. Area</span><p className="font-bold text-white">{result.segmentArea} in²</p></div>
              <div><span className="text-xs text-gray-500">Chord H</span><p className="font-bold text-white">{result.chordHeight}"</p></div>
            </div>
            <div className="mt-2 pt-2 border-t border-white/[0.06] text-xs text-gray-500">
              <p>Full circle: ∅ {((result.radius || 0) * 2).toFixed(3)}" · Circum. {result.circumference}" · Area {result.circleArea} in²</p>
            </div>
          </div>

          {/* Bent lamination helper */}
          <div className="result-card">
            <p className="text-xs text-amber-400 font-medium mb-2">Bent Lamination</p>
            <div className="flex items-center gap-2">
              <input type="text" value={plyThickness} onChange={(e) => setPlyThickness(e.target.value)} placeholder="Ply thickness" className="flex-1 input-modern text-xs" />
              <span className="text-xs text-gray-500">"</span>
            </div>
            {(() => {
              const lam = bentLaminationPlies(result.radius, 0.75, parseFloat(plyThickness) || 0.125);
              if (lam.error) return null;
              return (
                <div className="mt-2 text-xs text-gray-300">
                  <p>{lam.pliesNeeded} plies of {lam.plyThickness}" = {lam.actualThickness}" total</p>
                  {!lam.isFeasible && <p className="text-red-400 mt-1">{lam.tip}</p>}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}