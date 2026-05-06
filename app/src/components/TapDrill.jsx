import { useState, useCallback } from 'react';
import { calculateTapDrill, SAE_SIZES, METRIC_SIZES, THREAD_STANDARDS } from '../utils/tapDrillReference';

export default function TapDrill() {
  const [standard, setStandard] = useState('SAE (Imperial)');
  const [boltDiam, setBoltDiam] = useState('');
  const [pitch, setPitch] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateTapDrill(boltDiam, pitch, standard));
  }, [boltDiam, pitch, standard]);

  const selectPreset = (size) => {
    setBoltDiam(size.boltDiam.toString());
    setPitch(standard === 'Metric' ? size.pitch.toString() : size.tpi.toString());
    setResult(null);
  };

  const sizes = standard === 'Metric' ? METRIC_SIZES : SAE_SIZES;

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Tap Drill</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Tap drill & clearance hole sizes</p>

        {/* Standard toggle */}
        <div className="flex rounded-lg overflow-hidden mb-3 border border-gray-600">
          {THREAD_STANDARDS.map(s => (
            <button key={s} onClick={() => { setStandard(s); setResult(null); setBoltDiam(''); setPitch(''); }} className={`flex-1 py-2 text-xs sm:text-sm font-medium transition-colors ${standard === s ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="form-compact">
          <input type="text" placeholder={standard === 'Metric' ? 'Bolt diam (mm)' : 'Bolt diam (in)'} value={boltDiam} onChange={(e) => setBoltDiam(e.target.value)} className="input-modern" />
          <input type="text" placeholder={standard === 'Metric' ? 'Pitch (mm)' : 'TPI'} value={pitch} onChange={(e) => setPitch(e.target.value)} className="input-modern" />
        </div>

        {/* Quick picks */}
        <div className="flex flex-wrap gap-1 mt-2">
          {sizes.map(s => (
            <button key={s.size} onClick={() => selectPreset(s)} className="px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
              {s.label || s.size}
            </button>
          ))}
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-orange-500 to-red-600 rounded shadow-lg border border-orange-400 text-white">
              <p className="text-xs text-white/70 mb-2">Tap Drill Size</p>
              <p className="text-responsive-xl lg:text-responsive-2xl font-bold">{result.tapDrill}{result.unit}</p>
              {result.tapDrillFraction !== '—' && <p className="text-sm text-white/80">≈ {result.tapDrillFraction}"</p>}
            </div>
            <div className="p-4 sm:p-5 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs text-gray-400">Clearance Hole</span><p className="font-bold">{result.clearanceDrill}{result.unit}</p></div>
                <div><span className="text-xs text-gray-400">Bolt Diam</span><p className="font-bold">{result.boltDiam}{result.unit}</p></div>
              </div>
            </div>
          </div>
        )}
        {result && result.error && <div className="mt-3 sm:mt-4 p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-sm">{result.error}</div>}
      </div>
    </div>
  );
}