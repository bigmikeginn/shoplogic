/**
 * Finish estimation calculator
 * Coverage rates from standard wood finishing data
 */

const FINISH_PRESETS = {
  oil: {
    name: 'Oil (Danish/Tung)',
    coverage: 350,  // sq ft per quart
    coats: 3,
    drySand: true,
    notes: 'Sand between coats, wipe-on application'
  },
  poly: {
    name: 'Polyurethane',
    coverage: 300,  // sq ft per quart (water-based; oil is ~275)
    coats: 3,
    drySand: true,
    notes: 'Sand between coats with 150-180 grit'
  },
  shellac: {
    name: 'Shellac (Flakes)',
    coverage: 400,  // sq ft per quart (varies by cut ratio)
    coats: 2,
    drySand: false,
    notes: '2-3lb cut ratio, excellent grain pop'
  }
};

/**
 * Calculate surface area from dimensions
 * @param {number} length - Length in inches
 * @param {number} width - Width in inches
 * @param {number} height - Height in inches (optional, for closed box)
 * @param {boolean} isClosed - True if calculating all 6 sides of box
 * @returns {number} Surface area in square feet
 */
export function calculateSurfaceArea(length, width, height = 0, isClosed = false) {
  let areaInches = 0;

  if (isClosed && height > 0) {
    // Closed box: 2(lw + lh + wh)
    areaInches = 2 * (length * width + length * height + width * height);
  } else if (height > 0) {
    // Open top: lw + 2lh + 2wh
    areaInches = length * width + 2 * length * height + 2 * width * height;
  } else {
    // Just a flat surface
    areaInches = length * width;
  }

  // Convert square inches to square feet
  return areaInches / 144;
}

/**
 * Calculate finish requirements
 * @param {number} areaSquareFeet
 * @param {string} finishType - 'oil', 'poly', or 'shellac'
 * @param {number} customCoats - Override number of coats
 * @returns {Object} { quarts, gallons, coats, coverage, finish details }
 */
export function calculateFinish(areaSquareFeet, finishType = 'poly', customCoats = null) {
  const finish = FINISH_PRESETS[finishType];
  if (!finish) return null;

  const coats = customCoats !== null ? customCoats : finish.coats;
  const totalCoverage = areaSquareFeet * coats;
  const quartsNeeded = totalCoverage / finish.coverage;
  const gallonsNeeded = quartsNeeded / 4;

  return {
    finishType,
    name: finish.name,
    areaSquareFeet: Math.round(areaSquareFeet * 100) / 100,
    coats,
    coverage: finish.coverage,
    quartsNeeded: Math.round(quartsNeeded * 10) / 10,
    gallonsNeeded: Math.round(gallonsNeeded * 100) / 100,
    drySand: finish.drySand,
    notes: finish.notes
  };
}

export { FINISH_PRESETS };
