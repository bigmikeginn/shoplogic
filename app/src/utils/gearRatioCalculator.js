/**
 * Gear Ratio & RPM Calculator
 *
 * Computes gear ratios, output RPM, and vehicle speed from tire size.
 *
 * Ratio = driven teeth / drive teeth
 * Output RPM = input RPM / ratio
 * Speed (mph) = (RPM × tire circumference × 60) / (ratio × 63360)
 *   where circumference = π × tire diameter in inches, 63360 = inches per mile
 */

/**
 * Calculate gear ratio from tooth counts.
 * @param {number} driveTeeth — teeth on drive gear
 * @param {number} drivenTeeth — teeth on driven gear
 * @returns {{ ratio, ratioFormatted, isOverdrive, isUnderdrive }}
 */
export function calculateGearRatio(driveTeeth, drivenTeeth) {
  driveTeeth = parseInt(driveTeeth) || 0;
  drivenTeeth = parseInt(drivenTeeth) || 0;

  if (driveTeeth <= 0 || drivenTeeth <= 0) {
    return { error: 'Enter valid tooth counts' };
  }

  const ratio = drivenTeeth / driveTeeth;
  const isOverdrive = ratio < 1;
  const isUnderdrive = ratio > 1;

  return {
    driveTeeth,
    drivenTeeth,
    ratio: Math.round(ratio * 1000) / 1000,
    ratioFormatted: `${drivenTeeth}:${driveTeeth}`,
    isOverdrive,
    isUnderdrive,
    description: isOverdrive ? 'Overdrive (output faster)' : isUnderdrive ? 'Underdrive (torque multiplier)' : 'Direct drive (1:1)',
  };
}

/**
 * Calculate output RPM from input RPM and gear ratio.
 * @param {number} inputRPM
 * @param {number} ratio — driven/drive
 * @returns {{ inputRPM, outputRPM }}
 */
export function calculateOutputRPM(inputRPM, ratio) {
  inputRPM = parseFloat(inputRPM) || 0;
  ratio = parseFloat(ratio) || 1;

  if (inputRPM <= 0) return { error: 'Enter valid RPM' };

  const outputRPM = inputRPM / ratio;

  return {
    inputRPM: Math.round(inputRPM),
    ratio: Math.round(ratio * 1000) / 1000,
    outputRPM: Math.round(outputRPM * 10) / 10,
  };
}

/**
 * Calculate vehicle speed from RPM, gear ratio, and tire diameter.
 * @param {number} rpm — engine RPM
 * @param {number} ratio — final drive ratio (transmission × differential)
 * @param {number} tireDiameter — tire diameter in inches
 * @returns {{ speedMph, speedKph }}
 */
export function calculateSpeed(rpm, ratio, tireDiameter) {
  rpm = parseFloat(rpm) || 0;
  ratio = parseFloat(ratio) || 1;
  tireDiameter = parseFloat(tireDiameter) || 0;

  if (rpm <= 0 || tireDiameter <= 0) {
    return { error: 'Enter valid RPM and tire diameter' };
  }

  const circumference = Math.PI * tireDiameter; // inches
  const speedMph = (rpm * circumference * 60) / (ratio * 63360);
  const speedKph = speedMph * 1.60934;

  return {
    rpm: Math.round(rpm),
    ratio: Math.round(ratio * 1000) / 1000,
    tireDiameter: Math.round(tireDiameter * 10) / 10,
    circumference: Math.round(circumference * 10) / 10,
    speedMph: Math.round(speedMph * 10) / 10,
    speedKph: Math.round(speedKph * 10) / 10,
  };
}

/**
 * Calculate compound ratio (e.g., transmission × differential).
 */
export function calculateCompoundRatio(ratio1, ratio2) {
  ratio1 = parseFloat(ratio1) || 1;
  ratio2 = parseFloat(ratio2) || 1;

  return {
    ratio1: Math.round(ratio1 * 100) / 100,
    ratio2: Math.round(ratio2 * 100) / 100,
    compoundRatio: Math.round(ratio1 * ratio2 * 1000) / 1000,
  };
}