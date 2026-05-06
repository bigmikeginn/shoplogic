import { useState, useCallback } from "react";
import {
  calculateGoldenLinear,
  calculateGoldenArea,
  PHI,
  PHI_SQUARED,
  FRACTION_DENOMINATORS,
  decimalToFractionString,
} from "../utils/goldenRatio";

function FractionLabel({ decimal, denominator }) {
  const fraction = decimalToFractionString(decimal, denominator);
  if (!fraction) return null;
  return (
    <span className="text-responsive-xs text-amber-200 ml-2">
      ≈ {fraction}"
    </span>
  );
}

export default function GoldenRatio() {
  const [mode, setMode] = useState("linear");
  const [inputValue, setInputValue] = useState("");
  const [precision, setPrecision] = useState(0); // 0 = decimal only
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      setResult(null);
      return;
    }

    if (mode === "linear") {
      setResult({ type: "linear", ...calculateGoldenLinear(val) });
    } else {
      setResult({ type: "area", ...calculateGoldenArea(val) });
    }
  }, [inputValue, mode]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">
          Golden Ratio
        </h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-1 text-center">
          φ = {PHI.toFixed(4)}
        </p>
        <p className="text-responsive-xs text-gray-400 mb-3 sm:mb-4 text-center">
          Adjacent dimensions proportioned by φ (linear) or φ² (area)
        </p>

        {/* Mode toggle */}
        <div className="flex rounded-lg overflow-hidden mb-3 sm:mb-4 border border-gray-600">
          <button
            onClick={() => {
              setMode("linear");
              setResult(null);
            }}
            className={`flex-1 py-2 text-sm sm:text-base font-medium transition-colors ${
              mode === "linear"
                ? "bg-amber-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Length / Width
          </button>
          <button
            onClick={() => {
              setMode("area");
              setResult(null);
            }}
            className={`flex-1 py-2 text-sm sm:text-base font-medium transition-colors ${
              mode === "area"
                ? "bg-amber-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Area
          </button>
        </div>

        {/* Input */}
        <div className="form-compact">
          <input
            type="text"
            placeholder={
              mode === "linear"
                ? "Enter length (e.g., 24)"
                : "Enter area (e.g., 144)"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input-modern"
          />
        </div>

        {/* Fraction precision selector */}
        <div className="mt-3 sm:mt-4">
          <label className="block text-responsive-xs text-gray-400 mb-1">
            Round results to:
          </label>
          <div className="flex flex-wrap gap-1">
            {FRACTION_DENOMINATORS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPrecision(opt.value)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  precision === opt.value
                    ? "bg-amber-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-3 sm:mt-4 lg:mt-5 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 text-white py-2 sm:py-3 lg:py-4 rounded hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all font-semibold text-sm sm:text-base lg:text-lg"
        >
          Calculate
        </button>

        {/* Results */}
        {result && (
          <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3">
            {/* Larger */}
            <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded shadow-lg border border-amber-400">
              <p className="text-responsive-xs text-amber-100 mb-1">
                {result.type === "linear"
                  ? "Larger Adjacent (× φ)"
                  : "Larger Adjacent (× φ²)"}
              </p>
              <div className="flex items-baseline flex-wrap">
                <p className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold text-white">
                  {result.larger.toFixed(4)}
                </p>
                <FractionLabel
                  decimal={result.larger}
                  denominator={precision}
                />
              </div>
              <p className="text-responsive-xs text-amber-200 mt-1">
                {inputValue || "0"} ×{" "}
                {(
                  result.type === "linear" ? PHI : PHI_SQUARED
                ).toFixed(4)}{" "}
                = {result.larger.toFixed(4)}
              </p>
            </div>

            {/* Input value (center reference) */}
            <div className="p-4 sm:p-5 lg:p-6 bg-gray-700 bg-opacity-50 rounded shadow border border-gray-600">
              <p className="text-responsive-xs text-gray-400 mb-1">
                Your {result.type === "linear" ? "Length" : "Area"}
              </p>
              <div className="flex items-baseline flex-wrap">
                <p className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold text-white">
                  {parseFloat(inputValue).toFixed(4)}
                </p>
                <FractionLabel
                  decimal={parseFloat(inputValue)}
                  denominator={precision}
                />
              </div>
            </div>

            {/* Smaller */}
            <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-amber-600 to-yellow-700 rounded shadow-lg border border-amber-500">
              <p className="text-responsive-xs text-amber-100 mb-1">
                {result.type === "linear"
                  ? "Smaller Adjacent (÷ φ)"
                  : "Smaller Adjacent (÷ φ²)"}
              </p>
              <div className="flex items-baseline flex-wrap">
                <p className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold text-white">
                  {result.smaller.toFixed(4)}
                </p>
                <FractionLabel
                  decimal={result.smaller}
                  denominator={precision}
                />
              </div>
              <p className="text-responsive-xs text-amber-200 mt-1">
                {inputValue || "0"} ÷{" "}
                {(
                  result.type === "linear" ? PHI : PHI_SQUARED
                ).toFixed(4)}{" "}
                = {result.smaller.toFixed(4)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}