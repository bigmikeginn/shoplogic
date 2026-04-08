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
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Metric/Imperial Converter</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Quick conversions for shop measurements</p>

        <div className="form-compact">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setSelectedConversion(0);
                    setResult(null);
                  }}
                  className={`py-1 px-2 rounded-lg text-xs font-medium transition ${
                    category === cat
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <select
            value={selectedConversion}
            onChange={(e) => setSelectedConversion(parseInt(e.target.value))}
            className="input-modern"
          >
            {conversions.map((conv, idx) => (
              <option key={idx} value={idx}>
                {conv.label}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input-modern flex-1"
            />
            <span className="py-2 px-3 bg-gray-800 bg-opacity-50 rounded-lg text-xs sm:text-sm font-medium text-gray-300 border border-gray-700 whitespace-nowrap">
              {conversions[selectedConversion]?.from}
            </span>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded-lg hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
          >
            Convert
          </button>

          {/* Result */}
          {result && (
            <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg border border-green-400 space-y-2">
              <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white">Result</h3>
              <div className="space-y-2">
                <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-green-400">
                  <p className="text-xs text-green-100">From</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                    {result.value} {result.from}
                  </p>
                </div>
                <div className="text-center text-green-100 text-sm">↓</div>
                <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-green-400">
                  <p className="text-xs text-green-100">To</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                    {result.result.toFixed(4)} {result.to}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
