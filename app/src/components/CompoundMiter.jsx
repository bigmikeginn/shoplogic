import { useState, useCallback } from 'react';
import { calculateCompoundMiter, COMMON_SPRING_ANGLES, COMMON_WALL_ANGLES } from '../utils/compoundMiterCalculator';

export default function CompoundMiter() {
  const [wallAngle, setWallAngle] = useState('90');
  const [springAngle, setSpringAngle] = useState('38');
  const [slope, setSlope] = useState('0');
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    setResult(calculateCompoundMiter(wallAngle, springAngle, slope));
  }, [wallAngle, springAngle, slope]);

  const selectPreset = (type, value) => {
    if (type === 'wall') setWallAngle(value.toString());
    if (type === 'spring') setSpringAngle(value.toString());
    setResult(null);
  };

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Compound Miter</h2>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">Saw settings for crown molding & compound joinery</p>

        <div className="space-y-3">
          {/* Wall angle */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Wall Corner Angle</label>
            <input type="text" value={wallAngle} onChange={(e) => setWallAngle(e.target.value)} placeholder="90" className="input-modern" />
            <div className="flex flex-wrap gap-1 mt-1">
              {COMMON_WALL_ANGLES.map((a) => (
                <button key={a.value} onClick={() => selectPreset('wall', a.value)} className={`px-2 py-0.5 text-xs rounded ${parseFloat(wallAngle) === a.value ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Spring angle */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Crown Spring Angle</label>
            <input type="text" value={springAngle} onChange={(e) => setSpringAngle(e.target.value)} placeholder="38" className="input-modern" />
            <div className="flex flex-wrap gap-1 mt-1">
              {COMMON_SPRING_ANGLES.map((a) => (
                <button key={a.value} onClick={() => selectPreset('spring', a.value)} className={`px-2 py-0.5 text-xs rounded ${parseFloat(springAngle) === a.value ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slope */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Roof Slope (0° for flat ceiling)</label>
            <input type="text" value={slope} onChange={(e) => setSlope(e.target.value)} placeholder="0" className="input-modern" />
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg">
          Calculate
        </button>

        {result && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded shadow-lg border border-purple-400 text-white">
              <p className="text-xs text-white/70 mb-2">Saw Settings</p>
              <div className="flex gap-4">
                <div className="flex-1 text-center">
                  <p className="text-xs text-white/60">Miter</p>
                  <p className="text-responsive-xl font-bold">{result.miterAngle}°</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-white/60">Bevel</p>
                  <p className="text-responsive-xl font-bold">{result.bevelAngle}°</p>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">{result.sawSettings.tip}</p>
            </div>

            <div className="p-3 sm:p-4 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600 text-white">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Wall</span><span>{result.wallAngle}°</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Spring</span><span>{result.springAngle}°</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Slope</span><span>{result.slope}°</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}