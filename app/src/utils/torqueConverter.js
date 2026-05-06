/**
 * Torque Converter
 *
 * Converts between common torque units:
 *   ft-lbs, Nm, in-lbs, kg-m
 *
 * Conversion factors (relative to ft-lbs):
 *   1 ft-lb = 1.355818 Nm
 *   1 ft-lb = 12 in-lbs
 *   1 ft-lb = 0.138255 kg-m
 */

export const TORQUE_UNITS = ['ft-lbs', 'Nm', 'in-lbs', 'kg-m'];

/** Common automotive torque specs (ft-lbs) */
export const TORQUE_PRESETS = [
  { label: 'Lug nut (car)', ftlbs: 90 },
  { label: 'Lug nut (truck)', ftlbs: 140 },
  { label: 'Spark plug', ftlbs: 15 },
  { label: 'Oil drain plug', ftlbs: 25 },
  { label: 'Head bolt (small)', ftlbs: 35 },
  { label: 'Crank pulley bolt', ftlbs: 120 },
  { label: 'Axle nut', ftlbs: 180 },
  { label: 'Wheel bearing', ftlbs: 50 },
];

/**
 * Convert torque from one unit to the other 3 units.
 * @param {number} value — torque value
 * @param {string} fromUnit — 'ft-lbs' | 'Nm' | 'in-lbs' | 'kg-m'
 * @returns {{ ftlbs, nm, inlbs, kgm }}
 */
export function convertTorque(value, fromUnit = 'ft-lbs') {
  value = parseFloat(value) || 0;

  if (value <= 0) return { error: 'Enter a valid torque value' };

  // Convert everything to ft-lbs base, then to all units
  let ftlbs;
  switch (fromUnit) {
    case 'ft-lbs': ftlbs = value; break;
    case 'Nm': ftlbs = value / 1.355818; break;
    case 'in-lbs': ftlbs = value / 12; break;
    case 'kg-m': ftlbs = value / 0.138255; break;
    default: ftlbs = value;
  }

  return {
    ftlbs: Math.round(ftlbs * 100) / 100,
    nm: Math.round(ftlbs * 1.355818 * 100) / 100,
    inlbs: Math.round(ftlbs * 12 * 100) / 100,
    kgm: Math.round(ftlbs * 0.138255 * 100) / 100,
  };
}