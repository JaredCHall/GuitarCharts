import { JSX } from "preact";

interface FingeringChartProps extends JSX.HTMLAttributes<HTMLDivElement> {
  keyName: string;
  position: string;
  showIntervals: boolean;
  mode: string;
}

const strings = 6;
const frets = 5;
const width = 300;  // Wider for horizontal layout
const height = 140; // Shorter to maintain landscape orientation
const stringSpacing = height / (strings - 1);
const fretSpacing = width / frets;

// Define exaggerated string thicknesses (low E to high E)
const stringWidths = [10, 7, 5, 3, 2, 1];

// Ebony-like background, bronze strings, silver frets
const ebony = "#161617";
const bronze = "#a57034";
const silver = "#c0c0c0";

export function FingeringChart(props: FingeringChartProps) {
  return (
      <div className="flex flex-col items-center">
        <svg width={width} height={height} style={{ backgroundColor: ebony }}>
          {/* Draw frets */}
          {Array.from({ length: frets + 1 }).map((_, i) => (
              <line
                  key={"fret-" + i}
                  x1={i * fretSpacing}
                  y1={0}
                  x2={i * fretSpacing}
                  y2={height}
                  stroke={silver}
                  strokeWidth={i === 0 ? 4 : 2} // Nut is thicker
              />
          ))}

          {/* Draw strings (flipped: low E at bottom) */}
          {Array.from({ length: strings }).map((_, i) => {
            const flippedIndex = strings - 1 - i;
            return (
                <line
                    key={"string-" + i}
                    x1={0}
                    y1={i * stringSpacing}
                    x2={width}
                    y2={i * stringSpacing}
                    stroke={bronze}
                    style={{ strokeWidth: stringWidths[flippedIndex] }}
                    strokeLinecap="round"
                />
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
