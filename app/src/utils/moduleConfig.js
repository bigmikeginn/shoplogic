// Module metadata with icons, colors, and gradients
export const MODULES = [
  {
    id: 'board-feet',
    title: 'Board Feet',
    description: 'Calculate lumber footage',
    icon: '📏',
    gradient: 'from-orange-400 via-orange-500 to-red-600',
    color: 'orange',
    order: 0
  },
  {
    id: 'plywood-planner',
    title: 'Plywood Planner',
    description: 'Optimize sheet layouts',
    icon: '📐',
    gradient: 'from-amber-400 via-yellow-500 to-orange-600',
    color: 'yellow',
    order: 1
  },
  {
    id: 'finish-estimator',
    title: 'Finish Estimator',
    description: 'Calculate finish quantities',
    icon: '🎨',
    gradient: 'from-rose-400 via-pink-500 to-red-600',
    color: 'rose',
    order: 2
  },
  {
    id: 'metric-converter',
    title: 'Metric Converter',
    description: 'Unit conversions',
    icon: '🔄',
    gradient: 'from-blue-400 via-cyan-500 to-teal-600',
    color: 'blue',
    order: 3
  },
  {
    id: 'wood-database',
    title: 'Wood Database',
    description: 'Wood species reference',
    icon: '🌳',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    color: 'green',
    order: 4
  },
  {
    id: 'joinery-spacer',
    title: 'Joinery Spacer',
    description: 'Joint spacing calculations',
    icon: '🪵',
    gradient: 'from-lime-400 via-green-500 to-emerald-600',
    color: 'lime',
    order: 5
  },
  {
    id: 'cut-list-generator',
    title: 'Cut List',
    description: 'Optimize cut lists',
    icon: '✂️',
    gradient: 'from-sky-400 via-blue-500 to-blue-600',
    color: 'sky',
    order: 6
  },
  {
    id: 'wood-movement-calc',
    title: 'Wood Movement',
    description: 'Seasonal expansion calc',
    icon: '📊',
    gradient: 'from-fuchsia-400 via-purple-500 to-indigo-600',
    color: 'fuchsia',
    order: 7
  },
  {
    id: 'fastener-calculator',
    title: 'Fasteners',
    description: 'Screw & bolt sizing',
    icon: '🔩',
    gradient: 'from-red-400 via-rose-500 to-pink-600',
    color: 'red',
    order: 8
  },
  {
    id: 'golden-ratio',
    title: 'Golden Ratio',
    description: 'Phi proportion calculator',
    icon: 'φ',
    gradient: 'from-amber-400 via-yellow-500 to-orange-600',
    color: 'amber',
    order: 9
  },
  {
    id: 'stair-calculator',
    title: 'Stairs',
    description: 'Rise/run & code check',
    icon: '🪜',
    gradient: 'from-blue-400 via-cyan-500 to-teal-600',
    color: 'blue',
    order: 10
  },
  {
    id: 'compound-miter',
    title: 'Compound Miter',
    description: 'Crown molding saw settings',
    icon: '📐',
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    color: 'purple',
    order: 11
  },
  {
    id: 'shelf-sag',
    title: 'Shelf Sag',
    description: 'Deflection & load limits',
    icon: '📚',
    gradient: 'from-teal-400 via-cyan-500 to-cyan-600',
    color: 'teal',
    order: 12
  },
  {
    id: 'board-foot-pricing',
    title: 'BF Pricing',
    description: 'Cost with waste & tax',
    icon: '💰',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    color: 'green',
    order: 13
  },
  {
    id: 'arc-radius',
    title: 'Arc & Radius',
    description: 'Arcs, chords & laminations',
    icon: '⭕',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    color: 'cyan',
    order: 14
  },
  {
    id: 'metal-weight',
    title: 'Metal Weight',
    description: 'Stock weight by shape & alloy',
    icon: '⚖️',
    gradient: 'from-slate-400 via-gray-500 to-gray-600',
    color: 'slate',
    order: 15
  },
  {
    id: 'tap-drill',
    title: 'Tap Drill',
    description: 'Thread tap & clearance sizes',
    icon: '🔧',
    gradient: 'from-orange-400 via-red-500 to-rose-600',
    color: 'orange',
    order: 16
  },
  {
    id: 'torque-converter',
    title: 'Torque',
    description: 'ft-lbs, Nm, in-lbs, kg-m',
    icon: '🔩',
    gradient: 'from-red-400 via-rose-500 to-pink-600',
    color: 'red',
    order: 17
  },
  {
    id: 'gear-ratio',
    title: 'Gear Ratio',
    description: 'Gears, RPM & speed',
    icon: '⚙️',
    gradient: 'from-indigo-400 via-purple-500 to-violet-600',
    color: 'indigo',
    order: 18
  },
  {
    id: 'bolt-circle',
    title: 'Bolt Circle',
    description: 'PCD chord & hole layout',
    icon: '⭕',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    color: 'cyan',
    order: 19
  },
  {
    id: 'triangle-solver',
    title: 'Triangle Solver',
    description: 'Solve sides, angles & area',
    icon: '📐',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
    color: 'violet',
    order: 20
  }
];

// Get module config by ID
export const getModuleById = (id) => {
  return MODULES.find(m => m.id === id);
};

// Get all modules sorted by order
export const getModulesSorted = () => {
  return [...MODULES].sort((a, b) => a.order - b.order);
};
