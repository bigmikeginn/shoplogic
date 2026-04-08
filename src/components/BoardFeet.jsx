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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Board Feet Calculator</h2>
      <p className="text-sm text-gray-600 mb-4">Formula: (Qty × T × W × L) ÷ 144</p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Qty (e.g., 2, 1.5, or 1 1/2)"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Thickness (e.g., 0.75 or 3/4)"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Width (e.g., 6 or 5 1/2)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Length (e.g., 12 or 11 3/4)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
      >
        Calculate
      </button>

      {result > 0 && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md">
          <p className="text-sm text-gray-700">Board Feet:</p>
          <p className="text-3xl font-bold text-green-700">{result}</p>
        </div>
      )}
    </div>
  );
}
