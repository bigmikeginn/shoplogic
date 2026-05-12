import { parseFraction } from './fractionParser';

/**
 * Calculate board feet: (Qty * Thickness * Width * Length) / 144
 * All dimensions in inches
 * @param {number} qty - Quantity
 * @param {number} thickness - In inches
 * @param {number} width - In inches
 * @param {number} length - In inches
 * @returns {number} Board feet (rounded to 2 decimals)
 */
export function calculateBoardFeet(qty, thickness, width, length) {
  const boardFeet = (qty * thickness * width * length) / 144;
  return Math.round(boardFeet * 100) / 100;
}

/**
 * Calculate board feet from string inputs (handles fractions)
 * @param {string} qtyStr
 * @param {string} thickStr
 * @param {string} widthStr
 * @param {string} lengthStr
 * @returns {object} Result object with totalBF and breakdown
 */
export function calculateFromStrings(qtyStr, thickStr, widthStr, lengthStr) {
  try {
    const qty = parseFraction(qtyStr);
    const thick = parseFraction(thickStr);
    const width = parseFraction(widthStr);
    const length = parseFraction(lengthStr);

    if (!qty || !thick || !width || !length) {
      return { error: 'Please enter all values' };
    }

    const totalBF = calculateBoardFeet(qty, thick, width, length);

    return {
      totalBF,
      pieces: qty,
      thicknessText: thickStr,
      width,
      length
    };
  } catch (err) {
    return { error: 'Invalid input. Check your values.' };
  }
}
