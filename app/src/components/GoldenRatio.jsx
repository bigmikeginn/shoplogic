import { useState, useCallback } from 'react';
import { calculateGoldenLinear, calculateGoldenArea, decimalToFractionString } from '../utils/goldenRatio';
import GoldenRatioIllustration from './GoldenRatioIllustration';

export default function GoldenRatio() {
  const [input1, setInput1] = useState('');
  const [mode, setMode] = useState('linear');
  const [denominator, setDenominator] = useState(16);
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    let r;
    if (mode === 'linear') r = calculateGoldenLinear(parseFloat(input1) || 0);
    else r = calculateGoldenArea(parseFloat(input1) || 0);
    if (r) {
      const shorterFrac = decimalToFractionString(r.smaller, denominator);
      const longerFrac = decimalToFractionString(r.larger, denominator);
      r.fractions = { shorter: shorterFrac, longer: longerFrac };
    }
    setResult(r);
  }, [input1, mode, denominator]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="flex rounded-lg overflow-hidden mb-3 border border-white/[0.08]">
        {['linear', 'area'].map((m) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); }} className={`flex-1 py-2 text-xs font-medium transition-colors ${mode === m ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
        ))}
      </div>

      <input type="text" placeholder={mode === 'linear' ? 'Dimension (in)' : 'Area (sq in)'} value={input1} onChange={(e) => setInput1(e.target.value)} className="input-modern mb-3" />

      <div className="flex gap-1 mb-3">
        {[2, 4, 8, 16, 32, 64].map((d) => (
          <button key={d} onClick={() => setDenominator(d)} className={`flex-1 py-1 text-xs rounded ${denominator === d ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>1/{d}</button>
        ))}
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full">Calculate φ</button>

      {result && (
        <div className="result-card-highlight mt-3 sm:mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-xs text-amber-400/60">Shorter</span><p className="text-xl font-bold text-amber-400">{result.smaller}"</p></div>
            <div><span className="text-xs text-amber-400/60">Longer</span><p className="text-xl font-bold text-amber-400">{result.larger}"</p></div>
          </div>
          {result.fractions && (
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              {result.fractions.shorter && <span>≈ {result.fractions.shorter}"</span>}
              {result.fractions.longer && <span>≈ {result.fractions.longer}"</span>}
            </div>
          )}
        </div>
      )}
      {input1 && !parseFloat(input1) && (
        <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">Enter a valid number.</div>
      )}
      <GoldenRatioIllustration />
    </div>
  );
}