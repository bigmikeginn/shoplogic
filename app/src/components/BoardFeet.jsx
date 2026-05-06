import { useState, useCallback } from 'react';
import { calculateFromStrings } from '../utils/boardFeetCalculator';

export default function BoardFeet() {
  const [qty, setQty] = useState('');
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [result, setResult] = useState(0);

  const handleCalculate = useCallback(() => {
    const boardFeet = calculateFromStrings(qty, thickness, width, length);
    setResult(boardFeet);
  }, [qty, thickness, width, length]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Board Feet Calculator</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Formula: (Qty × T × W × L) ÷ 144</p>

        <div className="form-compact">
          <input
            type="text"
            placeholder="Qty (e.g., 2, 1.5, or 1 1/2)"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="input-modern"
          />
          <input
            type="text"
            placeholder="Thickness (e.g., 0.75 or 3/4)"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="input-modern"
          />
          <input
            type="text"
            placeholder="Width (e.g., 6 or 5 1/2)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="input-modern"
          />
          <input
            type="text"
            placeholder="Length (e.g., 12 or 11 3/4)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="input-modern"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
        >
          Calculate
        </button>

        {result > 0 && (
          <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded shadow-lg border border-green-400">
            <p className="text-responsive-sm sm:text-responsive-base text-green-100 mb-1">Board Feet:</p>
            <p className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold text-white">{result.toFixed(3)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
