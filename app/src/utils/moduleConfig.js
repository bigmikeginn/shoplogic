// Module metadata with icons, colors, categories, and gradients

export const CATEGORIES = {
  measure: { label: 'Measuring & Layout', color: 'amber', accent: 'border-l-amber-500/40' },
  joinery: { label: 'Joinery & Assembly', color: 'emerald', accent: 'border-l-emerald-500/40' },
  finishing: { label: 'Finishing & Materials', color: 'rose', accent: 'border-l-rose-500/40' },
  metalauto: { label: 'Metal & Automotive', color: 'cyan', accent: 'border-l-cyan-500/40' },
  reference: { label: 'Math & Reference', color: 'violet', accent: 'border-l-violet-500/40' },
};

export const MODULES = [
  { id: 'board-feet', title: 'Board Feet', description: 'Calculate lumber footage', category: 'measure', order: 0 },
  { id: 'plywood-planner', title: 'Plywood Planner', description: 'Optimize sheet layouts', category: 'measure', order: 1 },
  { id: 'metric-converter', title: 'Metric Converter', description: 'Unit conversions', category: 'measure', order: 3 },
  { id: 'arc-radius', title: 'Arc & Radius', description: 'Arcs, chords & laminations', category: 'measure', order: 14 },
  { id: 'golden-ratio', title: 'Golden Ratio', description: 'Phi proportion calculator', category: 'measure', order: 9 },
  { id: 'triangle-solver', title: 'Triangle Solver', description: 'Solve sides, angles & area', category: 'measure', order: 20 },

  { id: 'joinery-spacer', title: 'Joinery Spacer', description: 'Joint spacing calculations', category: 'joinery', order: 5 },
  { id: 'cut-list-generator', title: 'Cut List', description: 'Optimize cut lists', category: 'joinery', order: 6 },
  { id: 'fastener-calculator', title: 'Fasteners', description: 'Screw & bolt sizing', category: 'joinery', order: 8 },
  { id: 'stair-calculator', title: 'Stairs', description: 'Rise/run & code check', category: 'joinery', order: 10 },
  { id: 'compound-miter', title: 'Compound Miter', description: 'Crown molding saw settings', category: 'joinery', order: 11 },
  { id: 'shelf-sag', title: 'Shelf Sag', description: 'Deflection & load limits', category: 'joinery', order: 12 },
  { id: 'tap-drill', title: 'Tap Drill', description: 'Thread tap & clearance sizes', category: 'joinery', order: 16 },
  { id: 'bolt-circle', title: 'Bolt Circle', description: 'PCD chord & hole layout', category: 'joinery', order: 19 },

  { id: 'finish-estimator', title: 'Finish Estimator', description: 'Calculate finish quantities', category: 'finishing', order: 2 },
  { id: 'wood-database', title: 'Wood Database', description: 'Wood species reference', category: 'finishing', order: 4 },
  { id: 'wood-movement-calc', title: 'Wood Movement', description: 'Seasonal expansion calc', category: 'finishing', order: 7 },
  { id: 'board-foot-pricing', title: 'BF Pricing', description: 'Cost with waste & tax', category: 'finishing', order: 13 },
  { id: 'metal-weight', title: 'Metal Weight', description: 'Stock weight by shape & alloy', category: 'finishing', order: 15 },

  { id: 'torque-converter', title: 'Torque', description: 'ft-lbs, Nm, in-lbs, kg-m', category: 'metalauto', order: 17 },
  { id: 'gear-ratio', title: 'Gear Ratio', description: 'Gears, RPM & speed', category: 'metalauto', order: 18 },
];

// Get module config by ID
export const getModuleById = (id) => {
  return MODULES.find(m => m.id === id);
};

// Get all modules sorted by order
export const getModulesSorted = () => {
  return [...MODULES].sort((a, b) => a.order - b.order);
};

// Get modules grouped by category
export const getModulesByCategory = () => {
  const grouped = {};
  MODULES.forEach(m => {
    if (!grouped[m.category]) grouped[m.category] = [];
    grouped[m.category].push(m);
  });
  return grouped;
};