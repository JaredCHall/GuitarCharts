import { JSX } from "preact";

interface FingeringChartProps extends JSX.HTMLAttributes<HTMLDivElement> {
  keyName: string;
  position: string;
  showIntervals: boolean;
  mode: string;
}

const strings = 6;
const frets = 5;
const width = 300;
const height = 140;
const verticalPadding = 16; // Add padding above and below
const paddedHeight = height + verticalPadding * 2;

const stringSpacing = height / (strings - 1);
const fretSpacing = width / frets;

const frettedNotes = [
  { string: 0, fret: 3, interval: "1" },
  { string: 1, fret: 2, interval: "2" },
  { string: 2, fret: 0, interval: "3" },
];

// Define exaggerated string thicknesses (low E to high E)
const stringWidths = [10, 7, 5, 3, 2, 1];

// Ebony-like background, bronze strings, silver frets
const ebony = "#161617";
const bronze = "#a57034";
const silver = "#c0c0c0";

export function FingeringChart(props: FingeringChartProps) {
  return (
      <div className="flex flex-col items-center">
        <svg width={width} height={paddedHeight} style={{ backgroundColor: ebony }}>
          {/* Draw frets */}
          {Array.from({ length: frets + 1 }).map((_, i) => (
              <line
                  key={"fret-" + i}
                  x1={i * fretSpacing}
                  y1={0}
                  x2={i * fretSpacing}
                  y2={paddedHeight}
                  stroke={silver}
                  strokeWidth={i === 0 ? 4 : 2}
              />
          ))}

          {/* Draw strings (flipped: low E at bottom) */}
          {Array.from({ length: strings }).map((_, i) => {
            const flippedIndex = strings - 1 - i;
            const y = i * stringSpacing + verticalPadding;
            return (
                <line
                    key={"string-" + i}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke={bronze}
                    style={{ strokeWidth: stringWidths[flippedIndex] }}
                    strokeLinecap="round"
                />
            );
          })}

          {/* Draw note markers */}
          {frettedNotes.map((note, i) => {
            const y = (strings - 1 - note.string) * stringSpacing + verticalPadding;
            const x = note.fret * fretSpacing + fretSpacing / 2;
            const isRoot = note.interval === "1";
            const fillColor = isRoot ? "red" : "yellow";

            return (
                <g key={"note-" + i}>
                  <circle
                      cx={x}
                      cy={y}
                      r={12}
                      fill={fillColor}
                      stroke="black"
                      strokeWidth={1.5}
                  />
                  {props.showIntervals && (
                      <text
                          x={x - 3.5}
                          y={y + 6}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          fill="black"
                      >
                        {note.interval}
                      </text>
                  )}
                </g>
            );
          })}
        </svg>

        <div className="mt-2 text-sm text-center">
          <p><strong>Key:</strong> {props.keyName}</p>
          <p><strong>Position:</strong> {props.position}</p>
          <p><strong>Mode:</strong> {props.mode}</p>
          <p><strong>Show Intervals:</strong> {props.showIntervals ? "Yes" : "No"}</p>
        </div>
      </div>
  );
}
