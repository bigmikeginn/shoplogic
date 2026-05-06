import { useState } from 'react';
import { addPart, generateCutList } from '../utils/cutListGenerator';

export default function CutListGenerator() {
  const [parts, setParts] = useState([
    { name: 'Side Panel', thickness: 0.75, width: 12, length: 30, quantity: 2 },
    { name: 'Top/Bottom', thickness: 0.75, width: 18, length: 24, quantity: 2 },
    { name: 'Shelf', thickness: 0.75, width: 16, length: 22, quantity: 3 },
  ]);
  const [result, setResult] = useState(null);
  const [newPart, setNewPart] = useState({ name: '', thickness: 0.75, width: 6, length: 12, quantity: 1 });

  const handleAddPart = () => {
    if (newPart.name.trim()) {
      setParts(addPart(parts, newPart));
      setNewPart({ name: '', thickness: 0.75, width: 6, length: 12, quantity: 1 });
    }
  };

  const handleRemovePart = (idx) => {
    setParts(parts.filter((_, i) => i !== idx));
  };

  const handleGenerate = () => {
    const cutList = generateCutList(parts, 0.75);
    setResult(cutList);
  };

  const handleUpdatePart = (idx, field, value) => {
    const updated = [...parts];
    updated[idx][field] = field === 'quantity' ? parseInt(value) : parseFloat(value);
    setParts(updated);
  };

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Cut List Generator</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Create optimized cut lists with board footage calculations</p>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white">Parts List</h3>

          <div className="space-y-1 max-h-48 sm:max-h-64 overflow-y-auto scrollbar-styled mb-3 pb-3 border-b border-gray-700">
            {parts.map((part, idx) => (
              <div key={idx} className="p-2 sm:p-3 bg-gray-800 bg-opacity-30 rounded border border-gray-700 text-xs sm:text-sm">
                <p className="font-medium text-gray-200">{part.name || 'Part'}</p>
                <p className="text-xs text-gray-400">
                  {part.thickness}" × {part.width}" × {part.length}" (Qty: {part.quantity})
                </p>
                <button
                  onClick={() => handleRemovePart(idx)}
                  className="mt-1 text-xs px-2 py-1 bg-red-600 bg-opacity-50 text-red-100 rounded hover:bg-opacity-70 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h4 className="font-bold text-responsive-sm sm:text-responsive-base text-white">Add Part</h4>
          <div className="form-compact">
            <input
              type="text"
              placeholder="Part name"
              value={newPart.name}
              onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
              className="input-modern"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Thickness"
                step="0.01"
                value={newPart.thickness}
                onChange={(e) => setNewPart({ ...newPart, thickness: parseFloat(e.target.value) })}
                className="input-modern"
              />
              <input
                type="number"
                placeholder="Width"
                step="0.1"
                value={newPart.width}
                onChange={(e) => setNewPart({ ...newPart, width: parseFloat(e.target.value) })}
                className="input-modern"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Length"
                step="0.1"
                value={newPart.length}
                onChange={(e) => setNewPart({ ...newPart, length: parseFloat(e.target.value) })}
                className="input-modern"
              />
              <input
                type="number"
                placeholder="Qty"
                min="1"
                value={newPart.quantity}
                onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) })}
                className="input-modern"
              />
            </div>
            <button
              onClick={handleAddPart}
              className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded hover:shadow-lg transition font-semibold"
            >
              + Add
            </button>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
          >
            Generate Cut List
          </button>

          {/* Results */}
          {result && (
            <div className="space-y-3 sm:space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 sm:p-4 rounded border border-blue-400">
                  <p className="text-xs text-blue-100">Total Parts</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.summary.totalParts}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-4 rounded border border-green-400">
                  <p className="text-xs text-green-100">Board Feet</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.summary.totalBoardFeet}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 sm:p-4 rounded border border-purple-400">
                  <p className="text-xs text-purple-100">Surface Area</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.summary.totalSurfaceArea} sq ft</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 sm:p-4 rounded border border-orange-400">
                  <p className="text-xs text-orange-100">Est. Sheets</p>
                  <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{result.summary.estimatedSheets}</p>
                </div>
              </div>

              {/* Cut List Table */}
              <div className="bg-gray-800 bg-opacity-50 rounded border border-gray-700 p-3 overflow-x-auto">
                <h3 className="font-bold text-responsive-sm sm:text-responsive-base text-white mb-2">Cut List</h3>
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="border border-gray-600 p-2 text-left text-gray-200">Name</th>
                      <th className="border border-gray-600 p-2 text-right text-gray-200">T×W×L</th>
                      <th className="border border-gray-600 p-2 text-right text-gray-200">Qty</th>
                      <th className="border border-gray-600 p-2 text-right text-gray-200">BF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.parts.map((part, idx) => (
                      <tr key={idx} className="hover:bg-gray-700 hover:bg-opacity-50">
                        <td className="border border-gray-600 p-2 text-gray-300">{part.name}</td>
                        <td className="border border-gray-600 p-2 text-right text-gray-300">
                          {part.thickness}"×{part.width}"×{part.length}"
                        </td>
                        <td className="border border-gray-600 p-2 text-right text-gray-300">{part.qty}</td>
                        <td className="border border-gray-600 p-2 text-right font-semibold text-gray-200">{part.boardFeet}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700 font-bold">
                      <td className="border border-gray-600 p-2 text-gray-200">TOTAL</td>
                      <td className="border border-gray-600 p-2"></td>
                      <td className="border border-gray-600 p-2 text-right text-gray-200">{result.summary.totalParts}</td>
                      <td className="border border-gray-600 p-2 text-right text-gray-200">{result.summary.totalBoardFeet}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
