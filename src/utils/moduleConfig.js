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
    id: 'fraction-math',
    title: 'Fraction Math',
    description: 'Fraction calculations & conversions',
    icon: '🔢',
    gradient: 'from-violet-400 via-purple-500 to-indigo-600',
    color: 'violet',
    order: 3
  },
  {
    id: 'metric-converter',
    title: 'Metric Converter',
    description: 'Unit conversions',
    icon: '🔄',
    gradient: 'from-blue-400 via-cyan-500 to-teal-600',
    color: 'blue',
    order: 4
  },
  {
    id: 'wood-database',
    title: 'Wood Database',
    description: 'Wood species reference',
    icon: '🌳',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    color: 'green',
    order: 5
  },
  {
    id: 'joinery-spacer',
    title: 'Joinery Spacer',
    description: 'Joint spacing calculations',
    icon: '🪵',
    gradient: 'from-lime-400 via-green-500 to-emerald-600',
    color: 'lime',
    order: 6
  },
  {
    id: 'cut-list-generator',
    title: 'Cut List',
    description: 'Optimize cut lists',
    icon: '✂️',
    gradient: 'from-sky-400 via-blue-500 to-blue-600',
    color: 'sky',
    order: 7
  },
  {
    id: 'wood-movement-calc',
    title: 'Wood Movement',
    description: 'Seasonal expansion calc',
    icon: '📊',
    gradient: 'from-fuchsia-400 via-purple-500 to-indigo-600',
    color: 'fuchsia',
    order: 8
  },
  {
    id: 'fastener-calculator',
    title: 'Fasteners',
    description: 'Screw & bolt sizing',
    icon: '🔩',
    gradient: 'from-red-400 via-rose-500 to-pink-600',
    color: 'red',
    order: 9
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
