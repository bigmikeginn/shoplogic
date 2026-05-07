import { useState } from 'react';
import { convert, getConversionsByCategory } from '../utils/converter';
import CustomSelect from './CustomSelect';

const CATEGORIES = ['length', 'area', 'volume', 'weight', 'temperature'];

export default function MetricConverter() {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('');
  const [selectedConversion, setSelectedConversion] = useState(0);
  const [result, setResult] = useState(null);

  const conversions = getConversionsByCategory()[category];

  const handleCalculate = () => {
    const conv = conversions[selectedConversion];
    if (!conv) return;
    const res = convert(value, conv.from, conv.to);
    setResult({ ...conv, value: parseFloat(value), result: res });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div>
        <label className="text-xs font-medium text-gray-400 block mb-2">Category</label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setSelectedConversion(0); setResult(null); }}
              className={`py-1.5 px-2 rounded text-xs font-medium transition ${category === cat ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <CustomSelect value={selectedConversion} onChange={(e) => setSelectedConversion(parseInt(e.target.value))} className="mb-3">
          {conversions.map((conv, idx) => <option key={idx} value={idx}>{conv.label}</option>)}
        </CustomSelect>

        <div className="flex gap-2 mb-3">
          <input type="number" step="0.01" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} className="input-modern flex-1" />
          <span className="py-2.5 px-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs text-gray-400 whitespace-nowrap">{conversions[selectedConversion]?.from}</span>
        </div>

        <button onClick={handleCalculate} className="btn-gold w-full">Convert</button>

        {result && (
          <div className="result-card-highlight mt-3 space-y-3">
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <p className="text-xs text-gray-500">From</p>
              <p className="text-lg font-bold text-white">{result.value} {result.from}</p>
            </div>
            <div className="text-center text-gray-500 text-sm">↓</div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <p className="text-xs text-gray-500">To</p>
              <p className="text-lg font-bold text-amber-400 gold-glow-text">{result.result.toFixed(4)} {result.to}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}