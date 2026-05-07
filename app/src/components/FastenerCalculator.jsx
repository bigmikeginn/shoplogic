import { useState, useCallback } from 'react';
import { getPilotHoleSize, getRecommendation, SCREW_SIZES, APPLICATIONS } from '../utils/fastenerCalculator';

export default function FastenerCalculator() {
  const [screwSize, setScrewSize] = useState('');
  const [woodType, setWoodType] = useState('hardwood');
  const [application, setApplication] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    const pilot = getPilotHoleSize(screwSize, woodType);
    const rec = application ? getRecommendation(application, woodType) : null;
    setResult({ pilot, recommendation: rec });
  }, [screwSize, woodType, application]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="space-y-3">
        <div className="flex rounded-lg overflow-hidden border border-white/[0.08]">
          {['hardwood', 'softwood'].map((w) => (
            <button
              key={w}
              onClick={() => { setWoodType(w); setResult(null); }}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${woodType === w ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06]'}`}
            >
              {w.charAt(0).toUpperCase() + w.slice(1)}
            </button>
          ))}
        </div>

        <select value={screwSize} onChange={(e) => setScrewSize(e.target.value)} className="input-modern">
          <option value="">Select screw size...</option>
          {Object.keys(SCREW_SIZES).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select value={application} onChange={(e) => setApplication(e.target.value)} className="input-modern">
          <option value="">Select application (optional)...</option>
          {Object.keys(APPLICATIONS).map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <button onClick={handleCalculate} className="btn-gold w-full">Calculate</button>
      </div>

      {result && result.pilot && (
        <div className="space-y-3 mt-3">
          <div className="result-card-highlight">
            <p className="text-xs text-amber-400/60">Pilot Hole ({result.pilot.woodType})</p>
            <p className="text-2xl font-bold text-amber-400 gold-glow-text">{result.pilot.pilotHoleDiameter}"</p>
          </div>
          <div className="result-card space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Screw Diameter</span><span className="text-white">{result.pilot.screwDiameter}"</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Clearance Hole</span><span className="text-white">{result.pilot.clearanceHoleDiameter}"</span></div>
          </div>
          <p className="text-xs text-gray-500 px-1">{result.pilot.tip}</p>
          {result.recommendation && (
            <div className="result-card text-sm">
              <p className="font-medium text-amber-400 mb-1">{result.recommendation.application}</p>
              <p className="text-gray-400 text-xs">
                Recommended: {result.recommendation.screwSize} ({result.recommendation.recommendation.type})
              </p>
            </div>
          )}
        </div>
      )}
      {result && !result.pilot && (
        <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">
          Please select a screw size.
        </div>
      )}
    </div>
  );
}