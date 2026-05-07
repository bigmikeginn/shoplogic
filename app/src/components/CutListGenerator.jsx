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

  const handleRemovePart = (idx) => setParts(parts.filter((_, i) => i !== idx));
  const handleGenerate = () => setResult(generateCutList(parts, 0.75));

  const handleUpdatePart = (idx, field, value) => {
    const updated = [...parts];
    updated[idx][field] = field === 'quantity' ? parseInt(value) : parseFloat(value);
    setParts(updated);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 sm:py-8">
      <h3 className="font-semibold text-white text-sm mb-3">Parts List</h3>

      <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-styled mb-3 pb-3 border-b border-white/[0.06]">
        {parts.map((part, idx) => (
          <div key={idx} className="p-2.5 rounded border border-white/[0.06] bg-white/[0.02] text-xs">
            <p className="font-medium text-white">{part.name || 'Part'}</p>
            <p className="text-gray-500">{part.thickness}" × {part.width}" × {part.length}" (Qty: {part.quantity})</p>
            <div className="flex gap-1 mt-1">
              <input type="number" placeholder="T" value={part.thickness} onChange={(e) => handleUpdatePart(idx, 'thickness', e.target.value)} className="flex-1 px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-500/40" />
              <input type="number" placeholder="W" value={part.width} onChange={(e) => handleUpdatePart(idx, 'width', e.target.value)} className="flex-1 px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-500/40" />
              <input type="number" placeholder="L" value={part.length} onChange={(e) => handleUpdatePart(idx, 'length', e.target.value)} className="flex-1 px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-500/40" />
              <input type="number" placeholder="Qty" value={part.quantity} onChange={(e) => handleUpdatePart(idx, 'quantity', e.target.value)} className="w-12 px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-500/40" />
            </div>
            <button onClick={() => handleRemovePart(idx)} className="mt-1 text-xs text-red-400 hover:text-red-300 transition">Remove</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1 mb-3">
        <input type="text" placeholder="Name" value={newPart.name} onChange={(e) => setNewPart({ ...newPart, name: e.target.value })} className="input-modern text-xs col-span-2" />
        <input type="number" placeholder="T" value={newPart.thickness} onChange={(e) => setNewPart({ ...newPart, thickness: parseFloat(e.target.value) })} className="input-modern text-xs" />
        <input type="number" placeholder="Qty" value={newPart.quantity} onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) })} className="input-modern text-xs" />
        <button onClick={handleAddPart} className="px-2 py-2.5 rounded border border-white/[0.08] bg-white/[0.03] text-gray-300 text-xs hover:text-white hover:bg-white/[0.06] transition">+ Add</button>
      </div>

      <button onClick={handleGenerate} className="btn-gold w-full">Generate Cut List</button>

      {result && !result.error && (
        <div className="space-y-3 mt-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="result-card-highlight"><p className="text-xs text-amber-400/60">Total BF</p><p className="text-xl font-bold text-amber-400">{result.totalBF}</p></div>
            <div className="result-card-highlight"><p className="text-xs text-amber-400/60">Parts</p><p className="text-xl font-bold text-amber-400">{result.totalParts}</p></div>
            <div className="result-card-highlight"><p className="text-xs text-amber-400/60">Sheets</p><p className="text-xl font-bold text-amber-400">{result.sheetsNeeded}</p></div>
          </div>
          {result.cuts?.map((cut, i) => (
            <div key={i} className="result-card text-sm">
              <p className="font-medium text-white">{cut.name}</p>
              <p className="text-gray-500">{cut.thickness}" × {cut.width}" × {cut.length}" — Qty: {cut.quantity}</p>
            </div>
          ))}
        </div>
      )}
      {result && result.error && <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{result.error}</div>}
    </div>
  );
}