import { useState, useCallback } from 'react';
import { calculateGearRatio, calculateOutputRPM, calculateSpeed, calculateCompoundRatio } from '../utils/gearRatioCalculator';

export default function GearRatio() {
  const [driveTeeth, setDriveTeeth] = useState('');
  const [drivenTeeth, setDrivenTeeth] = useState('');
  const [inputRPM, setInputRPM] = useState('');
  const [tireDiam, setTireDiam] = useState('');
  const [ratioResult, setRatioResult] = useState(null);
  const [rpmResult, setRpmResult] = useState(null);
  const [speedResult, setSpeedResult] = useState(null);

  const handleCalcRatio = useCallback(() => {
    setRatioResult(calculateGearRatio(driveTeeth, drivenTeeth));
  }, [driveTeeth, drivenTeeth]);

  const handleCalcRPM = useCallback(() => {
    if (!ratioResult || ratioResult.error) return;
    setRpmResult(calculateOutputRPM(inputRPM, ratioResult.ratio));
  }, [inputRPM, ratioResult]);

  const handleCalcSpeed = useCallback(() => {
    if (!ratioResult || ratioResult.error) return;
    setSpeedResult(calculateSpeed(inputRPM, ratioResult.ratio, tireDiam));
  }, [inputRPM, ratioResult, tireDiam]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Gear Ratio</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Ratio, RPM & vehicle speed</p>

        {/* Gear ratio inputs */}
        <div className="p-3 sm:p-4 bg-gray-700 bg-opacity-30 rounded border border-gray-600 mb-3">
          <p className="text-xs text-gray-400 mb-2">Gear Teeth</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Drive teeth" value={driveTeeth} onChange={(e) => setDriveTeeth(e.target.value)} className="flex-1 input-modern" />
            <input type="text" placeholder="Driven teeth" value={drivenTeeth} onChange={(e) => setDrivenTeeth(e.target.value)} className="flex-1 input-modern" />
          </div>
          <button onClick={handleCalcRatio} className="w-full mt-2 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-500 transition-colors">Calc Ratio</button>
        </div>

        {ratioResult && !ratioResult.error && (
          <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded shadow border border-indigo-400 text-white mb-3">
            <div className="flex justify-between items-center">
              <div><span className="text-xs opacity-70">Ratio</span><p className="text-responsive-lg font-bold">{ratioResult.ratioFormatted}</p></div>
              <div className="text-right"><span className="text-xs opacity-70">Value</span><p className="font-bold">{ratioResult.ratio}</p></div>
            </div>
            <p className="text-xs text-white/70 mt-1">{ratioResult.description}</p>
          </div>
        )}

        {/* RPM & Speed */}
        {ratioResult && !ratioResult.error && (
          <div className="p-3 sm:p-4 bg-gray-700 bg-opacity-30 rounded border border-gray-600 mb-3">
            <p className="text-xs text-gray-400 mb-2">RPM & Speed</p>
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="Input RPM" value={inputRPM} onChange={(e) => setInputRPM(e.target.value)} className="flex-1 input-modern" />
              <input type="text" placeholder="Tire diam (in)" value={tireDiam} onChange={(e) => setTireDiam(e.target.value)} className="flex-1 input-modern" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleCalcRPM} className="flex-1 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-500 transition-colors">Output RPM</button>
              <button onClick={handleCalcSpeed} className="flex-1 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-500 transition-colors">Speed</button>
            </div>
          </div>
        )}

        {rpmResult && !rpmResult.error && (
          <div className="p-3 sm:p-4 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white mb-3">
            <div className="flex justify-between"><span className="text-gray-400">Input RPM</span><span>{rpmResult.inputRPM}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Output RPM</span><span className="font-bold">{rpmResult.outputRPM}</span></div>
          </div>
        )}

        {speedResult && !speedResult.error && (
          <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded shadow border border-purple-400 text-white">
            <div className="flex gap-4">
              <div className="flex-1"><span className="text-xs opacity-70">mph</span><p className="text-responsive-lg font-bold">{speedResult.speedMph}</p></div>
              <div className="flex-1"><span className="text-xs opacity-70">km/h</span><p className="text-responsive-lg font-bold">{speedResult.speedKph}</p></div>
            </div>
            <p className="text-xs text-white/60 mt-1">Tire: {speedResult.tireDiameter}" (circum. {speedResult.circumference}")</p>
          </div>
        )}

        {(ratioResult?.error || rpmResult?.error || speedResult?.error) && (
          <div className="mt-3 p-4 bg-red-900 bg-opacity-40 rounded border border-red-700 text-red-200 text-sm">{ratioResult?.error || rpmResult?.error || speedResult?.error}</div>
        )}
      </div>
    </div>
  );
}