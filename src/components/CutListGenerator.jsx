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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cut List Generator</h2>
      <p className="text-sm text-gray-600 mb-6">Create optimized cut lists with board footage calculations</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold mb-3">Parts</h3>

          <div className="space-y-2 max-h-96 overflow-y-auto mb-4 pb-4 border-b">
            {parts.map((part, idx) => (
              <div key={idx} className="p-2 bg-gray-50 rounded-md border text-sm">
                <p className="font-medium">{part.name || 'Part'}</p>
                <p className="text-xs text-gray-600">
                  {part.thickness}" × {part.width}" × {part.length}" (Qty: {part.quantity})
                </p>
                <button
                  onClick={() => handleRemovePart(idx)}
                  className="mt-1 text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h4 className="font-bold mb-2 text-sm">Add Part</h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Part name"
              value={newPart.name}
              onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="T"
                step="0.01"
                value={newPart.thickness}
                onChange={(e) => setNewPart({ ...newPart, thickness: parseFloat(e.target.value) })}
                className="px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                placeholder="W"
                step="0.1"
                value={newPart.width}
                onChange={(e) => setNewPart({ ...newPart, width: parseFloat(e.target.value) })}
                className="px-2 py-1 border rounded text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="L"
                step="0.1"
                value={newPart.length}
                onChange={(e) => setNewPart({ ...newPart, length: parseFloat(e.target.value) })}
                className="px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                placeholder="Qty"
                min="1"
                value={newPart.quantity}
                onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) })}
                className="px-2 py-1 border rounded text-sm"
              />
            </div>
            <button
              onClick={handleAddPart}
              className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              + Add
            </button>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          >
            Generate Cut List
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="lg:col-span-2 space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-xs text-gray-600">Total Parts</p>
                <p className="text-2xl font-bold text-blue-700">{result.summary.totalParts}</p>
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <p className="text-xs text-gray-600">Board Feet</p>
                <p className="text-2xl font-bold text-green-700">{result.summary.totalBoardFeet}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <p className="text-xs text-gray-600">Surface Area</p>
                <p className="text-2xl font-bold text-purple-700">{result.summary.totalSurfaceArea} sq ft</p>
              </div>
              <div className="bg-orange-50 p-3 rounded border border-orange-200">
                <p className="text-xs text-gray-600">Est. Sheets</p>
                <p className="text-2xl font-bold text-orange-700">{result.summary.estimatedSheets}</p>
              </div>
            </div>

            {/* Cut List Table */}
            <div className="bg-white rounded border border-gray-200 p-3 overflow-x-auto">
              <h3 className="font-bold mb-2 text-sm">Cut List</h3>
              <table className="w-full text-xs border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-right">T×W×L</th>
                    <th className="border p-2 text-right">Qty</th>
                    <th className="border p-2 text-right">BF</th>
                  </tr>
                </thead>
                <tbody>
                  {result.parts.map((part, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border p-2">{part.name}</td>
                      <td className="border p-2 text-right">
                        {part.thickness}"×{part.width}"×{part.length}"
                      </td>
                      <td className="border p-2 text-right">{part.qty}</td>
                      <td className="border p-2 text-right font-semibold">{part.boardFeet}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="border p-2">TOTAL</td>
                    <td className="border p-2"></td>
                    <td className="border p-2 text-right">{result.summary.totalParts}</td>
                    <td className="border p-2 text-right">{result.summary.totalBoardFeet}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
