/**
 * Wood species database with properties
 * Movement: % change in width from 0% to fiber saturation point
 * Hardness: Janka scale (higher = harder)
 */

export const WOOD_DATABASE = [
  {
    name: 'White Oak',
    movement: 7.6,
    hardness: 1360,
    color: 'Light tan/brown',
    grain: 'Straight to wavy',
    workability: 'Good',
    finishing: 'Stains well, open grain',
    density: 0.75,
  },
  {
    name: 'Red Oak',
    movement: 8.6,
    hardness: 1290,
    color: 'Reddish-brown',
    grain: 'Straight, coarse',
    workability: 'Good',
    finishing: 'Stains well, open grain',
    density: 0.74,
  },
  {
    name: 'Walnut',
    movement: 5.5,
    hardness: 1010,
    color: 'Dark chocolate brown',
    grain: 'Straight to wavy',
    workability: 'Excellent',
    finishing: 'Excellent natural color',
    density: 0.62,
  },
  {
    name: 'Maple (Hard)',
    movement: 9.9,
    hardness: 1450,
    color: 'Pale cream',
    grain: 'Tight, fine',
    workability: 'Difficult (tear-out)',
    finishing: 'Takes stain unevenly',
    density: 0.75,
  },
  {
    name: 'Cherry',
    movement: 5.6,
    hardness: 995,
    color: 'Light red-brown',
    grain: 'Straight, fine',
    workability: 'Excellent',
    finishing: 'Excellent, develops patina',
    density: 0.58,
  },
  {
    name: 'Ash',
    movement: 9.5,
    hardness: 1320,
    color: 'Pale golden',
    grain: 'Open, coarse',
    workability: 'Good',
    finishing: 'Stains well',
    density: 0.65,
  },
  {
    name: 'Poplar',
    movement: 8.2,
    hardness: 540,
    color: 'Pale green/cream',
    grain: 'Fine, straight',
    workability: 'Excellent',
    finishing: 'Soft, poor for stain',
    density: 0.42,
  },
  {
    name: 'Pine (Eastern)',
    movement: 6.1,
    hardness: 690,
    color: 'Cream to light brown',
    grain: 'Straight, open',
    workability: 'Very good',
    finishing: 'Soft, knots absorb stain',
    density: 0.51,
  },
  {
    name: 'Mahogany',
    movement: 4.4,
    hardness: 900,
    color: 'Deep reddish-brown',
    grain: 'Straight to interlocked',
    workability: 'Very good',
    finishing: 'Excellent natural color',
    density: 0.56,
  },
  {
    name: 'Teak',
    movement: 2.5,
    hardness: 1155,
    color: 'Golden-brown',
    grain: 'Straight to wavy',
    workability: 'Good (oily)',
    finishing: 'Excellent, very stable',
    density: 0.75,
  },
  {
    name: 'Birch',
    movement: 9.4,
    hardness: 1260,
    color: 'White to pale brown',
    grain: 'Fine, straight',
    workability: 'Good',
    finishing: 'Good, tear-out possible',
    density: 0.71,
  },
  {
    name: 'Hickory',
    movement: 10.9,
    hardness: 1820,
    color: 'Reddish-brown',
    grain: 'Coarse, wavy',
    workability: 'Difficult',
    finishing: 'Takes stain well',
    density: 0.81,
  },
];

export function getWoodByName(name) {
  return WOOD_DATABASE.find((w) => w.name.toLowerCase() === name.toLowerCase());
}

export function searchWood(query) {
  const q = query.toLowerCase();
  return WOOD_DATABASE.filter((w) =>
    w.name.toLowerCase().includes(q) ||
    w.color.toLowerCase().includes(q) ||
    w.workability.toLowerCase().includes(q)
  );
}

export function getWoodsByHardness(minHardness) {
  return WOOD_DATABASE.filter((w) => w.hardness >= minHardness).sort(
    (a, b) => b.hardness - a.hardness
  );
}

export function getWoodsByStability(maxMovement) {
  return WOOD_DATABASE.filter((w) => w.movement <= maxMovement).sort(
    (a, b) => a.movement - b.movement
  );
}
