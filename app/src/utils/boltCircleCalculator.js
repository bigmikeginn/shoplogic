/**
 * Bolt Circle (PCD) Calculator
 *
 * Computes chord spacing between adjacent holes on a bolt circle.
 * Essential for wheel bolt patterns, flange drilling, rotary table work.
 *
 * Chord = PCD × sin(π / n)
 *   where PCD = pitch circle diameter, n = number of holes
 *
 * Also computes:
 *   - Angular spacing between holes
 *   - XY coordinates for each hole (for DRO / CNC layout)
 */

/** Common bolt patterns */
export const COMMON_PATTERNS = [
  { label: '4-lug (4×100)', holes: 4, pcd: 100, unit: 'mm' },
  { label: '4-lug (4×114.3)', holes: 4, pcd: 114.3, unit: 'mm' },
  { label: '5-lug (5×114.3)', holes: 5, pcd: 114.3, unit: 'mm' },
  { label: '5-lug (5×120)', holes: 5, pcd: 120, unit: 'mm' },
  { label: '6-lug (6×139.7)', holes: 6, pcd: 139.7, unit: 'mm' },
  { label: '8-lug (8×170)', holes: 8, pcd: 170, unit: 'mm' },
  { label: '3-hole flange', holes: 3, pcd: 4, unit: 'in' },
  { label: '6-hole flange', holes: 6, pcd: 6, unit: 'in' },
];

/**
 * Calculate bolt circle geometry.
 * @param {number} holes — number of holes
 * @param {number} pcd — pitch circle diameter
 * @returns {{ chord, angle, coordinates, pcd, holes }}
 */
export function calculateBoltCircle(holes, pcd) {
  holes = parseInt(holes) || 0;
  pcd = parseFloat(pcd) || 0;

  if (holes < 2) return { error: 'Minimum 2 holes required' };
  if (pcd <= 0) return { error: 'Enter valid PCD' };

  const angleDeg = 360 / holes;
  const angleRad = (angleDeg * Math.PI) / 180;
  const chord = pcd * Math.sin(Math.PI / holes);

  // Generate XY coordinates (first hole at 12 o'clock)
  const coordinates = [];
  for (let i = 0; i < holes; i++) {
    const a = (i * angleRad) - (Math.PI / 2); // start at top
    coordinates.push({
      hole: i + 1,
      x: Math.round((pcd / 2) * Math.cos(a) * 1000) / 1000,
      y: Math.round((pcd / 2) * Math.sin(a) * 1000) / 1000,
    });
  }

  return {
    holes,
    pcd: Math.round(pcd * 1000) / 1000,
    chord: Math.round(chord * 1000) / 1000,
    angle: Math.round(angleDeg * 100) / 100,
    coordinates,
  };
}