import { useState, useCallback } from 'react';
import { calculateTapDrill, SAE_SIZES, METRIC_SIZES, THREAD_STANDARDS } from '../utils/tapDrillReference';
import TapDrillIllustration from './TapDrillIllustration';

export default function TapDrill() {
  const [standard, setStandard] = useState('SAE (Imperial)');
  const [boltDiam, setBoltDiam] = useState('');
  const [pitch, setPitch] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateTapDrill(boltDiam, pitch, standard));
  }, [boltDiam, pitch, standard]);

  const selectPreset = (size) => {
    setBoltDiam(size.boltDiam.toString());
    setPitch(standard === 'Metric' ? size.pitch.toString() : size.tpi.toString());
    setResult(null);
  };

  const sizes = standard === 'Metric' ? METRIC_SIZES : SAE_SIZES;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="flex rounded-lg overflow-hidden mb-3 border border-white/[0.08]">
        {THREAD_STANDARDS.map(s => (
          <button key={s} onClick={() => { setStandard(s); setResult(null); setBoltDiam(''); setPitch(''); }} className={`flex-1 py-2 text-xs font-medium transition-colors ${standard === s ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{s}</button>
        ))}
      </div>

      <div className="form-compact">
        <input type="text" placeholder={standard === 'Metric' ? 'Bolt diam (mm)' : 'Bolt diam (in)'} value={boltDiam} onChange={(e) => setBoltDiam(e.target.value)} className="input-modern" />
        <input type="text" placeholder={standard === 'Metric' ? 'Pitch (mm)' : 'TPI'} value={pitch} onChange={(e) => setPitch(e.target.value)} className="input-modern" />
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {sizes.map(s => (
          <button key={s.size} onClick={() => selectPreset(s)} className="px-2 py-0.5 text-xs rounded border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]">{s.label || s.size}</button>
        ))}
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate</button>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <p className="text-xs text-amber-400/60 mb-2">Tap Drill Size</p>
            <p className="text-3xl font-bold text-amber-400 gold-glow-text">{result.tapDrill}{result.unit}</p>
            {result.tapDrillFraction !== '—' && <p className="text-sm text-amber-400/60">≈ {result.tapDrillFraction}"</p>}
          </div>
          <div className="result-card">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-xs text-gray-500">Clearance Hole</span><p className="font-bold text-white">{result.clearanceDrill}{result.unit}</p></div>
              <div><span className="text-xs text-gray-500">Bolt Diam</span><p className="font-bold text-white">{result.boltDiam}{result.unit}</p></div>
            </div>
          </div>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
      <TapDrillIllustration />
    </div>
  );
}