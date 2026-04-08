/**
 * Fraction math utilities for imperial measurements
 */

/**
 * Parse string to decimal (handles "2 1/2", "2.5", "1/2", "2")
 */
export function parseToDecimal(str) {
  if (!str || typeof str !== 'string') return 0;
  str = str.trim();

  if (!str.includes('/')) {
    return parseFloat(str) || 0;
  }

  const mixedMatch = str.match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (mixedMatch) {
    return parseFloat(mixedMatch[1]) + parseFloat(mixedMatch[2]) / parseFloat(mixedMatch[3]);
  }

  const simpleMatch = str.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (simpleMatch) {
    return parseFloat(simpleMatch[1]) / parseFloat(simpleMatch[2]);
  }

  return 0;
}

/**
 * Convert decimal to fraction string with common denominators (halves to thirty-seconds)
 */
export function decimalToFraction(decimal, denominator = 32) {
  decimal = parseFloat(decimal) || 0;
  const whole = Math.floor(decimal);
  const remainder = decimal - whole;

  if (remainder === 0) return whole.toString();

  const numerator = Math.round(remainder * denominator);
  const reducedFraction = reduceFraction(numerator, denominator);

  if (reducedFraction.numerator === 0) return whole.toString();
  if (whole === 0) {
    return `${reducedFraction.numerator}/${reducedFraction.denominator}`;
  }
  return `${whole} ${reducedFraction.numerator}/${reducedFraction.denominator}`;
}

/**
 * Reduce fraction to lowest terms
 */
export function reduceFraction(num, denom) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(Math.abs(num), Math.abs(denom));
  return {
    numerator: num / divisor,
    denominator: denom / divisor
  };
}

/**
 * Arithmetic operations
 */
export function add(a, b) {
  return parseToDecimal(a) + parseToDecimal(b);
}

export function subtract(a, b) {
  return parseToDecimal(a) - parseToDecimal(b);
}

export function multiply(a, b) {
  return parseToDecimal(a) * parseToDecimal(b);
}

export function divide(a, b) {
  const divisor = parseToDecimal(b);
  if (divisor === 0) return null;
  return parseToDecimal(a) / divisor;
}

/**
 * Convert feet and inches to decimal inches
 */
export function feetInchesToInches(feet, inches) {
  return (parseFloat(feet) || 0) * 12 + parseToDecimal(inches);
}

/**
 * Convert decimal inches to feet and inches
 */
export function inchesToFeetInches(totalInches) {
  totalInches = parseFloat(totalInches) || 0;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches: inches.toFixed(4) };
}
