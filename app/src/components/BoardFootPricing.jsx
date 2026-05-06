import { useState, useCallback } from 'react';
import { calculateCost, budgetToBF, WASTE_PRESETS, PRICE_TIERS } from '../utils/boardFootPricing';

export default function BoardFootPricing() {
  const [boardFeet, setBoardFeet] = useState('');
  const [pricePerBF, setPricePerBF] = useState('');
  const [wastePercent, setWastePercent] = useState(20);
  const [taxPercent, setTaxPercent] = useState(0);
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateCost(boardFeet, pricePerBF, wastePercent, taxPercent));
  }, [boardFeet, pricePerBF, wastePercent, taxPercent]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Board Foot Pricing</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Calculate total cost including waste & tax</p>

        <div className="form-compact">
          <input type="text" placeholder="Board feet needed" value={boardFeet} onChange={(e) => setBoardFeet(e.target.value)} className="input-modern" />
          <input type="text" placeholder="Price per BF ($)" value={pricePerBF} onChange={(e) => setPricePerBF(e.target.value)} className="input-modern" />
        </div>

        {/* Price tier quick picks */}
        <div className="flex flex-wrap gap-1 mt-2">
          {PRICE_TIERS.map((tier) => (
            <button key={tier.name} onClick={() => setPricePerBF(tier.defaultPrice.toString())} className="px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600" title={tier.range}>
              {tier.name.split(' ')[0]} (${tier.defaultPrice})
            </button>
          ))}
        </div>

        {/* Waste */}
        <div className="mt-3">
          <label className="block text-xs text-gray-400 mb-1">Waste Factor</label>
          <div className="flex flex-wrap gap-1">
            {WASTE_PRESETS.map((w) => (
              <button key={w.value} onClick={() => setWastePercent(w.value)} className={`px-2 py-0.5 text-xs rounded ${wastePercent === w.value ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tax */}
        <div className="mt-3">
          <label className="block text-xs text-gray-400 mb-1">Sales Tax %</label>
          <input type="text" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} placeholder="0" className="input-modern" />
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate Cost
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded shadow-lg border border-green-400 text-white">
              <p className="text-xs text-white/70 mb-1">Total Cost</p>
              <p className="text-responsive-xl lg:text-responsive-2xl font-bold">${result.total.toFixed(2)}</p>
              <p className="text-xs text-white/60 mt-1">Effective: ${result.effectivePriceBF.toFixed(2)}/BF (with waste & tax)</p>
            </div>

            <div className="p-4 sm:p-5 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Material</span><span>{result.boardFeet} BF @ ${result.pricePerBF}/BF</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>${result.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Waste ({result.wastePercent}%)</span><span>{result.wasteBF} BF — ${result.wasteCost.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">With Waste</span><span>{result.totalBF} BF — ${result.subtotalWithWaste.toFixed(2)}</span></div>
                {result.tax > 0 && (
                  <div className="flex justify-between"><span className="text-gray-400">Tax ({result.taxPercent}%)</span><span>${result.tax.toFixed(2)}</span></div>
                )}
                <hr className="border-gray-600" />
                <div className="flex justify-between font-bold"><span>Total</span><span>${result.total.toFixed(2)}</span></div>
              </div>
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