import { useState, useCallback } from 'react';
import { calculateCost, WASTE_PRESETS, PRICE_TIERS } from '../utils/boardFootPricing';

export default function BoardFootPricing() {
  const [bf, setBf] = useState('');
  const [pricePerBf, setPricePerBf] = useState('');
  const [wastePercent, setWastePercent] = useState('20');
  const [taxPercent, setTaxPercent] = useState('0');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateCost(bf, pricePerBf, wastePercent, taxPercent));
  }, [bf, pricePerBf, wastePercent, taxPercent]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="form-compact">
        <input type="text" placeholder="Board Feet" value={bf} onChange={(e) => setBf(e.target.value)} className="input-modern" />
        <input type="text" placeholder="Price per BF ($)" value={pricePerBf} onChange={(e) => setPricePerBf(e.target.value)} className="input-modern" />
      </div>

      <div className="flex gap-1 mt-2 mb-2">
        {WASTE_PRESETS.slice(0, 5).map((w) => (
          <button key={w.value} onClick={() => setWastePercent(w.value.toString())} className={`flex-1 py-1 text-xs rounded ${parseFloat(wastePercent) === w.value ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}>{w.label}</button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {PRICE_TIERS.map((t) => (
          <button key={t.name} onClick={() => setPricePerBf(t.defaultPrice.toString())} className="px-2 py-0.5 text-xs rounded border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]">{t.name}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <input type="text" placeholder="Waste %" value={wastePercent} onChange={(e) => setWastePercent(e.target.value)} className="input-modern" />
        <input type="text" placeholder="Tax %" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} className="input-modern" />
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full">Calculate Cost</button>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <span className="text-xs text-amber-400/60">Total Cost</span>
            <p className="text-3xl font-bold text-amber-400 gold-glow-text">${result.total}</p>
          </div>
          <div className="result-card space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Board Feet</span><span className="text-white">{result.boardFeet} BF</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Waste ({result.wastePercent}%)</span><span className="text-white">{result.wasteBF} BF</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Total BF</span><span className="text-white">{result.totalBF} BF</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Material Cost</span><span className="text-white">${result.subtotal}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Waste Cost</span><span className="text-white">${result.wasteCost}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="text-white">${result.subtotalWithWaste}</span></div>
            {result.tax > 0 && <div className="flex justify-between"><span className="text-gray-500">Tax ({result.taxPercent}%)</span><span className="text-white">${result.tax}</span></div>}
            <div className="flex justify-between pt-2 border-t border-white/[0.06]"><span className="text-amber-400 font-medium">Effective Price</span><span className="text-amber-400">${result.effectivePriceBF}/BF</span></div>
          </div>
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}