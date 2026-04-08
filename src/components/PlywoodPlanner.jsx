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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Plywood Cut Planner</h2>
      <p className="text-sm text-gray-600 mb-4">4×8 Sheet (48" × 96") - Guillotine bin-packing</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold mb-3">Parts</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {parts.map((part, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPart(idx)}
                className={`p-3 rounded-md cursor-pointer transition ${
                  selectedPart === idx
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-xs font-semibold text-gray-500">Part {idx + 1}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <input
                    type="number"
                    placeholder="W"
                    value={part.width}
                    onChange={(e) => updatePart(idx, 'width', e.target.value)}
                    className="px-2 py-1 border rounded"
                    min="1"
                  />
                  <input
                    type="number"
                    placeholder="L"
                    value={part.length}
                    onChange={(e) => updatePart(idx, 'length', e.target.value)}
                    className="px-2 py-1 border rounded"
                    min="1"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={part.qty}
                    onChange={(e) => updatePart(idx, 'qty', e.target.value)}
                    className="px-2 py-1 border rounded"
                    min="1"
                  />
                </div>
                <button
                  onClick={() => removePart(idx)}
                  className="mt-2 w-full text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addPart}
            className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            + Add Part
          </button>
          <button
            onClick={handlePack}
            className="w-full mt-3 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 font-semibold"
          >
            Pack Sheets
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {result ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                  <p className="text-xs text-gray-600">Sheets</p>
                  <p className="text-2xl font-bold text-blue-700">{result.sheetCount}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md border border-green-200">
                  <p className="text-xs text-gray-600">Efficiency</p>
                  <p className="text-2xl font-bold text-green-700">{result.efficiency}%</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                  <p className="text-xs text-gray-600">Waste (sq in)</p>
                  <p className="text-2xl font-bold text-orange-700">{result.waste}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                  <p className="text-xs text-gray-600">Total Area</p>
                  <p className="text-2xl font-bold text-purple-700">{result.totalArea}"</p>
                </div>
              </div>

              {/* Sheet Visualizations */}
              <div className="space-y-3">
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
            <div className="bg-gray-50 h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-500">Click "Pack Sheets" to visualize</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
