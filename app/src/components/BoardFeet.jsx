import { useState, useCallback } from 'react';
import { calculateFromStrings } from '../utils/boardFeetCalculator';

export default function BoardFeet() {
  const [qty, setQty] = useState('1');
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateFromStrings(qty, thickness, width, length));
  }, [qty, thickness, width, length]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="form-compact">
        <input type="text" placeholder="Quantity" value={qty} onChange={(e) => setQty(e.target.value)} className="input-modern" />
        <input type="text" placeholder='Thickness (e.g. 4/4 or 1")' value={thickness} onChange={(e) => setThickness(e.target.value)} className="input-modern" />
        <input type="text" placeholder='Width (e.g. 6")' value={width} onChange={(e) => setWidth(e.target.value)} className="input-modern" />
        <input type="text" placeholder={"Length (e.g. 8' or 96\")"} value={length} onChange={(e) => setLength(e.target.value)} className="input-modern" />
      </div>

      <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate Board Feet</button>

      {result && !result.error && (
        <div className="result-card-highlight mt-3 sm:mt-4">
          <p className="text-xs text-amber-400/60 mb-1">Board Feet</p>
          <p className="text-3xl font-bold text-amber-400 gold-glow-text">{result.totalBF} BF</p>
          <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-white">
            <div><span className="text-gray-500">Pieces</span><p>{result.pieces}</p></div>
            <div><span className="text-gray-500">Thickness</span><p>{result.thicknessText}</p></div>
            <div><span className="text-gray-500">Width</span><p>{result.width}"</p></div>
            <div><span className="text-gray-500">Length</span><p>{result.length}"</p></div>
          </div>
        </div>
      )}
      {result && result.error && (
        <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>
      )}
    </div>
  );
}