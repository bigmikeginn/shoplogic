/**
 * Simple 2D bin packing for rectangular parts on 4x8 plywood sheets
 * Sheet dimensions: 48" × 96" (W × L)
 */

const SHEET_WIDTH = 48;  // inches
const SHEET_LENGTH = 96; // inches

/**
 * Pack parts onto sheets using shelf-packing algorithm
 * @param {Array} parts - [{width, length, qty}, ...]
 * @returns {Object} { sheets: [[{x, y, w, l, partIdx}]], waste, efficiency }
 */
export function packParts(parts) {
  if (!parts || parts.length === 0) return { sheets: [], waste: 0, efficiency: 0 };

  // Flatten: create individual items with part index
  const items = [];
  parts.forEach((part, idx) => {
    for (let i = 0; i < part.qty; i++) {
      items.push({ width: part.width, length: part.length, partIdx: idx });
    }
  });

  // Sort by area descending (best-fit heuristic)
  items.sort((a, b) => (b.width * b.length) - (a.width * a.length));

  const sheets = [];
  let currentSheet = [];
  let sheetUsed = 0;

  for (const item of items) {
    const placed = tryPlaceItem(item, currentSheet);

    if (!placed) {
      // Can't fit on current sheet, start new one
      if (currentSheet.length > 0) {
        sheets.push(currentSheet);
      }
      currentSheet = [];
      tryPlaceItem(item, currentSheet); // Force place on new sheet
    }
  }

  if (currentSheet.length > 0) {
    sheets.push(currentSheet);
  }

  // Calculate efficiency
  const totalArea = items.reduce((sum, i) => sum + (i.width * i.length), 0);
  const sheetArea = SHEET_WIDTH * SHEET_LENGTH * sheets.length;
  const waste = sheetArea - totalArea;
  const efficiency = totalArea / sheetArea;

  return {
    sheets,
    sheetCount: sheets.length,
    totalArea,
    sheetArea,
    waste: Math.round(waste * 100) / 100,
    efficiency: Math.round(efficiency * 10000) / 100 // percentage
  };
}

/**
 * Try to place item on sheet using guillotine algorithm
 * Simple left-to-right, top-to-bottom packing
 */
function tryPlaceItem(item, sheet) {
  // Try orientation 1: width × length
  if (canPlace(item.width, item.length, sheet)) {
    const pos = findPosition(item.width, item.length, sheet);
    sheet.push({ ...pos, w: item.width, l: item.length, partIdx: item.partIdx });
    return true;
  }

  // Try orientation 2: length × width (rotated)
  if (item.width !== item.length && canPlace(item.length, item.width, sheet)) {
    const pos = findPosition(item.length, item.width, sheet);
    sheet.push({ ...pos, w: item.length, l: item.width, partIdx: item.partIdx });
    return true;
  }

  return false;
}

function canPlace(w, l, sheet) {
  if (w > SHEET_WIDTH || l > SHEET_LENGTH) return false;
  if (sheet.length === 0) return true;

  const bounds = getUsedBounds(sheet);

  // Try placing next to existing items
  for (const rect of sheet) {
    // Right of rect
    if (rect.x + rect.w + w <= SHEET_WIDTH && bounds.maxY + l <= SHEET_LENGTH) {
      return true;
    }
  }

  // Try above items
  if (bounds.maxX + w <= SHEET_WIDTH && bounds.maxY + l <= SHEET_LENGTH) {
    return true;
  }

  return false;
}

function findPosition(w, l, sheet) {
  if (sheet.length === 0) return { x: 0, y: 0 };

  const bounds = getUsedBounds(sheet);

  // Try right edge
  for (const rect of sheet) {
    if (rect.x + rect.w + w <= SHEET_WIDTH && rect.y + l <= SHEET_LENGTH) {
      return { x: rect.x + rect.w, y: rect.y };
    }
  }

  // Try above (new row)
  if (bounds.maxX + w <= SHEET_WIDTH && bounds.maxY + l <= SHEET_LENGTH) {
    return { x: bounds.maxX, y: bounds.maxY };
  }

  // Fallback: top-left of unused space
  return { x: 0, y: bounds.maxY };
}

function getUsedBounds(sheet) {
  let maxX = 0, maxY = 0;
  for (const rect of sheet) {
    maxX = Math.max(maxX, rect.x + rect.w);
    maxY = Math.max(maxY, rect.y + rect.l);
  }
  return { maxX, maxY };
}
