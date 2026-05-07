// Custom SVG icon library — premium 2026 aesthetic
// All icons are 24x24, stroke-width 1.5, round caps/joins, use currentColor

function icon(paths, viewBox = '0 0 24 24') {
  return ({ className = '', ...props } = {}) => (
    <svg className={className} viewBox={viewBox} fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {paths}
    </svg>
  );
}

export const IconRuler = icon(
  <><path d="M3 7l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2" /><path d="M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7" /><line x1="8" y1="10" x2="9" y2="10" /><line x1="8" y1="13" x2="11" y2="13" /><line x1="8" y1="16" x2="10" y2="16" /></>
);

export const IconGrid = icon(
  <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>
);

export const IconPaintBrush = icon(
  <><path d="M18.37 2.63a2.12 2.12 0 013 3L14 13l-4 1 1-4 7.37-7.37z" /><path d="M9 11l-4.5 4.5a2 2 0 01-1 .6l-1.5.3.3-1.5a2 2 0 01.6-1L7.5 9" /></>
);

export const IconSwap = icon(
  <><path d="M16 3l4 4-4 4" /><path d="M20 7H4" /><path d="M8 21l-4-4 4-4" /><path d="M4 17h16" /></>
);

export const IconTree = icon(
  <><path d="M12 21V13" /><path d="M12 13c-2-1.5-6-1.5-5-6 0-2 3-3 5-3s5 1 5 3c1 4.5-3 4.5-5 6z" /><circle cx="12" cy="8" r="1.5" /></>
);

export const IconJoinery = icon(
  <><path d="M3 9l4.5 4.5L12 9l4.5 4.5L21 9" /><path d="M3 12v4a2 2 0 002 2h14a2 2 0 002-2v-4" /><line x1="7.5" y1="10" x2="7.5" y2="13.5" /><line x1="12" y1="6" x2="12" y2="13.5" /><line x1="16.5" y1="10" x2="16.5" y2="13.5" /></>
);

export const IconScissors = icon(
  <><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><path d="M20 4L8.12 15.88" /><path d="M14.47 14.48L20 20" /><path d="M8.12 8.12L12 12" /></>
);

export const IconExpand = icon(
  <><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></>
);

export const IconScrew = icon(
  <><line x1="12" y1="2" x2="12" y2="22" /><path d="M7 4h10l1 2H6l1-2z" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="M8 16h8" /><path d="M14 20a2 2 0 11-4 0" /></>
);

export const IconSpiral = icon(
  <><path d="M12 3c-5 0-9 4-9 9s4 9 9 9" /><path d="M12 5c-3.5 0-6.5 3-6.5 6.5S8.5 18 12 18" /><path d="M12 7c-2 0-3.5 1.5-3.5 3.5S10 14 12 14" /><circle cx="12" cy="12" r="1" /></>
);

export const IconStairs = icon(
  <><path d="M3 21V3h4v4h4v4h4v4h4v4h4v2H3z" /></>
);

export const IconAngle = icon(
  <><path d="M3 21L21 3" /><path d="M21 3H8" /><path d="M21 3v13" /></>
);

export const IconShelf = icon(
  <><rect x="2" y="5" width="20" height="2" rx="0.5" /><line x1="10" y1="7" x2="10" y2="14" /><path d="M10 14c0 1.5 1 2 2 2s2-.5 2-2" /></>
);

export const IconPriceTag = icon(
  <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>
);

export const IconArc = icon(
  <><path d="M4 20a8 8 0 0116 0" /><circle cx="12" cy="12" r="8" /><line x1="12" y1="4" x2="12" y2="12" /><line x1="12" y1="12" x2="16" y2="14" /></>
);

export const IconScale = icon(
  <><path d="M3 6l3-4h12l3 4" /><line x1="12" y1="2" x2="12" y2="22" /><line x1="5" y1="8" x2="19" y2="8" /><path d="M8 8v4a4 4 0 008 0V8" /></>
);

export const IconDrill = icon(
  <><path d="M14 14.5V10a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2h3" /><path d="M14 10l4-4" /><path d="M21 3l-3 3" /><path d="M18 6l-1 1" /><circle cx="6" cy="14" r="1" /></>
);

export const IconWrench = icon(
  <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></>
);

export const IconGear = icon(
  <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>
);

export const IconBoltCircle = icon(
  <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="4" r="1.5" /><circle cx="12" cy="20" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="20" cy="12" r="1.5" /></>
);

export const IconTriangle = icon(
  <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></>
);

// Map module IDs to their icon components
export const MODULE_ICONS = {
  'board-feet': IconRuler,
  'plywood-planner': IconGrid,
  'finish-estimator': IconPaintBrush,
  'metric-converter': IconSwap,
  'wood-database': IconTree,
  'joinery-spacer': IconJoinery,
  'cut-list-generator': IconScissors,
  'wood-movement-calc': IconExpand,
  'fastener-calculator': IconScrew,
  'golden-ratio': IconSpiral,
  'stair-calculator': IconStairs,
  'compound-miter': IconAngle,
  'shelf-sag': IconShelf,
  'board-foot-pricing': IconPriceTag,
  'arc-radius': IconArc,
  'metal-weight': IconScale,
  'tap-drill': IconDrill,
  'torque-converter': IconWrench,
  'gear-ratio': IconGear,
  'bolt-circle': IconBoltCircle,
  'triangle-solver': IconTriangle,
};