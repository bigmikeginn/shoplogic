import { useState } from 'react';
import {
  calculateDovetailSpacing,
  calculateMortiseSpacing,
  calculateTenonSpacing,
  calculateShelfPinSpacing,
} from '../utils/joinerySpacing';

export default function JoinerySpacing() {
  const [type, setType] = useState('dovetail'); // 'dovetail', 'mortise', 'tenon', 'shelf'
  const [length, setLength] = useState('');
  const [quantity, setQuantity] = useState('');
  const [width, setWidth] = useState('');
  const [gap, setGap] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    let res;

    switch (type) {
      case 'dovetail':
        res = calculateDovetailSpacing(length, quantity, width);
        break;
      case 'mortise':
        res = calculateMortiseSpacing(length, quantity, width);
        break;
      case 'tenon':
        res = calculateTenonSpacing(length, quantity, width, gap);
        break;
      case 'shelf':
        res = calculateShelfPinSpacing(length, quantity);
        break;
      default:
        res = null;
    }

    setResult(res);
  };

  const COLORS = {
    space: '#e5e7eb',
    tail: '#3b82f6',
    mortise: '#ef4444',
    tenon: '#10b981',
    gap: '#f3f4f6',
    pin: '#8b5cf6',
    edge: '#6b7280',
  };

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Joinery Spacer</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Calculate even spacing for dovetails, mortises, and more</p>

        <div className="form-compact">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setResult(null);
            }}
            className="input-modern"
          >
            <option value="dovetail">Dovetails</option>
            <option value="mortise">Mortises</option>
            <option value="tenon">Tenons</option>
            <option value="shelf">Shelf Pins</option>
          </select>

          <input
            type="number"
            step="0.1"
            placeholder="Length (in)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="input-modern"
          />

          <input
            type="number"
            min="1"
            placeholder={type === 'shelf' ? 'Number of Pins' : 'Quantity'}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input-modern"
          />

          {type !== 'shelf' && (
            <input
              type="number"
              step="0.1"
              placeholder={`${type === 'dovetail' ? 'Tail' : type === 'mortise' ? 'Mortise' : 'Tenon'} Width (in)`}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="input-modern"
            />
          )}

          {type === 'tenon' && (
            <input
              type="number"
              step="0.1"
              placeholder="Gap Width (in)"
              value={gap}
              onChange={(e) => setGap(e.target.value)}
              className="input-modern"
            />
          )}

          <button
            onClick={handleCalculate}
            className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
          >
            Calculate
          </button>

          {result && !result.error && (
            <div className="p-3 sm:p-4 rounded bg-gradient-to-br from-blue-500 to-cyan-600 border border-blue-400">
              <p className="text-xs font-semibold text-blue-100 mb-2">Spacing:</p>
              {result.spaceWidth && (
                <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.spaceWidth}"</p>
              )}
              {result.totalWidth && (
                <p className="text-xs text-blue-100 mt-1">Total: {result.totalWidth}"</p>
              )}
            </div>
          )}

          {result?.error && (
            <div className="p-3 sm:p-4 rounded bg-gradient-to-br from-red-500 to-pink-600 border border-red-400 text-xs text-red-100">
              {result.error}
            </div>
          )}
        </div>

        {/* Visualization */}
        {result && result.layout && (
          <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gray-800 bg-opacity-50 rounded border border-gray-700">
            <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white mb-3">Layout Diagram</h3>

            {/* SVG Layout */}
            <div className="bg-gray-900 p-3 sm:p-4 rounded mb-3 overflow-x-auto">
              <svg
                width="100%"
                height="80"
                viewBox={`0 0 ${length * 80} 100`}
                className="min-w-full"
              >
                {/* Scale ruler */}
                <line x1="0" y1="10" x2={length * 80} y2="10" stroke="#6b7280" strokeWidth="1" />
                <text x="-30" y="35" fontSize="10" fill="#aaa">
                  0"
                </text>
                <text x={length * 80 - 30} y="35" fontSize="10" fill="#aaa">
                  {length}"
                </text>

                {/* Layout elements */}
                {result.layout.map((element, idx) => {
                  const x = parseFloat(element.position) * 80;
                  const w = parseFloat(element.width) * 80;
                  const color = COLORS[element.type] || '#ccc';

                  return (
                    <g key={idx}>
                      <rect
                        x={x}
                        y="25"
                        width={w}
                        height="50"
                        fill={color}
                        stroke="#374151"
                        strokeWidth="1"
                      />
                      <text
                        x={x + w / 2}
                        y="62"
                        fontSize="10"
                        textAnchor="middle"
                        fill="#1f2937"
                        fontWeight="bold"
                      >
                        {element.width || ''}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Table */}
            <div className="overflow-x-auto text-xs">
              <table className="w-full border-collapse">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="border border-gray-600 p-2 text-left text-gray-200">Position</th>
                    <th className="border border-gray-600 p-2 text-left text-gray-200">Type</th>
                    <th className="border border-gray-600 p-2 text-right text-gray-200">Width</th>
                  </tr>
                </thead>
                <tbody>
                  {result.layout.map((el, idx) => (
                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700 hover:bg-opacity-50">
                      <td className="border border-gray-600 p-2 text-gray-300">{el.position}"</td>
                      <td className="border border-gray-600 p-2 capitalize font-medium text-blue-400">{el.type}</td>
                      <td className="border border-gray-600 p-2 text-right text-gray-300">{el.width || el.index || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
