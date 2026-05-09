import { useState, useCallback } from 'react';
import { calculateSeasonalMovement, SEASONAL_RH } from '../utils/woodMovement';
import WoodMovementIllustration from './WoodMovementIllustration';
import { WOOD_DATABASE } from '../utils/woodDatabase';

export default function WoodMovementCalc() {
  const [species, setSpecies] = useState('');
  const [width, setWidth] = useState('');
  const [climate, setClimate] = useState('Temperate');
  const [grain, setGrain] = useState('tangential');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    const r = calculateSeasonalMovement(width, species, climate, grain);
    setResult(r);
  }, [species, width, climate, grain]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="space-y-3">
        <select value={species} onChange={(e) => setSpecies(e.target.value)} className="input-modern">
          <option value="">Select species...</option>
          {WOOD_DATABASE.map((s) => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>

        <div className="flex rounded-lg overflow-hidden border border-white/[0.08]">
          {['tangential', 'radial'].map((g) => (
            <button
              key={g}
              onClick={() => setGrain(g)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${grain === g ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>

        <input type="text" placeholder="Board width (in)" value={width} onChange={(e) => setWidth(e.target.value)} className="input-modern" />

        <select value={climate} onChange={(e) => setClimate(e.target.value)} className="input-modern">
          {Object.keys(SEASONAL_RH).map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>

        <button onClick={handleCalculate} className="btn-gold w-full">Calculate Movement</button>
      </div>

      {result && (
        <div className="result-card-highlight mt-3 sm:mt-4 space-y-2">
          <div>
            <span className="text-xs text-amber-400/60">Expansion/Contraction</span>
            <p className="text-xl font-bold text-amber-400 gold-glow-text">{result.changeInches}"</p>
          </div>
          <div className="result-card space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Nominal Width</span><span className="text-white">{result.nominalWidth}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Min Width</span><span className="text-white">{result.minWidth}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Max Width</span><span className="text-white">{result.maxWidth}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Change %</span><span className="text-white">{result.changePercent}%</span></div>
            <div className="flex justify-between"><span className="text-gray-500">RH Change</span><span className="text-white">{result.rhChange}%</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Grain</span><span className="text-white">{result.grainDirection}</span></div>
          </div>
          <p className="text-xs text-gray-500">{result.notes}</p>
        </div>
      )}
      {result === null && species && width && (
        <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">
          Could not find wood species data.
        </div>
      )}
      <WoodMovementIllustration />
    </div>
  );
}