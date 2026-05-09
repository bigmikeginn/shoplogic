import { useState, useCallback } from 'react';
import { calculateCompoundMiter } from '../utils/compoundMiterCalculator';
import CompoundMiterIllustration from './CompoundMiterIllustration';

export default function CompoundMiter() {
  const [springAngle, setSpringAngle] = useState('38');
  const [wallAngle, setWallAngle] = useState('90');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateCompoundMiter(springAngle, wallAngle));
  }, [springAngle, wallAngle]);

  const springPresets = [38, 45, 52];
  const wallPresets = [90, 120, 135];

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="space-y-3">
        <div>
          <span className="text-xs text-gray-500 block mb-1">Spring Angle</span>
          <div className="flex gap-1 mb-2">
            {springPresets.map((a) => (
              <button key={a} onClick={() => setSpringAngle(a.toString())} className={`flex-1 py-1 text-xs rounded ${parseFloat(springAngle) === a ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{a}°</button>
            ))}
          </div>
          <input type="text" placeholder="Custom spring angle" value={springAngle} onChange={(e) => setSpringAngle(e.target.value)} className="input-modern" />
        </div>
        <div>
          <span className="text-xs text-gray-500 block mb-1">Wall Angle</span>
          <div className="flex gap-1 mb-2">
            {wallPresets.map((a) => (
              <button key={a} onClick={() => setWallAngle(a.toString())} className={`flex-1 py-1 text-xs rounded ${parseFloat(wallAngle) === a ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{a}°</button>
            ))}
          </div>
          <input type="text" placeholder="Custom wall angle" value={wallAngle} onChange={(e) => setWallAngle(e.target.value)} className="input-modern" />
        </div>
        <button onClick={handleCalculate} className="btn-gold w-full">Calculate Saw Settings</button>
      </div>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="result-card-highlight"><span className="text-xs text-amber-400/60">Miter Angle</span><p className="text-xl font-bold text-amber-400">{result.miterAngle}°</p></div>
            <div className="result-card-highlight"><span className="text-xs text-amber-400/60">Bevel Angle</span><p className="text-xl font-bold text-amber-400">{result.bevelAngle}°</p></div>
          </div>
          <div className="result-card text-xs text-gray-400 text-center">Set miter to {result.miterAngle}° and bevel to {result.bevelAngle}°</div>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
      <CompoundMiterIllustration />
    </div>
  );
}