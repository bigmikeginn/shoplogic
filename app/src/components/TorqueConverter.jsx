import { useState, useCallback } from 'react';
import { convertTorque, TORQUE_UNITS, TORQUE_PRESETS } from '../utils/torqueConverter';

export default function TorqueConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('ft-lbs');
  const [result, setResult] = useState(null);

  const handleConvert = useCallback(() => {
    setResult(convertTorque(value, fromUnit));
  }, [value, fromUnit]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Torque Converter</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">ft-lbs ↔ Nm ↔ in-lbs ↔ kg-m</p>

        <div className="flex gap-2 mb-3">
          <input type="text" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 input-modern" />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-24 p-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            {TORQUE_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1 mb-3">
          {TORQUE_PRESETS.map(p => (
            <button key={p.label} onClick={() => { setValue(p.ftlbs.toString()); setFromUnit('ft-lbs'); setResult(null); }} className="px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
              {p.label} ({p.ftlbs})
            </button>
          ))}
        </div>

        <button onClick={handleConvert} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Convert
        </button>

        {result && !result.error && (
          <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 bg-gradient-to-br from-red-500 to-rose-600 rounded shadow-lg border border-red-400 text-white">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-xs opacity-70">ft-lbs</span><p className="text-responsive-lg font-bold">{result.ftlbs}</p></div>
              <div><span className="text-xs opacity-70">Nm</span><p className="text-responsive-lg font-bold">{result.nm}</p></div>
              <div><span className="text-xs opacity-70">in-lbs</span><p className="text-responsive-lg font-bold">{result.inlbs}</p></div>
              <div><span className="text-xs opacity-70">kg-m</span><p className="text-responsive-lg font-bold">{result.kgm}</p></div>
            </div>
          </div>
        )}
        {result && result.error && <div className="mt-3 sm:mt-4 p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-sm">{result.error}</div>}
      </div>
    </div>
  );
}