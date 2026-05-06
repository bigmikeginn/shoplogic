import { useState, useCallback } from 'react';
import {
  arcFromChordRise,
  arcFromChordRadius,
  arcFromRadiusAngle,
  bentLaminationPlies,
} from '../utils/arcRadiusCalculator';

const INPUT_MODES = [
  { id: 'chord-rise', label: 'Chord + Rise' },
  { id: 'chord-radius', label: 'Chord + Radius' },
  { id: 'radius-angle', label: 'Radius + Angle' },
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
    let r;
    if (mode === 'chord-rise') r = arcFromChordRise(input1, input2);
    else if (mode === 'chord-radius') r = arcFromChordRadius(input1, input2);
    else if (mode === 'radius-angle') r = arcFromRadiusAngle(input1, input2);
    setResult(r);
  }, [mode, input1, input2]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Arc & Radius</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Chord, rise, radius, arc length, and segment area</p>

        {/* Mode selector */}
        <div className="flex rounded-lg overflow-hidden mb-3 sm:mb-4 border border-gray-600">
          {INPUT_MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setResult(null); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-medium transition-colors ${mode === m.id ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="form-compact">
          <input type="text" placeholder={labels[mode][0]} value={input1} onChange={(e) => setInput1(e.target.value)} className="input-modern" />
          <input type="text" placeholder={labels[mode][1]} value={input2} onChange={(e) => setInput2(e.target.value)} className="input-modern" />
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded shadow-lg border border-cyan-400 text-white">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs opacity-70">Radius</span><p className="font-bold">{result.radius}"</p></div>
                <div><span className="text-xs opacity-70">Angle</span><p className="font-bold">{result.angle}°</p></div>
                <div><span className="text-xs opacity-70">Arc Length</span><p className="font-bold">{result.arcLength}"</p></div>
                <div><span className="text-xs opacity-70">Chord</span><p className="font-bold">{result.chord}"</p></div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <div className="grid grid-cols-3 gap-2">
                <div><span className="text-xs text-gray-400">Rise</span><p className="font-bold">{result.rise}"</p></div>
                <div><span className="text-xs text-gray-400">Seg. Area</span><p className="font-bold">{result.segmentArea} in²</p></div>
                <div><span className="text-xs text-gray-400">Chord H</span><p className="font-bold">{result.chordHeight}"</p></div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
                <p>Full circle: ∅ {((result.radius || 0) * 2).toFixed(3)}" · Circum. {result.circumference}" · Area {result.circleArea} in²</p>
              </div>
            </div>

            {/* Bent lamination helper */}
            <div className="p-3 sm:p-4 bg-cyan-900 bg-opacity-30 rounded border border-cyan-700">
              <p className="text-xs text-cyan-300 font-medium mb-2">Bent Lamination</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={plyThickness}
                  onChange={(e) => setPlyThickness(e.target.value)}
                  placeholder="Ply thickness"
                  className="flex-1 p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-xs text-gray-400">"</span>
              </div>
              {(() => {
                const lam = bentLaminationPlies(result.radius, 0.75, parseFloat(plyThickness) || 0.125);
                if (lam.error) return null;
                return (
                  <div className="mt-2 text-xs text-cyan-200">
                    <p>{lam.pliesNeeded} plies of {lam.plyThickness}" = {lam.actualThickness}" total</p>
                    {!lam.isFeasible && <p className="text-red-300 mt-1">{lam.tip}</p>}
                  </div>
                );
              })()}
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