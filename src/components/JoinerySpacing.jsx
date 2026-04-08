import { useState } from 'react';
import {
  calculateDovetailSpacing,
  calculateMortiseSpacing,
  calculateTenonSpacing,
  calculateShelfPinSpacing,
} from '../utils/joinerySpacing';

export default function JoinerySpacing() {
  const [type, setType] = useState('dovetail'); // 'dovetail', 'mortise', 'tenon', 'shelf'
  const [length, setLength] = useState(12);
  const [quantity, setQuantity] = useState(3);
  const [width, setWidth] = useState(0.5);
  const [gap, setGap] = useState(0.125);
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
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto scrollbar-styled flex items-start justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl">
        <h2 className="text-responsive-2xl font-bold mb-2 text-white">Joinery Spacer</h2>
        <p className="text-responsive-base text-gray-300 mb-6 sm:mb-8">Calculate even spacing for dovetails, mortises, and more</p>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="font-bold text-responsive-lg text-white">Settings</h3>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">Type</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setResult(null);
              }}
              className="input-modern text-responsive-base"
            >
              <option value="dovetail">Dovetails</option>
              <option value="mortise">Mortises</option>
              <option value="tenon">Tenons</option>
              <option value="shelf">Shelf Pins</option>
            </select>
          </div>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">Length (in)</label>
            <input
              type="number"
              step="0.1"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="input-modern text-responsive-base"
            />
          </div>

          <div>
            <label className="text-responsive-base font-medium text-gray-300">
              {type === 'shelf' ? 'Number of Pins' : 'Quantity'}
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-modern text-responsive-base"
            />
          </div>

          {type !== 'shelf' && (
            <div>
              <label className="text-responsive-base font-medium text-gray-300">
                {type === 'dovetail' ? 'Tail' : type === 'mortise' ? 'Mortise' : 'Tenon'} Width (in)
              </label>
              <input
                type="number"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="input-modern text-responsive-base"
              />
            </div>
          )}

          {type === 'tenon' && (
            <div>
              <label className="text-responsive-base font-medium text-gray-300">Gap Width (in)</label>
              <input
                type="number"
                step="0.1"
                value={gap}
                onChange={(e) => setGap(e.target.value)}
                className="input-modern text-responsive-base"
              />
            </div>
          )}

          <button
            onClick={handleCalculate}
            className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-lg hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-responsive-lg"
          >
            Calculate
          </button>

          {result && !result.error && (
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 border border-blue-400">
              <p className="text-xs font-semibold text-blue-100 mb-2">Spacing:</p>
              {result.spaceWidth && (
                <p className="text-responsive-xl font-bold text-white">{result.spaceWidth}"</p>
              )}
              {result.totalWidth && (
                <p className="text-xs text-blue-100 mt-1">Total: {result.totalWidth}"</p>
              )}
            </div>
          )}

          {result?.error && (
            <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 border border-red-400 text-xs text-red-100">
              {result.error}
            </div>
          )}
        </div>

        {/* Visualization */}
        {result && result.layout && (
          <div className="mt-6 sm:mt-8 p-6 sm:p-8 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
            <h3 className="font-bold text-responsive-lg text-white mb-4">Layout Diagram</h3>

            {/* SVG Layout */}
            <div className="bg-gray-900 p-4 rounded-lg mb-4 overflow-x-auto">
              <svg
                width="100%"
                height="120"
                viewBox={`0 0 ${length * 80} 100`}
                className="min-w-full"
              >
                {/* Scale ruler */}
                <line x1="0" y1="10" x2={length * 80} y2="10" stroke="#6b7280" strokeWidth="1" />
                <text x="-30" y="35" fontSize="12" fill="#aaa">
                  0"
                </text>
                <text x={length * 80 - 30} y="35" fontSize="12" fill="#aaa">
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
                        fontSize="11"
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
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
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
