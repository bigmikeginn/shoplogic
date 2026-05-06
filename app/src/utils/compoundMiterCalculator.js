/**
 * Compound Miter Calculator
 *
 * For crown molding and compound-angle joinery.
 * Given spring angle, wall corner angle, and optional slope,
 * computes the miter angle (saw rotation) and bevel angle (blade tilt).
 *
 * Formulas (standard compound miter):
 *   M = atan(sin(W) / (tan(S) + cos(W) * tan(H)))
 *   B = asin(cos(W) * cos(S) - sin(W) * sin(S) * cos(H))
 *   Where: W = wall angle / 2, S = spring angle, H = 0 (horizontal crown)
 *
 * Simplified for flat crown (horizontal = 0° slope):
 *   Miter = atan(sin(W) / tan(S))
 *   Bevel = asin(cos(W) * cos(S))
 */

export const COMMON_SPRING_ANGLES = [
  { value: 38, label: '38° (standard crown)' },
  { value: 45, label: '45° (standard crown)' },
  { value: 52, label: '52° (standard crown)' },
];

export const COMMON_WALL_ANGLES = [
  { value: 90, label: '90° (inside corner)' },
  { value: 135, label: '135° (octagon)' },
  { value: 120, label: '120° (hexagon)' },
  { value: 45, label: '45° (acute corner)' },
  { value: 270, label: '270° (outside corner)' },
];

/**
 * Calculate miter and bevel angles for compound crown molding.
 * @param {number} wallAngle — Wall corner angle in degrees (inside corners < 180, outside > 180)
 * @param {number} springAngle — Crown spring angle in degrees (38, 45, or 52 are common)
 * @param {number} slope — Roof slope from horizontal in degrees (0 for flat ceiling crown)
 * @returns {{ miterAngle: number, bevelAngle: number, sawSettings: object }}
 */
export function calculateCompoundMiter(wallAngle = 90, springAngle = 38, slope = 0) {
  wallAngle = parseFloat(wallAngle) || 90;
  springAngle = parseFloat(springAngle) || 38;
  slope = parseFloat(slope) || 0;

  // Convert to radians
  const W = ((wallAngle / 2) * Math.PI) / 180;
  const S = (springAngle * Math.PI) / 180;
  const H = (slope * Math.PI) / 180;

  // Miter angle
  const tanM = Math.sin(W) / (Math.tan(S) + Math.cos(W) * Math.tan(H));
  const miterAngle = (Math.atan(tanM) * 180) / Math.PI;

  // Bevel angle
  const sinB = Math.cos(W) * Math.cos(S) - Math.sin(W) * Math.sin(S) * Math.cos(H);
  const bevelAngle = (Math.asin(Math.max(-1, Math.min(1, sinB))) * 180) / Math.PI;

  return {
    wallAngle: Math.round(wallAngle * 10) / 10,
    springAngle: Math.round(springAngle * 10) / 10,
    slope: Math.round(slope * 10) / 10,
    miterAngle: Math.round(miterAngle * 100) / 100,
    bevelAngle: Math.round(bevelAngle * 100) / 100,
    sawSettings: {
      miter: `${Math.round(miterAngle * 100) / 100}°`,
      bevel: `${Math.round(bevelAngle * 100) / 100}°`,
      tip: miterAngle < 0
        ? 'Negative miter — flip piece or use opposite scale'
        : 'Standard setup',
    },
  };
}

/**
 * Quick miter for simple (non-compound) cuts at wall angles.
 */
export function calculateSimpleMiter(wallAngle = 90) {
  wallAngle = parseFloat(wallAngle) || 90;
  const miterAngle = wallAngle / 2;
  return {
    wallAngle,
    miterAngle: Math.round(miterAngle * 100) / 100,
    complementary: Math.round((90 - miterAngle) * 100) / 100,
  };
}