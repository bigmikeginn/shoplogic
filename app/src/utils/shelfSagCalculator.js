/**
 * Shelf Sag Calculator
 *
 * Estimates shelf deflection under load using beam deflection formulas.
 * Based on wood species modulus of elasticity (MOE) from the wood database.
 *
 * Simply-supported beam, uniformly distributed load:
 *   Deflection = (5 × w × L⁴) / (384 × E × I)
 *   Where: w = load per inch, L = span, E = MOE, I = moment of inertia
 *
 * I (rectangular cross-section) = (b × h³) / 12
 *   b = shelf depth, h = shelf thickness
 */

import { WOOD_DATABASE } from './woodDatabase';

/** MOE values for common wood species (psi × 10⁶) */
const WOOD_MOE = {
  'White Oak': 1.78,
  'Red Oak': 1.82,
  'Walnut': 1.68,
  'Maple (Hard)': 1.83,
  'Cherry': 1.49,
  'Ash': 1.74,
  'Poplar': 1.45,
  'Pine (Eastern)': 1.29,
  'Mahogany': 1.35,
  'Teak': 1.55,
  'Birch': 2.01,
  'Hickory': 2.16,
};

/** Default MOE for "unknown" hardwood */
const DEFAULT_MOE = 1.5;

/** Common shelf materials */
export const SHELF_MATERIALS = [
  { name: 'Plywood (birch)', moe: 1.8, density: 0.68 },
  { name: 'Plywood (oak)', moe: 1.6, density: 0.62 },
  { name: 'MDF', moe: 0.53, density: 0.72 },
  { name: 'Particle Board', moe: 0.4, density: 0.67 },
  { name: 'Melamine', moe: 0.58, density: 0.74 },
  ...WOOD_DATABASE.map((w) => ({ 
    name: w.name, 
    moe: WOOD_MOE[w.name] || DEFAULT_MOE, 
    density: w.density 
  })),
];

/**
 * Get MOE for a material by name
 */
export function getMOE(materialName) {
  const mat = SHELF_MATERIALS.find(
    (m) => m.name.toLowerCase() === materialName.toLowerCase()
  );
  return mat ? mat.moe : DEFAULT_MOE;
}

/**
 * Calculate shelf deflection.
 * @param {number} span — Shelf span (width between supports) in inches
 * @param {number} depth — Shelf depth (front to back) in inches
 * @param {number} thickness — Shelf thickness in inches
 * @param {number} load — Expected load in pounds (uniformly distributed)
 * @param {string} material — Material/species name
 * @returns {{ deflection: number, isSafe: boolean, maxLoad: number, maxSpan: number, safetyFactor: number }}
 */
export function calculateShelfSag(span, depth, thickness, load, material = 'Cherry') {
  span = parseFloat(span) || 0;
  depth = parseFloat(depth) || 0;
  thickness = parseFloat(thickness) || 0;
  load = parseFloat(load) || 0;

  if (span <= 0 || depth <= 0 || thickness <= 0) {
    return { error: 'All dimensions must be positive' };
  }

  const E = (getMOE(material) || DEFAULT_MOE) * 1_000_000; // psi
  const I = (depth * Math.pow(thickness, 3)) / 12; // in⁴
  const w = load / span; // lbs per inch

  // Max deflection at center (inches)
  const deflection = (5 * w * Math.pow(span, 4)) / (384 * E * I);

  // Rule of thumb: acceptable deflection < span / 240 (wood industry standard)
  const maxSafeDeflection = span / 240;
  const isSafe = deflection <= maxSafeDeflection;

  // Max safe load for this span
  const maxLoad = (384 * E * I * maxSafeDeflection) / (5 * Math.pow(span, 4)) * span;
  
  // Max safe span for this load
  const maxSpan = Math.pow((384 * E * I * span / 240) / (5 * (load / span)), 1/4);

  return {
    span: Math.round(span * 100) / 100,
    depth: Math.round(depth * 100) / 100,
    thickness: Math.round(thickness * 100) / 100,
    load: Math.round(load * 100) / 100,
    material,
    moe: E,
    momentOfInertia: Math.round(I * 10000) / 10000,
    deflection: Math.round(deflection * 10000) / 10000,
    maxSafeDeflection: Math.round(maxSafeDeflection * 10000) / 10000,
    isSafe,
    safetyFactor: deflection > 0 ? Math.round((maxSafeDeflection / deflection) * 100) / 100 : 'Infinite',
    maxSafeLoad: Math.round(maxLoad * 100) / 100,
    maxSafeSpan: Math.round(maxSpan * 100) / 100,
    notes: isSafe
      ? 'Shelf should not sag noticeably'
      : `Deflection ${deflection.toFixed(3)}" exceeds acceptable ${maxSafeDeflection.toFixed(3)}" — add center support, increase thickness, or use stiffer material`,
  };
}

/**
 * Quick check: recommended minimum thickness for a given span and material.
 */
export function recommendedThickness(span, depth, load, material = 'Cherry') {
  span = parseFloat(span) || 0;
  depth = parseFloat(depth) || 0;
  load = parseFloat(load) || 0;

  if (span <= 0 || depth <= 0) return { error: 'Enter span and depth' };

  const E = (getMOE(material) || DEFAULT_MOE) * 1_000_000;
  const maxDeflection = span / 240;
  const w = load / span;

  // Solve for I, then h:  I = (b × h³)/12  →  h = ³√(12I/b)
  // Deflection = (5wL⁴)/(384EI)  →  I = (5wL⁴)/(384E × maxDeflection)
  const requiredI = (5 * w * Math.pow(span, 4)) / (384 * E * maxDeflection);
  const requiredThickness = Math.cbrt((12 * requiredI) / depth);

  return {
    recommendedThickness: Math.round(requiredThickness * 100) / 100,
    standardSize: getClosestStandardThickness(requiredThickness),
    material,
  };
}

function getClosestStandardThickness(t) {
  const standard = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  let closest = standard[0];
  for (const s of standard) {
    if (s >= t && s < closest) closest = s;
    if (s > t) closest = s;
  }
  // Find actual closest (not just larger)
  let best = standard[0];
  let bestDiff = Math.abs(best - t);
  for (const s of standard) {
    const diff = Math.abs(s - t);
    if (diff < bestDiff) { bestDiff = diff; best = s; }
  }
  return best;
}