/**
 * Arc & Radius Calculator
 *
 * Computes arc geometry from two known values.
 * Useful for arched doorways, curved furniture parts, bent laminations.
 *
 * Terminology:
 *   Chord (c) — straight-line distance between arc endpoints
 *   Rise (r) — height from chord midpoint to arc peak (also called sagitta)
 *   Radius (R) — full circle radius
 *   Arc length (L) — curved distance along the arc
 *   Angle (θ) — central angle in degrees
 *   Segment area — area between chord and arc
 */

/**
 * Calculate arc from chord and rise.
 */
export function arcFromChordRise(chord, rise) {
  chord = parseFloat(chord) || 0;
  rise = parseFloat(rise) || 0;

  if (chord <= 0 || rise <= 0) return { error: 'Enter valid chord and rise' };

  // Radius: R = (c²/(8r)) + (r/2)
  const radius = (Math.pow(chord, 2) / (8 * rise)) + (rise / 2);
  return completeArcCalculations(chord, radius);
}

/**
 * Calculate arc from chord and radius.
 */
export function arcFromChordRadius(chord, radius) {
  chord = parseFloat(chord) || 0;
  radius = parseFloat(radius) || 0;

  if (chord <= 0 || radius <= 0) return { error: 'Enter valid chord and radius' };
  if (chord > radius * 2) return { error: 'Chord cannot exceed diameter (2 × radius)' };

  return completeArcCalculations(chord, radius);
}

/**
 * Calculate arc from radius and rise.
 */
export function arcFromRadiusRise(radius, rise) {
  radius = parseFloat(radius) || 0;
  rise = parseFloat(rise) || 0;

  if (radius <= 0 || rise <= 0) return { error: 'Enter valid radius and rise' };
  if (rise > radius * 2) return { error: 'Rise cannot exceed diameter (2 × radius)' };

  // Chord: c = 2 × √(2Rr - r²)
  const chord = 2 * Math.sqrt(2 * radius * rise - Math.pow(rise, 2));
  return completeArcCalculations(chord, radius);
}

/**
 * Calculate arc from radius and angle.
 */
export function arcFromRadiusAngle(radius, angle) {
  radius = parseFloat(radius) || 0;
  angle = parseFloat(angle) || 0;

  if (radius <= 0 || angle <= 0 || angle >= 360) {
    return { error: 'Enter valid radius and angle (0°–360°)' };
  }

  const angleRad = (angle * Math.PI) / 180;
  const chord = 2 * radius * Math.sin(angleRad / 2);
  return completeArcCalculations(chord, radius);
}

/**
 * Common calculation endpoint — given chord and radius, compute everything.
 */
function completeArcCalculations(chord, radius) {
  // Half-angle: sin(θ/2) = c/(2R)
  const halfAngleRad = Math.asin(chord / (2 * radius));
  const angleRad = halfAngleRad * 2;
  const angleDeg = (angleRad * 180) / Math.PI;

  // Arc length
  const arcLength = radius * angleRad;

  // Rise: r = R - R·cos(θ/2) = R(1 - cos(θ/2))
  const rise = radius * (1 - Math.cos(halfAngleRad));

  // Segment area: (R²/2)(θ - sinθ) where θ in radians
  const segmentArea = (Math.pow(radius, 2) / 2) * (angleRad - Math.sin(angleRad));

  // Sector area: (θ/2π) × πR² = (θ·R²)/2
  const sectorArea = (angleRad * Math.pow(radius, 2)) / 2;

  // Full circle area and circumference
  const circleArea = Math.PI * Math.pow(radius, 2);
  const circumference = 2 * Math.PI * radius;

  // Chord height (distance from chord to opposite arc edge)
  const chordHeight = radius + rise;

  return {
    chord: Math.round(chord * 1000) / 1000,
    rise: Math.round(rise * 1000) / 1000,
    radius: Math.round(radius * 1000) / 1000,
    angle: Math.round(angleDeg * 100) / 100,
    arcLength: Math.round(arcLength * 1000) / 1000,
    segmentArea: Math.round(segmentArea * 1000) / 1000,
    sectorArea: Math.round(sectorArea * 1000) / 1000,
    chordHeight: Math.round(chordHeight * 1000) / 1000,
    circleArea: Math.round(circleArea * 100) / 100,
    circumference: Math.round(circumference * 100) / 100,
    isSemicircle: Math.abs(angleDeg - 180) < 0.1,
    isQuarterCircle: Math.abs(angleDeg - 90) < 0.1,
  };
}

/**
 * Calculate bent lamination: number of plies to bend to a radius without breaking.
 * Rule of thumb: min radius = thickness × 50 (for most hardwoods with 1/8" plies)
 * @param {number} radius — Target bend radius in inches
 * @param {number} totalThickness — Desired final thickness in inches
 * @param {number} plyThickness — Individual ply thickness (default 1/8" = 0.125)
 * @returns {{ plies, actualThickness, maxBendRadius, isFeasible }}
 */
export function bentLaminationPlies(radius, totalThickness = 0.75, plyThickness = 0.125) {
  radius = parseFloat(radius) || 0;
  totalThickness = parseFloat(totalThickness) || 0;
  plyThickness = parseFloat(plyThickness) || 0.125;

  if (radius <= 0 || totalThickness <= 0) {
    return { error: 'Enter valid radius and thickness' };
  }

  // Max radius each ply can bend: thickness × 50 (conservative)
  const maxPlyBendRadius = plyThickness * 50;
  const pliesNeeded = Math.ceil(totalThickness / plyThickness);
  const actualThickness = pliesNeeded * plyThickness;
  const isFeasible = radius >= maxPlyBendRadius;

  return {
    targetRadius: radius,
    totalThickness,
    plyThickness,
    pliesNeeded,
    actualThickness: Math.round(actualThickness * 1000) / 1000,
    maxPlyBendRadius: Math.round(maxPlyBendRadius * 100) / 100,
    isFeasible,
    tip: isFeasible
      ? `${pliesNeeded} plies of ${plyThickness}" should bend to ${radius}" radius`
      : `Radius too tight — try thinner plies (max bend radius for ${plyThickness}" ply: ${maxPlyBendRadius}")`,
  };
}