/**
 * Cut List Generator - Generate optimized cut lists from project dimensions
 */

import { calculateBoardFeet } from './boardFeetCalculator';

/**
 * Add part to cut list
 * @param {Array} parts - Current parts array
 * @param {Object} part - { name, thickness, width, length, quantity }
 */
export function addPart(parts, part) {
  return [...parts, { ...part, id: Date.now() }];
}

/**
 * Generate cut list with board feet calculations
 */
export function generateCutList(parts, thickness = 0.75) {
  if (!parts || parts.length === 0) return { parts: [], summary: {} };

  const processedParts = parts.map((part) => {
    const qty = parseInt(part.quantity) || 1;
    const t = parseFloat(part.thickness) || thickness;
    const w = parseFloat(part.width) || 0;
    const l = parseFloat(part.length) || 0;

    const boardFeet = calculateBoardFeet(qty, t, w, l);
    const surfaceArea = (qty * w * l) / 144; // sq ft

    return {
      ...part,
      qty,
      thickness: t,
      width: w,
      length: l,
      boardFeet,
      surfaceArea,
      totalLength: (qty * l).toFixed(2),
    };
  });

  // Summary
  const totalBF = processedParts.reduce((sum, p) => sum + p.boardFeet, 0);
  const totalQty = processedParts.reduce((sum, p) => sum + p.qty, 0);
  const totalArea = processedParts.reduce((sum, p) => sum + p.surfaceArea, 0);

  return {
    parts: processedParts,
    summary: {
      totalParts: totalQty,
      totalBoardFeet: Math.round(totalBF * 100) / 100,
      totalSurfaceArea: Math.round(totalArea * 100) / 100,
      estimatedSheets: Math.ceil(totalBF / 48), // ~48 BF per 4x8 sheet avg
    },
  };
}

/**
 * Optimize layout on standard sheets (4x8, 4x10, etc)
 */
export function optimizeForSheets(parts, sheetLength = 96) {
  const sorted = [...parts].sort((a, b) => b.length - a.length);
  const sheets = [];
  let currentSheet = { length: sheetLength, used: 0, parts: [] };

  for (const part of sorted) {
    for (let i = 0; i < part.qty; i++) {
      if (currentSheet.used + part.length <= sheetLength) {
        currentSheet.parts.push(part);
        currentSheet.used += part.length;
      } else {
        sheets.push(currentSheet);
        currentSheet = { length: sheetLength, used: part.length, parts: [part] };
      }
    }
  }

  if (currentSheet.parts.length > 0) {
    sheets.push(currentSheet);
  }

  return sheets.map((sheet) => ({
    ...sheet,
    waste: sheet.length - sheet.used,
    efficiency: ((sheet.used / sheet.length) * 100).toFixed(1),
  }));
}
