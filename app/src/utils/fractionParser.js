/**
 * Parse fraction or decimal string to number
 * Supports: "2", "2.5", "2 1/2", "1/2"
 * @param {string} input
 * @returns {number}
 */
export function parseFraction(input) {
  if (!input || typeof input !== 'string') return 0;

  input = input.trim();

  // Decimal: "2.5"
  if (!input.includes('/')) {
    return parseFloat(input) || 0;
  }

  // Mixed: "2 1/2"
  const mixedMatch = input.match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const num = parseFloat(mixedMatch[2]);
    const denom = parseFloat(mixedMatch[3]);
    return whole + (num / denom);
  }

  // Simple: "1/2"
  const simpleMatch = input.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (simpleMatch) {
    return parseFloat(simpleMatch[1]) / parseFloat(simpleMatch[2]);
  }

  return 0;
}
