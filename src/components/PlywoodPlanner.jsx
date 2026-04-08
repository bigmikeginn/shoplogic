import { useState } from 'react';
import { packParts } from '../utils/binPacker';
import SheetVisualization from './SheetVisualization';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

export default function PlywoodPlanner() {
  const [parts, setParts] = useState([
    { width: 12, length: 24, qty: 4 },
    { width: 8, length: 16, qty: 2 },
  ]);
  const [result, setResult] = useState(null);
  const [selectedPart, setSelectedPart] = useState(0);

  const addPart = () => {
    setParts([...parts, { width: 6, length: 12, qty: 1 }]);
  };

  const removePart = (idx) => {
    setParts(parts.filter((_, i) => i !== idx));
  };

  const updatePart = (idx, field, value) => {
    const newParts = [...parts];
    newParts[idx][field] = parseFloat(value) || 0;
    setParts(newParts);
  };

  const handlePack = () => {
    const packResult = packParts(parts);
    setResult(packResult);
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto scrollbar-styled bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-responsive-2xl font-bold mb-2 text-white">Plywood Cut Planner</h2>
        <p className="text-responsive-base text-gray-300 mb-6">4×8 Sheet (48" × 96") - Guillotine bin-packing</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Input Panel */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4 sm:p-6 backdrop-blur">
            <h3 className="font-bold text-white text-responsive-lg mb-4">Parts</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-styled mb-4">
              {parts.map((part, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPart(idx)}
                  className={`p-3 rounded-lg cursor-pointer transition border-2 ${
                    selectedPart === idx
                      ? 'bg-blue-600 bg-opacity-50 border-blue-400 border-2'
                      : 'bg-gray-700 bg-opacity-30 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-xs font-semibold text-gray-300">Part {idx + 1}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <input
                      type="number"
                      placeholder="W"
                      value={part.width}
                      onChange={(e) => updatePart(idx, 'width', e.target.value)}
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      min="1"
                    />
                    <input
                      type="number"
                      placeholder="L"
                      value={part.length}
                      onChange={(e) => updatePart(idx, 'length', e.target.value)}
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      min="1"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={part.qty}
                      onChange={(e) => updatePart(idx, 'qty', e.target.value)}
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <button
                    onClick={() => removePart(idx)}
                    className="mt-2 w-full text-xs px-2 py-1 bg-red-600 bg-opacity-50 text-red-100 rounded hover:bg-opacity-70 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addPart}
              className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition mb-2 font-semibold"
            >
              + Add Part
            </button>
            <button
              onClick={handlePack}
              className="w-full px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm rounded-lg hover:shadow-lg transition font-semibold"
            >
              Pack Sheets
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 overflow-auto scrollbar-styled">
            {result ? (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 sm:gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg border border-blue-500">
                    <p className="text-xs text-blue-100">Sheets</p>
                    <p className="text-responsive-xl font-bold text-white">{result.sheetCount}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-4 rounded-lg border border-green-500">
                    <p className="text-xs text-green-100">Efficiency</p>
                    <p className="text-responsive-xl font-bold text-white">{result.efficiency}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600 to-red-700 p-4 rounded-lg border border-orange-500">
                    <p className="text-xs text-orange-100">Waste (sq in)</p>
                    <p className="text-responsive-xl font-bold text-white">{result.waste}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-pink-700 p-4 rounded-lg border border-purple-500">
                    <p className="text-xs text-purple-100">Total Area</p>
                    <p className="text-responsive-xl font-bold text-white">{result.totalArea}"</p>
                  </div>
                </div>

                {/* Sheet Visualizations */}
                <div className="space-y-4">
                  {result.sheets.map((sheet, sheetIdx) => (
                    <SheetVisualization
                      key={sheetIdx}
                      sheet={sheet}
                      sheetIdx={sheetIdx}
                      colors={COLORS}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-700 bg-opacity-50 h-64 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                <p className="text-gray-400 text-responsive-base text-center">Click "Pack Sheets" to visualize</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
