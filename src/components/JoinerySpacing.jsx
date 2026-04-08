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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Joinery Spacer</h2>
      <p className="text-sm text-gray-600 mb-6">Calculate even spacing for dovetails, mortises, and more</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold mb-4">Settings</h3>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setResult(null);
                }}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dovetail">Dovetails</option>
                <option value="mortise">Mortises</option>
                <option value="tenon">Tenons</option>
                <option value="shelf">Shelf Pins</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Length (in)</label>
              <input
                type="number"
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                {type === 'shelf' ? 'Number of Pins' : 'Quantity'}
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {type !== 'shelf' && (
              <div>
                <label className="text-sm font-medium">
                  {type === 'dovetail' ? 'Tail' : type === 'mortise' ? 'Mortise' : 'Tenon'} Width (in)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {type === 'tenon' && (
              <div>
                <label className="text-sm font-medium">Gap Width (in)</label>
                <input
                  type="number"
                  step="0.1"
                  value={gap}
                  onChange={(e) => setGap(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              onClick={handleCalculate}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold text-sm"
            >
              Calculate
            </button>
          </div>

          {result && !result.error && (
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 mb-2">Spacing:</p>
              {result.spaceWidth && (
                <p className="text-lg font-bold text-blue-700">{result.spaceWidth}"</p>
              )}
              {result.totalWidth && (
                <p className="text-xs text-blue-600 mt-1">Total: {result.totalWidth}"</p>
              )}
            </div>
          )}

          {result?.error && (
            <div className="bg-red-50 p-3 rounded-md border border-red-200 text-xs text-red-700">
              {result.error}
            </div>
          )}
        </div>

        {/* Visualization */}
        {result && result.layout && (
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-bold mb-4">Layout Diagram</h3>

            {/* SVG Layout */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
              <svg
                width="100%"
                height="120"
                viewBox={`0 0 ${length * 80} 100`}
                className="min-w-full"
              >
                {/* Scale ruler */}
                <line x1="0" y1="10" x2={length * 80} y2="10" stroke="#d1d5db" strokeWidth="1" />
                <text x="-30" y="35" fontSize="12" fill="#666">
                  0"
                </text>
                <text x={length * 80 - 30} y="35" fontSize="12" fill="#666">
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
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Position</th>
                    <th className="border p-2 text-left">Type</th>
                    <th className="border p-2 text-right">Width</th>
                  </tr>
                </thead>
                <tbody>
                  {result.layout.map((el, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="border p-2">{el.position}"</td>
                      <td className="border p-2 capitalize font-medium text-blue-700">{el.type}</td>
                      <td className="border p-2 text-right">{el.width || el.index || ''}</td>
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
