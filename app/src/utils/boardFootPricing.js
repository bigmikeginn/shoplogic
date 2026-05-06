/**
 * Board Foot Price Calculator
 *
 * Computes total cost from board feet quantity and $/BF pricing.
 * Supports waste factor, sales tax, and lumber markup tiers.
 */

export const WASTE_PRESETS = [
  { value: 0, label: 'No waste' },
  { value: 10, label: '10% waste' },
  { value: 15, label: '15% waste' },
  { value: 20, label: '20% waste' },
  { value: 30, label: '30% waste' },
  { value: 50, label: '50% waste (curved work)' },
];

export const PRICE_TIERS = [
  { name: 'Economy (pine, poplar)', range: '$2–5/BF', defaultPrice: 3.5 },
  { name: 'Mid-range (oak, cherry, ash)', range: '$5–10/BF', defaultPrice: 7.0 },
  { name: 'Premium (walnut, maple)', range: '$8–15/BF', defaultPrice: 11.0 },
  { name: 'Exotic (teak, mahogany)', range: '$12–30/BF', defaultPrice: 18.0 },
];

/**
 * Calculate total cost for a board foot quantity.
 * @param {number} boardFeet — Total board feet needed
 * @param {number} pricePerBF — Price per board foot in dollars
 * @param {number} wastePercent — Waste factor percentage (e.g., 20 for 20%)
 * @param {number} taxPercent — Sales tax percentage (0 for no tax)
 * @returns {{ subtotal, wasteBF, wasteCost, subtotalWithWaste, tax, total, effectivePriceBF }}
 */
export function calculateCost(boardFeet, pricePerBF = 7, wastePercent = 20, taxPercent = 0) {
  boardFeet = parseFloat(boardFeet) || 0;
  pricePerBF = parseFloat(pricePerBF) || 0;
  wastePercent = parseFloat(wastePercent) || 0;
  taxPercent = parseFloat(taxPercent) || 0;

  if (boardFeet <= 0 || pricePerBF <= 0) {
    return { error: 'Enter valid board feet and price' };
  }

  const wasteBF = boardFeet * (wastePercent / 100);
  const totalBF = boardFeet + wasteBF;
  const subtotal = boardFeet * pricePerBF;
  const wasteCost = wasteBF * pricePerBF;
  const subtotalWithWaste = totalBF * pricePerBF;
  const tax = subtotalWithWaste * (taxPercent / 100);
  const total = subtotalWithWaste + tax;
  const effectivePriceBF = total / boardFeet;

  return {
    boardFeet: Math.round(boardFeet * 100) / 100,
    pricePerBF: Math.round(pricePerBF * 100) / 100,
    wastePercent: Math.round(wastePercent * 100) / 100,
    taxPercent: Math.round(taxPercent * 100) / 100,
    wasteBF: Math.round(wasteBF * 100) / 100,
    totalBF: Math.round(totalBF * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    wasteCost: Math.round(wasteCost * 100) / 100,
    subtotalWithWaste: Math.round(subtotalWithWaste * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    effectivePriceBF: Math.round(effectivePriceBF * 100) / 100,
  };
}

/**
 * Reverse calculate: how many board feet can be bought within a budget.
 */
export function budgetToBF(budget, pricePerBF = 7, wastePercent = 20, taxPercent = 0) {
  budget = parseFloat(budget) || 0;
  pricePerBF = parseFloat(pricePerBF) || 0;
  wastePercent = parseFloat(wastePercent) || 0;
  taxPercent = parseFloat(taxPercent) || 0;

  if (budget <= 0 || pricePerBF <= 0) {
    return { error: 'Enter valid budget and price' };
  }

  // total = (BF + BF*waste%) * price * (1 + tax%)
  // BF = total / (price * (1 + waste%) * (1 + tax%))
  const wasteFactor = 1 + wastePercent / 100;
  const taxFactor = 1 + taxPercent / 100;
  const affordableBF = budget / (pricePerBF * wasteFactor * taxFactor);

  return {
    budget: Math.round(budget * 100) / 100,
    affordableBoardFeet: Math.round(affordableBF * 100) / 100,
    wasteIncluded: Math.round(affordableBF * (wastePercent / 100) * 100) / 100,
    usableBoardFeet: Math.round(affordableBF * 100) / 100,
  };
}