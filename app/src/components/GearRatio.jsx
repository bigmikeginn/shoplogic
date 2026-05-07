import { useState, useCallback } from 'react';
import { calculateGearRatio, calculateOutputRPM, calculateSpeed } from '../utils/gearRatioCalculator';

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
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <div className="glass-card p-4 mb-3">
        <p className="text-xs text-gray-500 mb-2">Gear Teeth</p>
        <div className="flex gap-2">
          <input type="text" placeholder="Drive teeth" value={driveTeeth} onChange={(e) => setDriveTeeth(e.target.value)} className="flex-1 input-modern" />
          <input type="text" placeholder="Driven teeth" value={drivenTeeth} onChange={(e) => setDrivenTeeth(e.target.value)} className="flex-1 input-modern" />
        </div>
        <button onClick={handleCalcRatio} className="btn-gold w-full mt-2">Calc Ratio</button>
      </div>

      {ratioResult && !ratioResult.error && (
        <div className="result-card-highlight mb-3">
          <div className="flex justify-between items-center">
            <div><span className="text-xs text-amber-400/60">Ratio</span><p className="text-xl font-bold text-amber-400">{ratioResult.ratioFormatted}</p></div>
            <div className="text-right"><span className="text-xs text-amber-400/60">Value</span><p className="font-bold text-amber-400">{ratioResult.ratio}</p></div>
          </div>
          <p className="text-xs text-amber-400/60 mt-1">{ratioResult.description}</p>
        </div>
      )}

      {ratioResult && !ratioResult.error && (
        <div className="glass-card p-4 mb-3">
          <p className="text-xs text-gray-500 mb-2">RPM & Speed</p>
          <div className="flex gap-2 mb-2">
            <input type="text" placeholder="Input RPM" value={inputRPM} onChange={(e) => setInputRPM(e.target.value)} className="flex-1 input-modern" />
            <input type="text" placeholder="Tire diam (in)" value={tireDiam} onChange={(e) => setTireDiam(e.target.value)} className="flex-1 input-modern" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleCalcRPM} className="flex-1 py-1.5 rounded border border-white/[0.08] bg-white/[0.03] text-gray-300 text-sm hover:text-white hover:bg-white/[0.06] transition-colors">Output RPM</button>
            <button onClick={handleCalcSpeed} className="btn-gold flex-1">Speed</button>
          </div>
        </div>
      )}

      {rpmResult && !rpmResult.error && (
        <div className="result-card mb-3">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Input RPM</span><span className="text-white">{rpmResult.inputRPM}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Output RPM</span><span className="font-bold text-amber-400">{rpmResult.outputRPM}</span></div>
        </div>
      )}

      {speedResult && !speedResult.error && (
        <div className="result-card-highlight">
          <div className="flex gap-4">
            <div className="flex-1"><span className="text-xs text-amber-400/60">mph</span><p className="text-2xl font-bold text-amber-400">{speedResult.speedMph}</p></div>
            <div className="flex-1"><span className="text-xs text-amber-400/60">km/h</span><p className="text-2xl font-bold text-amber-400">{speedResult.speedKph}</p></div>
          </div>
          <p className="text-xs text-amber-400/60 mt-1">Tire: {speedResult.tireDiameter}" (circum. {speedResult.circumference}")</p>
        </div>
      )}

      {(ratioResult?.error || rpmResult?.error || speedResult?.error) && (
        <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-300 text-sm">{ratioResult?.error || rpmResult?.error || speedResult?.error}</div>
      )}
    </div>
  );
}