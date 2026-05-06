import { useState } from 'react';
import {
  parseToDecimal,
  decimalToFraction,
  add,
  subtract,
  multiply,
  divide,
  feetInchesToInches,
  inchesToFeetInches
} from '../utils/fractionMath';

export default function FractionMath() {
  const [tab, setTab] = useState('basic'); // 'basic' or 'convert'

  // Basic calculator
  const [input1, setInput1] = useState('2 1/2');
  const [operator, setOperator] = useState('+');
  const [input2, setInput2] = useState('1 3/4');
  const [result, setResult] = useState(null);

  // Convert tab
  const [convertMode, setConvertMode] = useState('fi'); // 'fi' = feetinches, 'df' = decimalfraction
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState('3 1/2');
  const [decimalInput, setDecimalInput] = useState(5.29);

  const handleCalculate = () => {
    let res;
    const a = input1;
    const b = input2;

    switch (operator) {
      case '+':
        res = add(a, b);
        break;
      case '−':
        res = subtract(a, b);
        break;
      case '×':
        res = multiply(a, b);
        break;
      case '÷':
        res = divide(a, b);
        break;
      default:
        res = 0;
    }

    setResult(res);
  };

  const handleConvert = () => {
    if (convertMode === 'fi') {
      const totalInches = feetInchesToInches(feet, inches);
      const feetInches = inchesToFeetInches(totalInches);
      return {
        totalInches: totalInches.toFixed(4),
        feetInches
      };
    } else {
      const frac = decimalToFraction(decimalInput);
      return {
        decimal: decimalInput,
        fraction: frac
      };
    }
  };

  const conversionResult = convertMode ? handleConvert() : null;

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Fraction Math</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Imperial shop measurements calculator</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-5 overflow-x-auto">
          <button
            onClick={() => setTab('basic')}
            className={`px-3 sm:px-4 py-2 rounded font-medium transition whitespace-nowrap text-sm sm:text-base ${
              tab === 'basic'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setTab('convert')}
            className={`px-3 sm:px-4 py-2 rounded font-medium transition whitespace-nowrap text-sm sm:text-base ${
              tab === 'convert'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
            }`}
          >
            Converter
          </button>
        </div>

        {/* Basic Calculator */}
        {tab === 'basic' && (
          <div className="form-compact">
            <input
              type="text"
              placeholder="2 1/2 or 2.5"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              className="input-modern"
            />
            <p className="text-xs text-gray-400 -mt-2">
              Decimal: {parseToDecimal(input1).toFixed(4)}
            </p>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Operation</label>
              <div className="grid grid-cols-4 gap-2">
                {['+', '−', '×', '÷'].map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperator(op)}
                    className={`py-2 rounded font-bold transition text-sm sm:text-base ${
                      operator === op
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="1 3/4 or 1.75"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              className="input-modern"
            />
            <p className="text-xs text-gray-400 -mt-2">
              Decimal: {parseToDecimal(input2).toFixed(4)}
            </p>

            <button
              onClick={handleCalculate}
              className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
            >
              Calculate
            </button>

            {/* Result */}
            {result !== null && (
              <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded shadow-lg border border-green-400 space-y-2">
                <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white">Result</h3>
                <div className="space-y-2">
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-green-400">
                    <p className="text-xs text-green-100">Fraction</p>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                      {decimalToFraction(result)}
                    </p>
                  </div>
                  <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-green-400">
                    <p className="text-xs text-green-100">Decimal</p>
                    <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                      {result.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Converter */}
        {tab === 'convert' && (
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2 pb-3 border-b border-gray-700">
              <label className="flex items-center gap-2 p-2 sm:p-3 bg-gray-800 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition border border-gray-700">
                <input
                  type="radio"
                  name="convert"
                  checked={convertMode === 'fi'}
                  onChange={() => setConvertMode('fi')}
                  className="w-4 h-4"
                />
                <span className="text-sm sm:text-base text-gray-300">Feet & Inches</span>
              </label>
              <label className="flex items-center gap-2 p-2 sm:p-3 bg-gray-800 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition border border-gray-700">
                <input
                  type="radio"
                  name="convert"
                  checked={convertMode === 'df'}
                  onChange={() => setConvertMode('df')}
                  className="w-4 h-4"
                />
                <span className="text-sm sm:text-base text-gray-300">Decimal ↔ Fraction</span>
              </label>
            </div>

            {convertMode === 'fi' ? (
              <div className="form-compact">
                <input
                  type="number"
                  placeholder="Feet"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className="input-modern"
                />
                <input
                  type="text"
                  placeholder="Inches (e.g., 3 1/2 or 3.5)"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className="input-modern"
                />
              </div>
            ) : (
              <div className="form-compact">
                <input
                  type="number"
                  placeholder="Decimal Value"
                  step="0.0001"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  className="input-modern"
                />
              </div>
            )}

            {/* Conversion Result */}
            {conversionResult && (
              <div className="mt-3 sm:mt-4 lg:mt-5 p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded shadow-lg border border-purple-400 space-y-2">
                <h3 className="font-bold text-responsive-base sm:text-responsive-lg text-white">Conversion</h3>
                <div className="space-y-2">
                  {convertMode === 'fi' ? (
                    <>
                      <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-purple-400">
                        <p className="text-xs text-purple-100">Total Inches</p>
                        <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                          {conversionResult.totalInches}"
                        </p>
                      </div>
                      <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-purple-400">
                        <p className="text-xs text-purple-100">Feet & Inches</p>
                        <p className="text-responsive-base sm:text-responsive-lg font-bold text-white">
                          {conversionResult.feetInches.feet}' {decimalToFraction(parseFloat(conversionResult.feetInches.inches))}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-purple-400">
                        <p className="text-xs text-purple-100">Decimal</p>
                        <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">
                          {conversionResult.decimal}
                        </p>
                      </div>
                      <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded border border-purple-400">
                        <p className="text-xs text-purple-100">Fraction</p>
                        <p className="text-responsive-base sm:text-responsive-lg font-bold text-white">
                          {conversionResult.fraction}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
