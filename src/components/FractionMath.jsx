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
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto scrollbar-styled flex items-start justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl">
        <h2 className="text-responsive-2xl font-bold mb-2 text-white">Fraction Math</h2>
        <p className="text-responsive-base text-gray-300 mb-6 sm:mb-8">Imperial shop measurements calculator</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setTab('basic')}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              tab === 'basic'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-opacity-70'
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setTab('convert')}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
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
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-responsive-base font-medium text-gray-300">First Value</label>
              <input
                type="text"
                placeholder="2 1/2 or 2.5"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className="input-modern text-responsive-base"
              />
              <p className="text-xs text-gray-400 mt-1">
                Decimal: {parseToDecimal(input1).toFixed(4)}
              </p>
            </div>

            <div>
              <label className="text-responsive-base font-medium text-gray-300">Operation</label>
              <div className="grid grid-cols-4 gap-2">
                {['+', '−', '×', '÷'].map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperator(op)}
                    className={`py-2 rounded-lg font-bold transition ${
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

            <div>
              <label className="text-responsive-base font-medium text-gray-300">Second Value</label>
              <input
                type="text"
                placeholder="1 3/4 or 1.75"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="input-modern text-responsive-base"
              />
              <p className="text-xs text-gray-400 mt-1">
                Decimal: {parseToDecimal(input2).toFixed(4)}
              </p>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-lg hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-responsive-lg"
            >
              Calculate
            </button>

            {/* Result */}
            {result !== null && (
              <div className="mt-6 sm:mt-8 p-6 sm:p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg border border-green-400">
                <h3 className="font-bold mb-4 text-responsive-lg text-white">Result</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-green-400">
                    <p className="text-xs text-green-100">Fraction</p>
                    <p className="text-responsive-2xl font-bold text-white">
                      {decimalToFraction(result)}
                    </p>
                  </div>
                  <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-green-400">
                    <p className="text-xs text-green-100">Decimal</p>
                    <p className="text-responsive-xl font-bold text-white">
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
            <h3 className="font-bold text-responsive-lg text-white">Unit Converter</h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-700">
              <label className="flex items-center gap-2 p-3 bg-gray-800 bg-opacity-30 rounded-lg cursor-pointer hover:bg-opacity-50 transition border border-gray-700">
                <input
                  type="radio"
                  name="convert"
                  checked={convertMode === 'fi'}
                  onChange={() => setConvertMode('fi')}
                  className="w-4 h-4"
                />
                <span className="text-responsive-base text-gray-300">Feet & Inches</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-gray-800 bg-opacity-30 rounded-lg cursor-pointer hover:bg-opacity-50 transition border border-gray-700">
                <input
                  type="radio"
                  name="convert"
                  checked={convertMode === 'df'}
                  onChange={() => setConvertMode('df')}
                  className="w-4 h-4"
                />
                <span className="text-responsive-base text-gray-300">Decimal ↔ Fraction</span>
              </label>
            </div>

            {convertMode === 'fi' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-responsive-base font-medium text-gray-300">Feet</label>
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="input-modern text-responsive-base"
                  />
                </div>
                <div>
                  <label className="text-responsive-base font-medium text-gray-300">Inches (fraction or decimal)</label>
                  <input
                    type="text"
                    placeholder="3 1/2 or 3.5"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className="input-modern text-responsive-base"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-responsive-base font-medium text-gray-300">Decimal Value</label>
                <input
                  type="number"
                  step="0.0001"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  className="input-modern text-responsive-base"
                />
              </div>
            )}

            {/* Conversion Result */}
            {conversionResult && (
              <div className="mt-6 sm:mt-8 p-6 sm:p-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg border border-purple-400">
                <h3 className="font-bold mb-4 text-responsive-lg text-white">Conversion</h3>
                <div className="space-y-3">
                  {convertMode === 'fi' ? (
                    <>
                      <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-purple-400">
                        <p className="text-xs text-purple-100">Total Inches</p>
                        <p className="text-responsive-2xl font-bold text-white">
                          {conversionResult.totalInches}"
                        </p>
                      </div>
                      <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-purple-400">
                        <p className="text-xs text-purple-100">Feet & Inches</p>
                        <p className="text-responsive-xl font-bold text-white">
                          {conversionResult.feetInches.feet}' {decimalToFraction(parseFloat(conversionResult.feetInches.inches))}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-purple-400">
                        <p className="text-xs text-purple-100">Decimal</p>
                        <p className="text-responsive-2xl font-bold text-white">
                          {conversionResult.decimal}
                        </p>
                      </div>
                      <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-purple-400">
                        <p className="text-xs text-purple-100">Fraction</p>
                        <p className="text-responsive-xl font-bold text-white">
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
