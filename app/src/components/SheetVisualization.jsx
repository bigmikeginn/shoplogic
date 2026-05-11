/**
 * SVG visualization of a plywood sheet with packed parts
 */

const SHEET_SIZES = {
  '4x8': { width: 48, length: 96, label: '4\' × 8\'' },
  '5x5': { width: 60, length: 60, label: '5\' × 5\'' }
};

const SCALE = 3; // pixels per inch

export default function SheetVisualization({ sheet, sheetIdx, colors, sheetSize = '4x8' }) {
  const sheetDims = SHEET_SIZES[sheetSize] || SHEET_SIZES['4x8'];
  const SHEET_WIDTH = sheetDims.width;
  const SHEET_LENGTH = sheetDims.length;
  const svgWidth = SHEET_WIDTH * SCALE;
  const svgHeight = SHEET_LENGTH * SCALE;

  return (
    <div className="bg-gray-800 bg-opacity-50 p-4 sm:p-6 rounded border border-gray-700 backdrop-blur">
      <h4 className="font-semibold mb-4 text-responsive-lg text-white">Sheet {sheetIdx + 1}</h4>
      <svg
        width={svgWidth}
        height={svgHeight}
        className="border-2 border-gray-600 bg-gray-900"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        {/* Grid background */}
        {Array.from({ length: Math.ceil(SHEET_WIDTH / 12) + 1 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 12 * SCALE}
            y1={0}
            x2={i * 12 * SCALE}
            y2={svgHeight}
            stroke="#4b5563"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: Math.ceil(SHEET_LENGTH / 12) + 1 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 12 * SCALE}
            x2={svgWidth}
            y2={i * 12 * SCALE}
            stroke="#4b5563"
            strokeWidth="1"
          />
        ))}

        {/* Sheet border */}
        <rect
          x={0}
          y={0}
          width={svgWidth}
          height={svgHeight}
          fill="none"
          stroke="#8b9dc3"
          strokeWidth="2"
        />

        {/* Packed parts */}
        {sheet.map((rect, idx) => (
          <g key={idx}>
            <rect
              x={rect.x * SCALE}
              y={rect.y * SCALE}
              width={rect.w * SCALE}
              height={rect.l * SCALE}
              fill={colors[rect.partIdx % colors.length]}
              stroke="#1a1a1a"
              strokeWidth="1"
              opacity="0.85"
            />
            <text
              x={(rect.x + rect.w / 2) * SCALE}
              y={(rect.y + rect.l / 2) * SCALE}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#fff"
              pointerEvents="none"
            >
              {rect.w}"×{rect.l}"
            </text>
          </g>
        ))}
      </svg>
      <p className="text-xs text-gray-400 mt-3">
        Parts: {sheet.length} | Scale: 1" = {SCALE}px
      </p>
    </div>
  );
}
