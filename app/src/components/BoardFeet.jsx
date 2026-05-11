import { useState, useCallback } from 'react';
import { calculateFromStrings } from '../utils/boardFeetCalculator';
import BoardFeetIllustration from './BoardFeetIllustration';

export default function BoardFeet() {
  const [qty, setQty] = useState('1');
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [pricePerBF, setPricePerBF] = useState('');
  const [wastePercentage, setWastePercentage] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    const baseResult = calculateFromStrings(qty, thickness, width, length);
    const enrichedResult = {
      ...baseResult,
      pricePerBF: parseFloat(pricePerBF) || 0,
      wastePercentage: parseFloat(wastePercentage) || 0
    };
    setResult(enrichedResult);
  }, [qty, thickness, width, length, pricePerBF, wastePercentage]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="form-compact">
        <input type="text" placeholder="Quantity" value={qty} onChange={(e) => setQty(e.target.value)} className="input-modern" />
        <input type="text" placeholder='Thickness (e.g. 4/4 or 1")' value={thickness} onChange={(e) => setThickness(e.target.value)} className="input-modern" />
        <input type="text" placeholder='Width (e.g. 6")' value={width} onChange={(e) => setWidth(e.target.value)} className="input-modern" />
        <input type="text" placeholder={"Length (e.g. 8' or 96\")"} value={length} onChange={(e) => setLength(e.target.value)} className="input-modern" />
        <input type="number" placeholder="Price per BF (optional)" value={pricePerBF} onChange={(e) => setPricePerBF(e.target.value)} className="input-modern" step="0.01" min="0" />
        <input type="number" placeholder="Waste % (optional)" value={wastePercentage} onChange={(e) => setWastePercentage(e.target.value)} className="input-modern" step="0.1" min="0" max="100" />
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate Board Feet</button>

      {result && !result.error && (
        <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <div className="result-card-highlight">
            <p className="text-xs text-amber-400/60 mb-1">Board Feet</p>
            <p className="text-3xl font-bold text-amber-400 gold-glow-text">{result.totalBF} BF</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-white">
              <div><span className="text-gray-500">Pieces</span><p>{result.pieces}</p></div>
              <div><span className="text-gray-500">Thickness</span><p>{result.thicknessText}</p></div>
              <div><span className="text-gray-500">Width</span><p>{result.width}"</p></div>
              <div><span className="text-gray-500">Length</span><p>{result.length}"</p></div>
            </div>
          </div>

          {result.pricePerBF > 0 && (
            <div className="result-card">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Base Cost</p>
                  <p className="text-xl font-bold text-white">${(result.totalBF * result.pricePerBF).toFixed(2)}</p>
                  <p className="text-xs text-gray-600 mt-1">${result.pricePerBF.toFixed(2)}/BF</p>
                </div>
                {result.wastePercentage > 0 && (
                  <>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Waste Allowance</p>
                      <p className="text-xl font-bold text-amber-400">${(result.totalBF * result.pricePerBF * result.wastePercentage / 100).toFixed(2)}</p>
                      <p className="text-xs text-amber-600 mt-1">{result.wastePercentage.toFixed(1)}% of base</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Total Cost (with waste)</p>
                      <p className="text-2xl font-bold text-amber-400 gold-glow-text">${(result.totalBF * result.pricePerBF * (1 + result.wastePercentage / 100)).toFixed(2)}</p>
                      <p className="text-xs text-gray-600 mt-1">{(result.totalBF * (1 + result.wastePercentage / 100)).toFixed(2)} BF total needed</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {result && result.error && (
        <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>
      )}

      <BoardFeetIllustration />
    </div>
  );
}