import { useState } from 'react';
import { convert, getConversionsByCategory } from '../utils/converter';

const CATEGORIES = ['length', 'area', 'volume', 'weight', 'temperature'];

export default function MetricConverter() {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState(25.4);
  const [selectedConversion, setSelectedConversion] = useState(0);
  const [result, setResult] = useState(null);

  const conversions = getConversionsByCategory()[category];

  const handleCalculate = () => {
    const conv = conversions[selectedConversion];
    if (!conv) return;

    const res = convert(value, conv.from, conv.to);
    setResult({ ...conv, value: parseFloat(value), result: res });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Metric/Imperial Converter</h2>
      <p className="text-sm text-gray-600 mb-6">Quick conversions for shop measurements</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold mb-4">Conversion</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setSelectedConversion(0);
                      setResult(null);
                    }}
                    className={`py-2 px-3 rounded-md text-xs font-medium transition ${
                      category === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                value={selectedConversion}
                onChange={(e) => setSelectedConversion(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {conversions.map((conv, idx) => (
                  <option key={idx} value={idx}>
                    {conv.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Value</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="py-2 px-3 bg-gray-100 rounded-md text-sm font-medium">
                  {conversions[selectedConversion]?.from}
                </span>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
            >
              Convert
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4">
            <h3 className="font-bold mb-4">Result</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border border-green-200">
                <p className="text-xs text-gray-600">From</p>
                <p className="text-2xl font-bold text-gray-800">
                  {result.value} {result.from}
                </p>
              </div>
              <div className="text-center text-gray-400">↓</div>
              <div className="bg-white p-3 rounded-md border border-green-200">
                <p className="text-xs text-gray-600">To</p>
                <p className="text-3xl font-bold text-green-700">
                  {result.result.toFixed(4)} {result.to}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
