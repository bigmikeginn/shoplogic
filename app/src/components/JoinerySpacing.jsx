import { useState } from 'react';
import {
  calculateDovetailSpacing, calculateMortiseSpacing, calculateTenonSpacing, calculateShelfPinSpacing,
} from '../utils/joinerySpacing';

export default function JoinerySpacing() {
  const [type, setType] = useState('dovetail');
  const [length, setLength] = useState('');
  const [quantity, setQuantity] = useState('');
  const [width, setWidth] = useState('');
  const [gap, setGap] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    let res;
    switch (type) {
      case 'dovetail': res = calculateDovetailSpacing(length, quantity, width); break;
      case 'mortise': res = calculateMortiseSpacing(length, quantity, width); break;
      case 'tenon': res = calculateTenonSpacing(length, quantity, width, gap); break;
      case 'shelf': res = calculateShelfPinSpacing(length, quantity); break;
      default: res = null;
    }
    setResult(res);
  };

  const COLORS = { space: '#e5e7eb', tail: '#3b82f6', mortise: '#ef4444', tenon: '#10b981', gap: '#f3f4f6', pin: '#8b5cf6', edge: '#6b7280' };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="flex rounded-lg overflow-hidden mb-3 border border-white/[0.08]">
        {['dovetail', 'mortise', 'tenon', 'shelf'].map((t) => (
          <button key={t} onClick={() => { setType(t); setResult(null); }} className={`flex-1 py-2 text-xs font-medium transition-colors ${type === t ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      <div className="form-compact">
        <input type="text" placeholder="Board Length (in)" value={length} onChange={(e) => setLength(e.target.value)} className="input-modern" />
        <input type="text" placeholder={type === 'shelf' ? 'Number of Holes' : '# of Joints'} value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input-modern" />
        {type !== 'shelf' && <input type="text" placeholder="Joint Width (in)" value={width} onChange={(e) => setWidth(e.target.value)} className="input-modern" />}
        {type === 'tenon' && <input type="text" placeholder="Gap (in)" value={gap} onChange={(e) => setGap(e.target.value)} className="input-modern" />}
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate</button>

      {result && !result.error && (
        <div className="result-card-highlight mt-3 sm:mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-xs text-amber-400/60">Spacing</span><p className="text-xl font-bold text-amber-400">{result.spacing}"</p></div>
            <div><span className="text-xs text-amber-400/60">End Offset</span><p className="text-xl font-bold text-amber-400">{result.endOffset}"</p></div>
          </div>
          <div className="mt-3">
            <div className="flex h-4 rounded overflow-hidden">
              {result.positions?.map((pos, i) => (
                <div key={i} className="h-full" style={{ width: `${(pos.width / result.totalLength) * 100}%`, backgroundColor: COLORS[pos.type] || '#374151', flexShrink: 0 }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              {Object.entries(COLORS).map(([key, color]) => (
                <span key={key} className="flex items-center gap-1 text-gray-400"><span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} /> {key}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}