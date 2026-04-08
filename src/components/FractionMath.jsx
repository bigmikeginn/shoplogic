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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Fraction Math</h2>
      <p className="text-sm text-gray-600 mb-6">Imperial shop measurements calculator</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('basic')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            tab === 'basic'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Calculator
        </button>
        <button
          onClick={() => setTab('convert')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            tab === 'convert'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Converter
        </button>
      </div>

      {/* Basic Calculator */}
      {tab === 'basic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-bold mb-4">Fraction Calculator</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">First Value</label>
                <input
                  type="text"
                  placeholder="2 1/2 or 2.5"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Decimal: {parseToDecimal(input1).toFixed(4)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Operation</label>
                <div className="grid grid-cols-4 gap-2">
                  {['+', '−', '×', '÷'].map((op) => (
                    <button
                      key={op}
                      onClick={() => setOperator(op)}
                      className={`py-2 rounded-md font-bold transition ${
                        operator === op
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Second Value</label>
                <input
                  type="text"
                  placeholder="1 3/4 or 1.75"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Decimal: {parseToDecimal(input2).toFixed(4)}
                </p>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4">
              <h3 className="font-bold mb-4">Result</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md border border-green-200">
                  <p className="text-xs text-gray-600">Fraction</p>
                  <p className="text-3xl font-bold text-green-700">
                    {decimalToFraction(result)}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md border border-green-200">
                  <p className="text-xs text-gray-600">Decimal</p>
                  <p className="text-2xl font-bold text-emerald-700">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-bold mb-4">Unit Converter</h3>

            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="convert"
                  checked={convertMode === 'fi'}
                  onChange={() => setConvertMode('fi')}
                  className="w-4 h-4"
                />
                <span className="text-sm">Feet & Inches</span>
              </label>
              <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="convert"
                  checked={convertMode === 'df'}
                  onChange={() => setConvertMode('df')}
                  className="w-4 h-4"
                />
                <span className="text-sm">Decimal ↔ Fraction</span>
              </label>
            </div>

            {convertMode === 'fi' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Feet</label>
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Inches (fraction or decimal)</label>
                  <input
                    type="text"
                    placeholder="3 1/2 or 3.5"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium">Decimal Value</label>
                <input
                  type="number"
                  step="0.0001"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Conversion Result */}
          {conversionResult && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-300 rounded-lg p-4">
              <h3 className="font-bold mb-4">Conversion</h3>
              <div className="space-y-3">
                {convertMode === 'fi' ? (
                  <>
                    <div className="bg-white p-3 rounded-md border border-purple-200">
                      <p className="text-xs text-gray-600">Total Inches</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {conversionResult.totalInches}"
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-purple-200">
                      <p className="text-xs text-gray-600">Feet & Inches</p>
                      <p className="text-2xl font-bold text-pink-700">
                        {conversionResult.feetInches.feet}' {decimalToFraction(parseFloat(conversionResult.feetInches.inches))}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white p-3 rounded-md border border-purple-200">
                      <p className="text-xs text-gray-600">Decimal</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {conversionResult.decimal}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-purple-200">
                      <p className="text-xs text-gray-600">Fraction</p>
                      <p className="text-2xl font-bold text-pink-700">
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
  );
}
