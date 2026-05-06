/**
 * Metric ↔ Imperial unit conversions
 */

const CONVERSIONS = {
  length: [
    { from: 'mm', to: 'in', factor: 0.03937, label: 'Millimeters → Inches' },
    { from: 'cm', to: 'in', factor: 0.3937, label: 'Centimeters → Inches' },
    { from: 'm', to: 'ft', factor: 3.281, label: 'Meters → Feet' },
    { from: 'in', to: 'mm', factor: 25.4, label: 'Inches → Millimeters' },
    { from: 'ft', to: 'm', factor: 0.3048, label: 'Feet → Meters' },
    { from: 'yd', to: 'm', factor: 0.9144, label: 'Yards → Meters' },
  ],
  area: [
    { from: 'cm²', to: 'in²', factor: 0.155, label: 'Sq Cm → Sq In' },
    { from: 'm²', to: 'ft²', factor: 10.764, label: 'Sq Meters → Sq Feet' },
    { from: 'in²', to: 'cm²', factor: 6.452, label: 'Sq In → Sq Cm' },
    { from: 'ft²', to: 'm²', factor: 0.0929, label: 'Sq Feet → Sq Meters' },
  ],
  volume: [
    { from: 'ml', to: 'fl oz', factor: 0.034, label: 'Milliliters → Fl Oz' },
    { from: 'l', to: 'gal', factor: 0.264, label: 'Liters → Gallons' },
    { from: 'fl oz', to: 'ml', factor: 29.574, label: 'Fl Oz → Milliliters' },
    { from: 'gal', to: 'l', factor: 3.785, label: 'Gallons → Liters' },
  ],
  weight: [
    { from: 'g', to: 'oz', factor: 0.03527, label: 'Grams → Ounces' },
    { from: 'kg', to: 'lb', factor: 2.205, label: 'Kilograms → Pounds' },
    { from: 'oz', to: 'g', factor: 28.35, label: 'Ounces → Grams' },
    { from: 'lb', to: 'kg', factor: 0.4536, label: 'Pounds → Kilograms' },
  ],
  temperature: [], // Special handling
};

export function convert(value, fromUnit, toUnit) {
  value = parseFloat(value) || 0;

  // Temperature special case
  if (fromUnit === '°C' && toUnit === '°F') {
    return (value * 9) / 5 + 32;
  }
  if (fromUnit === '°F' && toUnit === '°C') {
    return ((value - 32) * 5) / 9;
  }

  // Find conversion in all categories
  for (const category of Object.values(CONVERSIONS)) {
    const conv = category.find((c) => c.from === fromUnit && c.to === toUnit);
    if (conv) {
      return value * conv.factor;
    }
  }

  return null;
}

export function getConversionsByCategory() {
  return CONVERSIONS;
}

export function getAllConversions() {
  return Object.values(CONVERSIONS).flat();
}
