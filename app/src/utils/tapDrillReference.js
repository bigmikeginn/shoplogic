/**
 * Tap Drill & Thread Reference
 *
 * Computes tap drill size from bolt diameter and thread pitch.
 * Supports SAE (imperial) and Metric threads.
 *
 * Formula for standard 75% engagement:
 *   Tap drill = bolt diameter - (1 / thread_per_inch) (SAE)
 *   Tap drill = bolt diameter - pitch (Metric)
 * Clearance hole: ~ bolt diameter (plus tolerance)
 */

export const THREAD_STANDARDS = ['SAE (Imperial)', 'Metric'];

/** Common SAE thread data (TPI) */
export const SAE_SIZES = [
  { size: '#0-80', boltDiam: 0.060, tpi: 80 },
  { size: '#2-56', boltDiam: 0.086, tpi: 56 },
  { size: '#4-40', boltDiam: 0.112, tpi: 40 },
  { size: '#6-32', boltDiam: 0.138, tpi: 32 },
  { size: '#8-32', boltDiam: 0.164, tpi: 32 },
  { size: '#10-24', boltDiam: 0.190, tpi: 24 },
  { size: '#10-32', boltDiam: 0.190, tpi: 32 },
  { size: '1/4-20', boltDiam: 0.250, tpi: 20, label: "1/4\"" },
  { size: '1/4-28', boltDiam: 0.250, tpi: 28, label: "1/4\"" },
  { size: '5/16-18', boltDiam: 0.3125, tpi: 18, label: "5/16\"" },
  { size: '5/16-24', boltDiam: 0.3125, tpi: 24, label: "5/16\"" },
  { size: '3/8-16', boltDiam: 0.375, tpi: 16, label: "3/8\"" },
  { size: '3/8-24', boltDiam: 0.375, tpi: 24, label: "3/8\"" },
  { size: '7/16-14', boltDiam: 0.4375, tpi: 14, label: "7/16\"" },
  { size: '7/16-20', boltDiam: 0.4375, tpi: 20, label: "7/16\"" },
  { size: '1/2-13', boltDiam: 0.500, tpi: 13, label: "1/2\"" },
  { size: '1/2-20', boltDiam: 0.500, tpi: 20, label: "1/2\"" },
  { size: '9/16-12', boltDiam: 0.5625, tpi: 12, label: "9/16\"" },
  { size: '9/16-18', boltDiam: 0.5625, tpi: 18, label: "9/16\"" },
  { size: '5/8-11', boltDiam: 0.625, tpi: 11, label: "5/8\"" },
  { size: '5/8-18', boltDiam: 0.625, tpi: 18, label: "5/8\"" },
  { size: '3/4-10', boltDiam: 0.750, tpi: 10, label: "3/4\"" },
  { size: '3/4-16', boltDiam: 0.750, tpi: 16, label: "3/4\"" },
  { size: '7/8-9', boltDiam: 0.875, tpi: 9, label: "7/8\"" },
  { size: '7/8-14', boltDiam: 0.875, tpi: 14, label: "7/8\"" },
  { size: '1-8', boltDiam: 1.000, tpi: 8, label: "1\"" },
  { size: '1-12', boltDiam: 1.000, tpi: 12, label: "1\"" },
];

/** Common Metric sizes (M-diameter × pitch in mm) */
export const METRIC_SIZES = [
  { size: 'M3 × 0.5', boltDiam: 3.0, pitch: 0.5 },
  { size: 'M4 × 0.7', boltDiam: 4.0, pitch: 0.7 },
  { size: 'M5 × 0.8', boltDiam: 5.0, pitch: 0.8 },
  { size: 'M6 × 1.0', boltDiam: 6.0, pitch: 1.0 },
  { size: 'M8 × 1.25', boltDiam: 8.0, pitch: 1.25 },
  { size: 'M8 × 1.0', boltDiam: 8.0, pitch: 1.0, label: 'M8 fine' },
  { size: 'M10 × 1.5', boltDiam: 10.0, pitch: 1.5 },
  { size: 'M10 × 1.25', boltDiam: 10.0, pitch: 1.25, label: 'M10 fine' },
  { size: 'M12 × 1.75', boltDiam: 12.0, pitch: 1.75 },
  { size: 'M12 × 1.5', boltDiam: 12.0, pitch: 1.5, label: 'M12 fine' },
  { size: 'M14 × 2.0', boltDiam: 14.0, pitch: 2.0 },
  { size: 'M16 × 2.0', boltDiam: 16.0, pitch: 2.0 },
  { size: 'M18 × 2.5', boltDiam: 18.0, pitch: 2.5 },
  { size: 'M20 × 2.5', boltDiam: 20.0, pitch: 2.5 },
];

/**
 * Calculate tap drill size for a given bolt size.
 * @param {number} boltDiam — nominal bolt diameter (in for SAE, mm for metric)
 * @param {number} pitch — threads per inch (SAE) or pitch in mm (metric)
 * @param {string} standard — 'SAE (Imperial)' or 'Metric'
 * @returns {{ tapDrill, tapDrillFraction, clearanceDrill, boltDiam, pitch, standard }}
 */
export function calculateTapDrill(boltDiam, pitch, standard = 'SAE (Imperial)') {
  boltDiam = parseFloat(boltDiam) || 0;
  pitch = parseFloat(pitch) || 0;

  if (boltDiam <= 0 || pitch <= 0) return { error: 'Enter valid diameter and pitch' };

  let tapDrill;
  const unit = standard === 'Metric' ? 'mm' : '"';

  if (standard === 'Metric') {
    tapDrill = boltDiam - pitch;
  } else {
    tapDrill = boltDiam - (1 / pitch);
  }

  const clearanceDrill = boltDiam * 1.05; // ~5% oversize for clearance

  return {
    boltDiam: Math.round(boltDiam * 10000) / 10000,
    pitch,
    standard,
    tapDrill: Math.round(tapDrill * 10000) / 10000,
    tapDrillFraction: decimalToFractionString(tapDrill),
    clearanceDrill: Math.round(clearanceDrill * 10000) / 10000,
    clearanceFraction: decimalToFractionString(clearanceDrill),
    unit,
  };
}

/** Convert decimal to nearest fractional size string (SAE) */
function decimalToFractionString(decimal) {
  if (decimal <= 0) return '—';
  const denoms = [64, 32, 16, 8, 4, 2];
  for (const d of denoms) {
    const num = Math.round(decimal * d);
    if (num > 0 && Math.abs(decimal - num / d) < 0.005) {
      if (num === d) return `${1}`;
      const g = gcd(num, d);
      const n = num / g;
      const dn = d / g;
      if (n >= dn) return `${Math.floor(n / dn)}`;
      return `${n}/${dn}`;
    }
  }
  return decimal.toFixed(4);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}