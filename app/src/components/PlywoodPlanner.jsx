import { useState, useEffect } from 'react';
import { packParts } from '../utils/binPacker';
import SheetVisualization from './SheetVisualization';
import PlywoodPlannerIllustration from './PlywoodPlannerIllustration';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

export default function PlywoodPlanner() {
  const [parts, setParts] = useState([]);
  const [result, setResult] = useState(null);
  const [selectedPart, setSelectedPart] = useState(0);
  const [sheetSize, setSheetSize] = useState('4x8');

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
    const packResult = packParts(parts, sheetSize);
    setResult(packResult);
  };

  useEffect(() => {
    console.log('Sheet size changed to:', sheetSize);
    if (result && parts.length > 0) {
      console.log('Repacking with new sheet size');
      const packResult = packParts(parts, sheetSize);
      console.log('New pack result:', packResult);
      setResult(packResult);
    }
  }, [sheetSize]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col gap-3">
        {/* Sheet Size Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setSheetSize('4x8')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
              sheetSize === '4x8'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            4' × 8'
          </button>
          <button
            onClick={() => setSheetSize('5x5')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
              sheetSize === '5x5'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            5' × 5'
          </button>
        </div>

        {/* Input Panel */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-white text-sm mb-3">Parts (Length × Width × # Parts)</h3>
          <div className="space-y-1 max-h-48 sm:max-h-64 overflow-y-auto scrollbar-styled mb-3">
            {parts.map((part, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPart(idx)}
                className={`p-2 rounded cursor-pointer transition text-xs ${selectedPart === idx ? 'bg-amber-500/[0.08] border border-amber-500/30' : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="font-semibold text-gray-300">Part {idx + 1}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <input type="number" placeholder="L" value={part.length} onChange={(e) => updatePart(idx, 'length', e.target.value)} className="px-2 py-1 bg-white/[0.04] border border-white/[0.08] rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40 text-xs" min="1" />
                  <input type="number" placeholder="W" value={part.width} onChange={(e) => updatePart(idx, 'width', e.target.value)} className="px-2 py-1 bg-white/[0.04] border border-white/[0.08] rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40 text-xs" min="1" />
                  <input type="number" placeholder="# Parts" value={part.qty} onChange={(e) => updatePart(idx, 'qty', e.target.value)} className="px-2 py-1 bg-white/[0.04] border border-white/[0.08] rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40 text-xs" min="1" />
                </div>
                <button onClick={() => removePart(idx)} className="mt-1 w-full text-xs px-2 py-1 rounded border border-red-500/20 bg-red-500/[0.06] text-red-300 hover:bg-red-500/[0.12] transition">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <button onClick={addPart} className="w-full px-3 py-2 rounded border border-white/[0.08] bg-white/[0.03] text-gray-300 text-xs hover:text-white hover:bg-white/[0.06] transition font-medium">+ Add Part</button>
            <button onClick={handlePack} className="btn-gold w-full">Pack Sheets</button>
          </div>
        </div>

        {/* Results Panel */}
        <div>
          {result ? (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="result-card-highlight"><p className="text-xs text-amber-400/60">Sheets</p><p className="text-2xl font-bold text-amber-400">{result.sheetCount}</p></div>
                <div className="result-card-highlight"><p className="text-xs text-amber-400/60">Efficiency</p><p className="text-2xl font-bold text-amber-400">{result.efficiency}%</p></div>
                <div className="result-card"><p className="text-xs text-gray-500">Waste (sq in)</p><p className="text-lg font-bold text-white">{result.waste}</p></div>
                <div className="result-card"><p className="text-xs text-gray-500">Total Area</p><p className="text-lg font-bold text-white">{result.totalArea}"</p></div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-styled">
                {result.sheets.map((sheet, sheetIdx) => (
                  <SheetVisualization key={sheetIdx} sheet={sheet} sheetIdx={sheetIdx} colors={COLORS} sheetSize={sheetSize} />
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card h-40 flex items-center justify-center">
              <p className="text-gray-500 text-sm text-center">Click "Pack Sheets" to visualize</p>
            </div>
          )}
        </div>
      </div>
      <PlywoodPlannerIllustration />
    </div>
  );
}