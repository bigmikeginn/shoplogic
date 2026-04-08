/**
 * Joinery spacing calculator for consistent layouts
 */

export function calculateDovetailSpacing(length, numTails, tailWidth) {
  length = parseFloat(length) || 0;
  numTails = parseInt(numTails) || 1;
  tailWidth = parseFloat(tailWidth) || 0.5;

  const totalTailWidth = numTails * tailWidth;
  const spacingWidth = length - totalTailWidth;
  const numSpaces = numTails + 1;
  const spaceWidth = spacingWidth / numSpaces;

  const layout = [];
  let position = 0;

  for (let i = 0; i < numSpaces; i++) {
    layout.push({
      type: 'space',
      width: spaceWidth.toFixed(3),
      position: position.toFixed(3),
    });
    position += spaceWidth;

    if (i < numTails) {
      layout.push({
        type: 'tail',
        width: tailWidth.toFixed(3),
        position: position.toFixed(3),
      });
      position += tailWidth;
    }
  }

  return { layout, spaceWidth: spaceWidth.toFixed(3), valid: spaceWidth > 0 };
}

export function calculateMortiseSpacing(length, numMortises, mortiseWidth) {
  length = parseFloat(length) || 0;
  numMortises = parseInt(numMortises) || 1;
  mortiseWidth = parseFloat(mortiseWidth) || 0.5;

  const totalMortiseWidth = numMortises * mortiseWidth;
  const spacingWidth = length - totalMortiseWidth;
  const numSpaces = numMortises + 1;
  const spaceWidth = spacingWidth / numSpaces;

  const layout = [];
  let position = 0;

  for (let i = 0; i < numSpaces; i++) {
    layout.push({
      type: 'space',
      width: spaceWidth.toFixed(3),
      position: position.toFixed(3),
    });
    position += spaceWidth;

    if (i < numMortises) {
      layout.push({
        type: 'mortise',
        width: mortiseWidth.toFixed(3),
        position: position.toFixed(3),
      });
      position += mortiseWidth;
    }
  }

  return { layout, spaceWidth: spaceWidth.toFixed(3), valid: spaceWidth > 0 };
}

export function calculateTenonSpacing(length, numTenons, tennonWidth, gap) {
  length = parseFloat(length) || 0;
  numTenons = parseInt(numTenons) || 1;
  tennonWidth = parseFloat(tennonWidth) || 0.5;
  gap = parseFloat(gap) || 0.125;

  const totalWidth = numTenons * tennonWidth + (numTenons - 1) * gap;
  const edges = (length - totalWidth) / 2;

  if (edges < 0) {
    return { layout: [], valid: false, error: 'Not enough length for tenons' };
  }

  const layout = [];
  let position = edges;

  layout.push({ type: 'edge', width: edges.toFixed(3), position: '0' });

  for (let i = 0; i < numTenons; i++) {
    layout.push({
      type: 'tenon',
      width: tennonWidth.toFixed(3),
      position: position.toFixed(3),
    });
    position += tennonWidth;

    if (i < numTenons - 1) {
      layout.push({
        type: 'gap',
        width: gap.toFixed(3),
        position: position.toFixed(3),
      });
      position += gap;
    }
  }

  layout.push({
    type: 'edge',
    width: edges.toFixed(3),
    position: position.toFixed(3),
  });

  return { layout, valid: true, totalWidth: totalWidth.toFixed(3) };
}

export function calculateShelfPinSpacing(length, numPins) {
  length = parseFloat(length) || 0;
  numPins = parseInt(numPins) || 4;

  if (numPins < 2) return { layout: [], valid: false };

  const spacing = length / (numPins - 1);
  const layout = [];

  for (let i = 0; i < numPins; i++) {
    layout.push({
      type: 'pin',
      position: (i * spacing).toFixed(3),
      index: i + 1,
    });
  }

  return { layout, spacing: spacing.toFixed(3), valid: spacing > 0 };
}
