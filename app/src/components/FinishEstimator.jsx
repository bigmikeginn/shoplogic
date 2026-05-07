import { useState } from 'react';
import { calculateSurfaceArea, calculateFinish, FINISH_PRESETS } from '../utils/finishCalculator';

const FURNITURE_TYPES = {
  table: {
    name: 'Table',
    description: 'Large top & bottom, negligible sides',
    geometry: (length, width) => ({ length, width, height: 0, isClosed: false })
  },
  cabinet: {
    name: 'Cabinet',
    description: 'All outside & inside surfaces',
    geometry: (length, width, height) => ({ length, width, height, isClosed: true })
  },
  box: {
    name: 'Box/Drawer',
    description: 'Closed 6-sided box',
    geometry: (length, width, height) => ({ length, width, height, isClosed: true })
  },
  openBox: {
    name: 'Open Box',
    description: 'Open top (5 sides)',
    geometry: (length, width, height) => ({ length, width, height, isClosed: false })
  },
  panel: {
    name: 'Panel/Door',
    description: 'Flat surface only',
    geometry: (length, width) => ({ length, width, height: 0, isClosed: false })
  }
};

export default function FinishEstimator() {
  const [furnitureType, setFurnitureType] = useState('table');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [finishType, setFinishType] = useState('poly');
  const [customCoats, setCustomCoats] = useState(null);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    if (l <= 0 || w <= 0) return;
    const furniture = FURNITURE_TYPES[furnitureType];
    const geometry = furniture.geometry(l, w, h);
    const area = calculateSurfaceArea(geometry.length, geometry.width, geometry.height, geometry.isClosed);
    const finish = calculateFinish(area, finishType, customCoats);
    setResult({ area, finish });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-400 block">Furniture Type</label>
        <div className="space-y-1">
          {Object.entries(FURNITURE_TYPES).map(([key, furniture]) => (
            <label key={key} className="flex items-center gap-2 p-2 sm:p-3 rounded cursor-pointer transition border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-sm">
              <input type="radio" name="furniture" value={key} checked={furnitureType === key} onChange={(e) => setFurnitureType(e.target.value)} className="w-4 h-4 accent-amber-500" />
              <div><p className="text-gray-300 font-medium">{furniture.name}</p><p className="text-xs text-gray-500">{furniture.description}</p></div>
            </label>
          ))}
        </div>

        <div className="divider-subtle my-3" />

        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Length (in)" value={length} onChange={(e) => setLength(e.target.value)} className="input-modern" min="1" />
          <input type="number" placeholder="Width (in)" value={width} onChange={(e) => setWidth(e.target.value)} className="input-modern" min="1" />
        </div>
        {(furnitureType === 'cabinet' || furnitureType === 'box' || furnitureType === 'openBox') && (
          <input type="number" placeholder="Height (in)" value={height} onChange={(e) => setHeight(e.target.value)} className="input-modern" min="1" />
        )}

        <div className="divider-subtle my-3" />

        <label className="text-xs font-medium text-gray-400 block">Finish Type</label>
        <div className="space-y-1">
          {Object.entries(FINISH_PRESETS).map(([key, preset]) => (
            <label key={key} className="flex items-center gap-2 p-2 sm:p-3 rounded cursor-pointer transition border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-sm">
              <input type="radio" name="finish" value={key} checked={finishType === key} onChange={(e) => setFinishType(e.target.value)} className="w-4 h-4 accent-amber-500" />
              <span className="text-gray-300">{preset.name}</span>
            </label>
          ))}
        </div>

        <input type="number" placeholder="Coats (optional)" value={customCoats || ''} onChange={(e) => setCustomCoats(e.target.value ? parseInt(e.target.value) : null)} className="input-modern" min="1" max="10" />

        <button onClick={handleCalculate} className="btn-gold w-full mt-3 sm:mt-4">Calculate</button>

        {result && (
          <div className="space-y-3 mt-3">
            <div className="result-card-highlight">
              <p className="text-xs text-amber-400/60 mb-1">Surface Area</p>
              <p className="text-2xl font-bold text-amber-400 gold-glow-text">{result.area} sq ft</p>
            </div>

            <div className="result-card space-y-2">
              <h3 className="font-semibold text-white">{result.finish.name}</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="result-card-highlight"><p className="text-xs text-amber-400/60">Coats</p><p className="text-xl font-bold text-amber-400">{result.finish.coats}</p></div>
                <div className="result-card-highlight"><p className="text-xs text-amber-400/60">Coverage</p><p className="text-xl font-bold text-amber-400">{result.finish.coverage} sq ft/qt</p></div>
              </div>
              <div className="result-card-highlight">
                <p className="text-xs text-amber-400/60 mb-1">Amount Needed</p>
                <div className="flex gap-4 items-baseline">
                  <div><p className="text-xl font-bold text-amber-400">{result.finish.quartsNeeded}</p><p className="text-xs text-amber-400/60">quarts</p></div>
                  <span className="text-gray-500">or</span>
                  <div><p className="text-xl font-bold text-amber-400">{result.finish.gallonsNeeded}</p><p className="text-xs text-amber-400/60">gallons</p></div>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-gray-400">
                <p className="font-medium text-gray-300 mb-1">Tips:</p>
                <p>{result.finish.notes}</p>
                {result.finish.drySand && <p className="text-amber-500 mt-1">⚠ Sand between coats</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}