/**
 * Golden Ratio Calculator
 * φ (phi) = (1 + √5) / 2 ≈ 1.61803398875
 *
 * For linear dimensions (lengths, widths, etc.):
 *   - Larger adjacent = value × φ
 *   - Smaller adjacent = value / φ
 *
 * For areas (scales by φ² ≈ 2.618):
 *   - Larger adjacent area = value × φ²
 *   - Smaller adjacent area = value / φ²
 */
export const PHI = (1 + Math.sqrt(5)) / 2; // ≈ 1.61803398875
export const PHI_SQUARED = PHI * PHI; // ≈ 2.61803398875

/** Available fractional precision options */
export const FRACTION_DENOMINATORS = [
  { value: 0, label: 'Decimal only' },
  { value: 2, label: 'Nearest 1/2' },
  { value: 4, label: 'Nearest 1/4' },
  { value: 8, label: 'Nearest 1/8' },
  { value: 16, label: 'Nearest 1/16' },
  { value: 32, label: 'Nearest 1/32' },
  { value: 64, label: 'Nearest 1/64' },
];

/**
 * Convert decimal to fraction string with a given denominator
 * e.g., 14.8328 with denom 32 → "14 27/32"
 * @param {number} decimal
 * @param {number} denominator - 2, 4, 8, 16, 32, 64, etc.
 * @returns {string}
 */
export function decimalToFractionString(decimal, denominator) {
  if (denominator === 0 || !denominator) return null;
  const whole = Math.floor(decimal);
  const remainder = decimal - whole;
  if (remainder === 0) return whole.toString();
  const num = Math.round(remainder * denominator);
  if (num === 0) return whole.toString();
  if (num === denominator) return (whole + 1).toString();
  const reduced = reduceFraction(num, denominator);
  if (whole === 0) {
    return `${reduced.numerator}/${reduced.denominator}`;
  }
  return `${whole} ${reduced.numerator}/${reduced.denominator}`;
}

function reduceFraction(num, denom) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(Math.abs(num), Math.abs(denom));
  return { numerator: num / divisor, denominator: denom / divisor };
}

/**
 * Calculate golden ratio neighbors for a linear value
 * @param {number} value
 * @returns {{ smaller: number, larger: number, phi: number }}
 */
export function calculateGoldenLinear(value) {
  const smaller = value / PHI;
  const larger = value * PHI;
  return {
    value,
    smaller: Math.round(smaller * 10000) / 10000,
    larger: Math.round(larger * 10000) / 10000,
    phi: PHI,
  };
}

/**
 * Calculate golden ratio neighbors for an area value (scales by φ²)
 * @param {number} area
 * @returns {{ smaller: number, larger: number, phiSquared: number }}
 */
export function calculateGoldenArea(area) {
  const smaller = area / PHI_SQUARED;
  const larger = area * PHI_SQUARED;
  return {
    value: area,
    smaller: Math.round(smaller * 10000) / 10000,
    larger: Math.round(larger * 10000) / 10000,
    phiSquared: PHI_SQUARED,
  };
}
