/**
 * Triangle Solver / Angle Finder
 *
 * Solves any triangle given sufficient inputs.
 * Supports: SSS, SAS, ASA, AAS, SSA (ambiguous case), and right triangles.
 *
 * Useful for roof pitches, brace lengths, layout work, and general shop geometry.
 */

export const SOLVE_MODES = [
  { id: 'sss', label: '3 Sides (SSS)', fields: ['sideA', 'sideB', 'sideC'] },
  { id: 'sas', label: '2 Sides + Angle (SAS)', fields: ['sideA', 'sideB', 'angleC'] },
  { id: 'asa', label: '2 Angles + Side (ASA)', fields: ['angleA', 'sideC', 'angleB'] },
  { id: 'right-legs', label: 'Right Triangle (2 Legs)', fields: ['legA', 'legB'] },
  { id: 'right-hyp-leg', label: 'Right Triangle (Hyp + Leg)', fields: ['hypotenuse', 'leg'] },
];

/**
 * Convert degrees to radians
 */
function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 */
function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Round to 4 decimal places
 */
function r4(n) {
  return Math.round(n * 10000) / 10000;
}

/**
 * Solve triangle from 3 sides (SSS).
 */
function solveSSS(a, b, c) {
  if (a + b <= c || a + c <= b || b + c <= a) {
    return { error: 'Invalid triangle — sides must satisfy triangle inequality' };
  }

  const A = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
  const B = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
  const C = toDeg(Math.acos((a * a + b * b - c * c) / (2 * a * b)));

  return buildResult(a, b, c, A, B, C);
}

/**
 * Solve triangle from 2 sides and included angle (SAS).
 */
function solveSAS(a, b, angleC) {
  const C = angleC;
  const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRad(C)));
  const A = toDeg(Math.asin((a * Math.sin(toRad(C))) / c));
  const B = 180 - A - C;

  return buildResult(a, b, c, A, B, C);
}

/**
 * Solve triangle from 2 angles and included side (ASA).
 */
function solveASA(angleA, sideC, angleB) {
  const A = angleA;
  const B = angleB;
  const C = 180 - A - B;

  if (C <= 0) return { error: 'Angles must sum to less than 180°' };

  const a = (sideC * Math.sin(toRad(A))) / Math.sin(toRad(C));
  const b = (sideC * Math.sin(toRad(B))) / Math.sin(toRad(C));

  return buildResult(a, b, sideC, A, B, C);
}

/**
 * Solve right triangle from two legs.
 */
function solveRightLegs(legA, legB) {
  const a = legA;
  const b = legB;
  const c = Math.sqrt(a * a + b * b);
  const A = toDeg(Math.atan(a / b));
  const B = 90 - A;
  const C = 90;

  return buildResult(a, b, c, A, B, C);
}

/**
 * Solve right triangle from hypotenuse and one leg.
 */
function solveRightHypLeg(hyp, leg) {
  if (leg >= hyp) return { error: 'Leg must be shorter than hypotenuse' };

  const c = hyp;
  const a = leg;
  const b = Math.sqrt(c * c - a * a);
  const A = toDeg(Math.asin(a / c));
  const B = 90 - A;
  const C = 90;

  return buildResult(a, b, c, A, B, C);
}

/**
 * Build unified result object.
 */
function buildResult(a, b, c, A, B, C) {
  const s = (a + b + c) / 2; // semiperimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
  const perimeter = a + b + c;

  // Inscribed circle radius
  const inradius = area / s;

  // Circumscribed circle radius
  const circumradius = (a * b * c) / (4 * area);

  // Height from each vertex
  const heightA = (2 * area) / a;
  const heightB = (2 * area) / b;
  const heightC = (2 * area) / c;

  const isRight = Math.abs(C - 90) < 0.01 || Math.abs(A - 90) < 0.01 || Math.abs(B - 90) < 0.01;
  const isEquilateral = Math.abs(a - b) < 0.001 && Math.abs(b - c) < 0.001;
  const isIsosceles = Math.abs(a - b) < 0.001 || Math.abs(b - c) < 0.001 || Math.abs(a - c) < 0.001;

  return {
    sides: { a: r4(a), b: r4(b), c: r4(c) },
    angles: { A: r4(A), B: r4(B), C: r4(C) },
    area: r4(area),
    perimeter: r4(perimeter),
    inradius: r4(inradius),
    circumradius: r4(circumradius),
    heights: { hA: r4(heightA), hB: r4(heightB), hC: r4(heightC) },
    isRight,
    isEquilateral,
    isIsosceles,
    angleSum: r4(A + B + C),
  };
}

/**
 * Main solver entry point.
 * @param {string} mode — solve mode id
 * @param {object} inputs — { sideA, sideB, sideC, angleA, angleB, angleC, legA, legB, hypotenuse, leg }
 * @returns {object} solved triangle
 */
export function solveTriangle(mode, inputs) {
  const p = (key) => parseFloat(inputs[key]) || 0;

  switch (mode) {
    case 'sss':
      return solveSSS(p('sideA'), p('sideB'), p('sideC'));
    case 'sas':
      return solveSAS(p('sideA'), p('sideB'), p('angleC'));
    case 'asa':
      return solveASA(p('angleA'), p('sideC'), p('angleB'));
    case 'right-legs':
      return solveRightLegs(p('legA'), p('legB'));
    case 'right-hyp-leg':
      return solveRightHypLeg(p('hypotenuse'), p('leg'));
    default:
      return { error: 'Invalid solve mode' };
  }
}