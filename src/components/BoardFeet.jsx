import { useState, useCallback } from 'react';
import { calculateFromStrings } from '../utils/boardFeetCalculator';

export default function BoardFeet() {
  const [qty, setQty] = useState('1');
  const [thickness, setThickness] = useState('0.75');
  const [width, setWidth] = useState('6');
  const [length, setLength] = useState('12');
  const [result, setResult] = useState(0);

  const handleCalculate = useCallback(() => {
    const boardFeet = calculateFromStrings(qty, thickness, width, length);
    setResult(boardFeet);
  }, [qty, thickness, width, length]);

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto scrollbar-styled flex items-start justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl">
        <h2 className="text-responsive-2xl font-bold mb-2 text-white">Board Feet Calculator</h2>
        <p className="text-responsive-base text-gray-300 mb-6 sm:mb-8">Formula: (Qty × T × W × L) ÷ 144</p>

        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Qty (e.g., 2, 1.5, or 1 1/2)"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="input-modern text-responsive-base"
          />
          <input
            type="text"
            placeholder="Thickness (e.g., 0.75 or 3/4)"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="input-modern text-responsive-base"
          />
          <input
            type="text"
            placeholder="Width (e.g., 6 or 5 1/2)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="input-modern text-responsive-base"
          />
          <input
            type="text"
            placeholder="Length (e.g., 12 or 11 3/4)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="input-modern text-responsive-base"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 sm:py-4 rounded-lg hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-responsive-lg"
        >
          Calculate
        </button>

        {result > 0 && (
          <div className="mt-6 sm:mt-8 p-6 sm:p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg border border-green-400">
            <p className="text-responsive-base text-green-100 mb-2">Board Feet:</p>
            <p className="text-responsive-2xl font-bold text-white">{result.toFixed(3)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
