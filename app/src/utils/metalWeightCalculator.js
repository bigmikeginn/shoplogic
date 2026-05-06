/**
 * Metal Weight Calculator
 *
 * Computes weight of metal stock based on shape, dimensions, and material density.
 * Supports: plate, round bar, square bar, tube, pipe
 * Materials: steel, stainless, aluminum, brass, copper, titanium
 */

/** Material densities in lbs/in³ */
export const METAL_DENSITIES = [
  { name: 'Steel (Mild)', density: 0.284, color: 'gray-500' },
  { name: 'Stainless 304', density: 0.289, color: 'slate-400' },
  { name: 'Aluminum 6061', density: 0.098, color: 'blue-300' },
  { name: 'Brass', density: 0.308, color: 'yellow-500' },
  { name: 'Copper', density: 0.323, color: 'orange-500' },
  { name: 'Titanium', density: 0.163, color: 'purple-400' },
  { name: 'Cast Iron', density: 0.260, color: 'gray-600' },
];

export const STOCK_TYPES = [
  { id: 'plate', label: 'Plate / Flat Bar', fields: ['thickness', 'width', 'length'] },
  { id: 'round', label: 'Round Bar / Rod', fields: ['diameter', 'length'] },
  { id: 'square', label: 'Square Bar', fields: ['side', 'length'] },
  { id: 'tube', label: 'Tube / Pipe (Rectangular)', fields: ['outerW', 'outerH', 'wall', 'length'] },
  { id: 'round-tube', label: 'Round Tube / Pipe', fields: ['outerDiam', 'wall', 'length'] },
];

/**
 * Calculate metal weight.
 * @param {string} type — stock type id
 * @param {object} dims — { thickness, width, length, diameter, side, outerW, outerH, outerDiam, wall }
 * @param {string} material — material name
 * @returns {{ weightLbs: number, weightKg: number, volume: number }}
 */
export function calculateMetalWeight(type, dims, material = 'Steel (Mild)') {
  const densityObj = METAL_DENSITIES.find(m => m.name === material);
  const density = densityObj ? densityObj.density : 0.284;

  let volume = 0;

  switch (type) {
    case 'plate': {
      const t = parseFloat(dims.thickness) || 0;
      const w = parseFloat(dims.width) || 0;
      const l = parseFloat(dims.length) || 0;
      volume = t * w * l;
      break;
    }
    case 'round': {
      const d = parseFloat(dims.diameter) || 0;
      const l = parseFloat(dims.length) || 0;
      volume = Math.PI * Math.pow(d / 2, 2) * l;
      break;
    }
    case 'square': {
      const s = parseFloat(dims.side) || 0;
      const l = parseFloat(dims.length) || 0;
      volume = s * s * l;
      break;
    }
    case 'tube': {
      const ow = parseFloat(dims.outerW) || 0;
      const oh = parseFloat(dims.outerH) || 0;
      const wall = parseFloat(dims.wall) || 0;
      const l = parseFloat(dims.length) || 0;
      const innerW = ow - 2 * wall;
      const innerH = oh - 2 * wall;
      volume = (ow * oh - Math.max(0, innerW) * Math.max(0, innerH)) * l;
      break;
    }
    case 'round-tube': {
      const od = parseFloat(dims.outerDiam) || 0;
      const wall = parseFloat(dims.wall) || 0;
      const l = parseFloat(dims.length) || 0;
      const outerR = od / 2;
      const innerR = outerR - wall;
      volume = Math.PI * (Math.pow(outerR, 2) - Math.pow(Math.max(0, innerR), 2)) * l;
      break;
    }
    default:
      return { error: 'Invalid stock type' };
  }

  if (volume <= 0) return { error: 'All dimensions must be positive' };

  const weightLbs = volume * density;
  const weightKg = weightLbs * 0.453592;

  return {
    type: STOCK_TYPES.find(s => s.id === type)?.label || type,
    material,
    density,
    volume: Math.round(volume * 1000) / 1000,
    weightLbs: Math.round(weightLbs * 1000) / 1000,
    weightKg: Math.round(weightKg * 1000) / 1000,
  };
}