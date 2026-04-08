/**
 * Wood Movement Calculator - Estimate seasonal wood expansion/contraction
 * Based on moisture content changes and tangential movement
 */

import { WOOD_DATABASE } from './woodDatabase';

/**
 * Calculate width change from humidity change
 * Simplified: movement is roughly proportional to RH change
 *
 * @param {number} width - Piece width in inches
 * @param {number} movement - Wood movement % (from database)
 * @param {number} rhChange - Relative humidity change (0-100 scale)
 * @param {string} grain - 'radial' or 'tangential' (tangential is ~2x radial)
 * @returns {Object} { minWidth, maxWidth, change, changePercent }
 */
export function calculateMovement(width, movement, rhChange = 30, grain = 'tangential') {
  width = parseFloat(width) || 0;
  movement = parseFloat(movement) || 5;
  rhChange = parseFloat(rhChange) || 30;

  // Movement scales with RH change (0-100 = 0-full movement)
  const maxMovementAtFSP = movement; // movement % at full 0-FSP range
  const rhFactor = Math.min(rhChange / 100, 1); // normalize to 0-1
  const grainFactor = grain === 'radial' ? 0.5 : 1; // tangential is default (1x)

  const totalMovement = (maxMovementAtFSP * rhFactor * grainFactor) / 100;
  const widthChange = width * totalMovement;

  return {
    nominalWidth: width,
    minWidth: (width - widthChange).toFixed(4),
    maxWidth: (width + widthChange).toFixed(4),
    changeInches: widthChange.toFixed(4),
    changePercent: (totalMovement * 100).toFixed(2),
    rhChange: rhChange,
    grainDirection: grain,
    notes: grain === 'tangential' ? 'Surface grain direction' : 'Across grain rings',
  };
}

/**
 * Get seasonal extremes for a given location
 */
export const SEASONAL_RH = {
  'Desert (Dry)': { summer: 20, winter: 35, range: 15 },
  'Temperate': { summer: 65, winter: 35, range: 30 },
  'Humid (Coastal)': { summer: 80, winter: 50, range: 30 },
  'Very Humid': { summer: 85, winter: 70, range: 15 },
};

/**
 * Calculate movement between two seasons
 */
export function calculateSeasonalMovement(
  width,
  woodName,
  location = 'Temperate',
  grain = 'tangential'
) {
  const wood = WOOD_DATABASE.find((w) => w.name === woodName);
  if (!wood) return null;

  const rh = SEASONAL_RH[location];
  if (!rh) return null;

  return calculateMovement(width, wood.movement, rh.range, grain);
}

/**
 * Get stability recommendation
 */
export function getStabilityRating(movement) {
  if (movement < 3) return { rating: 'Excellent', color: 'green' };
  if (movement < 5) return { rating: 'Good', color: 'blue' };
  if (movement < 8) return { rating: 'Moderate', color: 'yellow' };
  return { rating: 'High', color: 'orange' };
}

/**
 * Recommendations for frame-and-panel construction
 */
export function getFramePanelAdvice(panelWidth, movement) {
  const safeGap = (panelWidth * movement) / 100 / 2; // half on each side

  return {
    recommendedGap: safeGap.toFixed(3),
    grooveWidthMin: (panelWidth - safeGap * 2).toFixed(3),
    tip: safeGap > 0.25 ? 'Consider floating panel or adjustable frame' : 'Standard frame construction OK',
  };
}
