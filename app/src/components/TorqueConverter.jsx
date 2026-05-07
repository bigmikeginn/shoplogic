import { useState, useCallback } from 'react';
import { convertTorque, TORQUE_UNITS, TORQUE_PRESETS } from '../utils/torqueConverter';
import CustomSelect from './CustomSelect';

export default function TorqueConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('ft-lbs');
  const [result, setResult] = useState(null);

  const handleConvert = useCallback(() => {
    setResult(convertTorque(value, fromUnit));
  }, [value, fromUnit]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="flex gap-2 mb-3">
        <input type="text" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 input-modern" />
        <div className="w-24">
          <CustomSelect value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {TORQUE_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </CustomSelect>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {TORQUE_PRESETS.map(p => (
          <button key={p.label} onClick={() => { setValue(p.ftlbs.toString()); setFromUnit('ft-lbs'); setResult(null); }} className="px-2 py-0.5 text-xs rounded border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]">
            {p.label} ({p.ftlbs})
          </button>
        ))}
      </div>

      <button onClick={handleConvert} className="btn-gold w-full">Convert</button>

      {result && !result.error && (
        <div className="result-card-highlight mt-3">
          <div className="grid grid-cols-2 gap-3">
            <div><span className="text-xs text-amber-400/60">ft-lbs</span><p className="text-xl font-bold text-amber-400">{result.ftlbs}</p></div>
            <div><span className="text-xs text-amber-400/60">Nm</span><p className="text-xl font-bold text-amber-400">{result.nm}</p></div>
            <div><span className="text-xs text-amber-400/60">in-lbs</span><p className="text-xl font-bold text-amber-400">{result.inlbs}</p></div>
            <div><span className="text-xs text-amber-400/60">kg-m</span><p className="text-xl font-bold text-amber-400">{result.kgm}</p></div>
          </div>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}