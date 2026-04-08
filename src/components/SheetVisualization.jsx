/**
 * SVG visualization of a plywood sheet with packed parts
 */

const SHEET_WIDTH = 48;
const SHEET_LENGTH = 96;
const SCALE = 3; // pixels per inch

export default function SheetVisualization({ sheet, sheetIdx, colors }) {
  const svgWidth = SHEET_WIDTH * SCALE;
  const svgHeight = SHEET_LENGTH * SCALE;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold mb-2 text-sm">Sheet {sheetIdx + 1}</h4>
      <svg
        width={svgWidth}
        height={svgHeight}
        className="border border-gray-300 bg-gray-50"
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
            stroke="#e5e7eb"
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
            stroke="#e5e7eb"
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
          stroke="#000"
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
              stroke="#333"
              strokeWidth="1"
              opacity="0.7"
            />
            <text
              x={(rect.x + rect.w / 2) * SCALE}
              y={(rect.y + rect.l / 2) * SCALE}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#000"
              pointerEvents="none"
            >
              {rect.w}"×{rect.l}"
            </text>
          </g>
        ))}
      </svg>
      <p className="text-xs text-gray-600 mt-2">
        Parts: {sheet.length} | Scale: 1" = {SCALE}px
      </p>
    </div>
  );
}
