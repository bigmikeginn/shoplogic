/**
 * Stair Calculator — Rise/run calculations with building code defaults.
 *
 * Common code constraints (IRC):
 *   - Max riser: 7 3/4" (7.75)
 *   - Min tread depth: 10"
 *   - Ideal rise + run ≈ 17"–18"
 *   - Headroom min: 80"
 */

/** Default code values (can be overridden) */
export const STAIR_DEFAULTS = {
  maxRiser: 7.75,
  minTread: 10,
  idealRiseRunSum: 17.5,
  minHeadroom: 80,
  standardStringerHeight: 11.25, // 2×12
};

/**
 * Calculate stair dimensions from total rise (in inches).
 * @param {number} totalRise — Floor-to-floor height in inches
 * @param {number} totalRun — Available horizontal run in inches (optional, use 0 if unlimited)
 * @param {object} constraints — Override defaults { maxRiser, minTread }
 * @returns {object} { risers, treads, riserHeight, treadDepth, totalRun, angle, stringerLength, isCodeCompliant, notes }
 */
export function calculateStairs(totalRise, totalRun = 0, constraints = {}) {
  const maxR = constraints.maxRiser || STAIR_DEFAULTS.maxRiser;
  const minT = constraints.minTread || STAIR_DEFAULTS.minTread;
  totalRise = parseFloat(totalRise) || 0;
  totalRun = parseFloat(totalRun) || 0;

  if (totalRise <= 0) {
    return { error: 'Enter a valid total rise' };
  }

  // Calculate number of risers needed
  const rawRiserCount = totalRise / maxR;
  const risers = Math.ceil(rawRiserCount);
  const riserHeight = totalRise / risers;
  const treads = risers - 1;

  // Default tread depth (ideal rule: rise + run ≈ 17.5)
  const idealTread = Math.max(STAIR_DEFAULTS.idealRiseRunSum - riserHeight, minT);
  const treadDepth = Math.round(idealTread * 100) / 100;

  // Total run
  const calculatedRun = treads * treadDepth;
  const actualTotalRun = totalRun > 0 ? totalRun : null;

  // Angle
  const angle = (Math.atan(riserHeight / treadDepth) * 180) / Math.PI;

  // Stringer length (hypotenuse)
  const stringerRise = risers * riserHeight;
  const stringerRun = treads * treadDepth;
  const stringerLength = Math.sqrt(stringerRise ** 2 + stringerRun ** 2);

  // Code compliance checks
  const issues = [];
  if (riserHeight > maxR) issues.push(`Riser ${riserHeight.toFixed(2)}" exceeds max ${maxR}"`);
  if (treadDepth < minT) issues.push(`Tread ${treadDepth.toFixed(2)}" below min ${minT}"`);
  if (actualTotalRun !== null && calculatedRun > actualTotalRun) {
    issues.push(`Total run ${calculatedRun.toFixed(1)}" exceeds available ${actualTotalRun}" — reduce tread depth or add landing`);
  }
  const riseRunSum = riserHeight + treadDepth;
  if (riseRunSum < 17 || riseRunSum > 18) {
    issues.push(`Rise + run = ${riseRunSum.toFixed(2)}" (ideal: 17"–18")`);
  }
  if (risers < 3) issues.push('Minimum 3 risers for code compliance');
  if (risers > 16 && actualTotalRun === null) issues.push('More than 16 risers — landing required per code');

  const isCodeCompliant = issues.length === 0;

  return {
    totalRise: Math.round(totalRise * 100) / 100,
    risers,
    treads,
    riserHeight: Math.round(riserHeight * 1000) / 1000,
    treadDepth: Math.round(treadDepth * 100) / 100,
    totalRun: Math.round(calculatedRun * 100) / 100,
    availableRun: actualTotalRun !== null ? Math.round(actualTotalRun * 100) / 100 : null,
    angle: Math.round(angle * 10) / 10,
    stringerLength: Math.round(stringerLength * 100) / 100,
    riseRunSum: Math.round(riseRunSum * 100) / 100,
    isCodeCompliant,
    issues,
  };
}

/**
 * Calculate stringer layout dimensions (for marking)
 */
export function calculateStringerLayout(riserHeight, treadDepth, risers) {
  const result = calculateStairs(riserHeight * risers, 0);
  if (result.error) return result;

  return {
    riserHeight: result.riserHeight,
    treadDepth: result.treadDepth,
    angle: result.angle,
    stringerLength: result.stringerLength,
    numberOfTreads: result.treads,
    numberOfRisers: risers,
    // Bottom riser is typically shorter (riserHeight - tread thickness)
    bottomRiserHeight: Math.round((result.riserHeight - 1) * 1000) / 1000,
  };
}