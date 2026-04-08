/**
 * Screw & Fastener Calculator - Pilot hole sizing and fastener recommendations
 */

/**
 * Pilot hole sizes for wood screws
 * Format: screw gauge → { pilot_hole_hardwood, pilot_hole_softwood }
 */
export const SCREW_SIZES = {
  '#4': { diameter: 0.112, hardwood: 0.0625, softwood: 0.047, clearance: 0.157 },
  '#6': { diameter: 0.138, hardwood: 0.078, softwood: 0.063, clearance: 0.196 },
  '#8': { diameter: 0.164, hardwood: 0.109, softwood: 0.078, clearance: 0.226 },
  '#10': { diameter: 0.19, hardwood: 0.125, softwood: 0.094, clearance: 0.25 },
  '#12': { diameter: 0.216, hardwood: 0.156, softwood: 0.109, clearance: 0.281 },
  '1/4"': { diameter: 0.25, hardwood: 0.1875, softwood: 0.125, clearance: 0.281 },
};

/**
 * Get pilot hole size for a screw
 */
export function getPilotHoleSize(screwSize, woodType = 'hardwood') {
  const screw = SCREW_SIZES[screwSize];
  if (!screw) return null;

  const pilotHole =
    woodType === 'hardwood'
      ? screw.hardwood
      : woodType === 'softwood'
        ? screw.softwood
        : (screw.hardwood + screw.softwood) / 2;

  return {
    screwSize,
    screwDiameter: screw.diameter,
    pilotHoleDiameter: pilotHole,
    clearanceHoleDiameter: screw.clearance,
    woodType,
    tip:
      woodType === 'hardwood'
        ? 'Use larger pilot hole for hard woods'
        : 'Use smaller pilot hole for soft woods',
  };
}

/**
 * Screw spacing recommendations (in inches)
 * Based on typical woodworking practice
 */
export const SPACING_GUIDE = {
  'Edge (perimeter)': 2, // 2" from edge
  'Fastener spacing': 6, // 6" between fasteners typical
  'Corner braces': 1.5, // 1.5" inset from corner
  'Cabinet backing': 4, // 4" on center
  'Shelf support': 3, // 3" between shelf pins/brackets
};

/**
 * Calculate screw layout for a board edge
 */
export function calculateScrewLayout(length, spacing = 6, edgeInset = 2) {
  length = parseFloat(length) || 0;
  spacing = parseFloat(spacing) || 6;
  edgeInset = parseFloat(edgeInset) || 2;

  if (length <= edgeInset * 2) {
    return { positions: [], count: 0, error: 'Board too short for fasteners' };
  }

  const usableLength = length - edgeInset * 2;
  const numScrews = Math.floor(usableLength / spacing) + 1;
  const actualSpacing = usableLength / (numScrews - 1);

  const positions = [];
  for (let i = 0; i < numScrews; i++) {
    positions.push(edgeInset + i * actualSpacing);
  }

  return {
    positions: positions.map((p) => p.toFixed(3)),
    count: numScrews,
    spacing: actualSpacing.toFixed(3),
    firstPosition: edgeInset,
    lastPosition: (length - edgeInset).toFixed(3),
  };
}

/**
 * Fastener recommendations by application
 */
export const APPLICATIONS = {
  'General Assembly': { type: 'Wood Screw', hardwood: '#8', softwood: '#6' },
  'Face Frame': { type: 'Wood Screw', hardwood: '#8', softwood: '#8' },
  'Cabinet Backing': { type: 'Wood Screw', hardwood: '#6', softwood: '#6' },
  'Shelf Support': { type: 'Shelf Pin/Bracket', hardwood: '#8', softwood: '#8' },
  'Hinge': { type: 'Wood Screw', hardwood: '#8', softwood: '#8' },
  'Hardware Mount': { type: 'Wood Screw', hardwood: '#10', softwood: '#8' },
};

/**
 * Get recommendation for application
 */
export function getRecommendation(application, woodType = 'hardwood') {
  const app = APPLICATIONS[application];
  if (!app) return null;

  const screwSize = app[woodType];
  const pilotInfo = getPilotHoleSize(screwSize, woodType);

  return {
    application,
    recommendation: app,
    screwSize,
    pilotInfo,
  };
}
