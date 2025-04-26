import { useState } from "preact/hooks";

interface Key {
  major: string;
  minor: string;
}

interface Props {
  selectedKey: string;
  onKeySelect: (key: string) => void;
  selectedLabelMode: string;
  onLabelModeSelect: (key: "none" | "intervals" | "notes") => void;
}

const keys: Key[] = [
  { major: "C", minor: "a" },
  { major: "G", minor: "e" },
  { major: "D", minor: "b" },
  { major: "A", minor: "f#" },
  { major: "E", minor: "c#" },
  { major: "B", minor: "g#" },
  { major: "F#", minor: "d#" },
  { major: "D♭", minor: "b♭" },
  { major: "A♭", minor: "f" },
  { major: "E♭", minor: "c" },
  { major: "B♭", minor: "g" },
  { major: "F", minor: "d" },
];

export default function CircleOfFifths({ selectedKey, onKeySelect, selectedLabelMode, onLabelModeSelect }: Props) {
  const radius = 120;
  const center = 150;
  const angleStep = (2 * Math.PI) / keys.length;
  const [hovered, setHovered] = useState<number | null>(null);

  return (

      <div className="flex items-center justify-center">

        {/* Display toggles */}
        <div className="flex flex-col items-center space-y-2 mr-4">
          <div className="flex flex-col items-center space-y-2 mr-4">
            <button
                onClick={() => onLabelModeSelect("none")}
                className={`p-2 rounded-full transition-transform transform hover:scale-110 ${selectedLabelMode === "none" ? "bg-yellow-500" : "bg-gray-700"}`}
                title="Clean"
            >
              👁️‍🗨️
            </button>
            <button
                onClick={() => onLabelModeSelect("intervals")}
                className={`p-2 rounded-full transition-transform transform hover:scale-110 ${selectedLabelMode === "intervals" ? "bg-yellow-500" : "bg-gray-700"}`}
                title="Intervals"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
              >
                <text x="0" y="17" fontSize="14" fontWeight="bold">123</text>
              </svg>

            </button>
            <button
                onClick={() => onLabelModeSelect("notes")}
                className={`p-2 rounded-full transition-transform transform hover:scale-110 ${selectedLabelMode === "notes" ? "bg-yellow-500" : "bg-gray-700"}`}
                title="Note Names"
            >
              🎵
            </button>
          </div>
        </div>

        {/* CircleOfFifths SVG */}
        <div>
          <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#444" stroke-width="2"/>

            <image
                href="/logo.png"
                x={center - 60}
                y={center - 60}
                width="120"
                height="120"
            />

            {keys.map((key, i) => {
              const angle = angleStep * i - Math.PI / 2;
              const xOuter = center + radius * Math.cos(angle);
              const yOuter = center + radius * Math.sin(angle);
              const xInner = center + (radius - 30) * Math.cos(angle);
              const yInner = center + (radius - 30) * Math.sin(angle);

              const isHovered = i === hovered;
              const isSelected = key.major === selectedKey;
              const fill = isSelected ? "#f59e0b" : isHovered ? "#1f2937" : "#111827";
              const stroke = isSelected ? "#fbbf24" : isHovered ? "#d1d5db" : "#6b7280";
              const textColor = isSelected ? "#000000" : "#f3f4f6";

              return (
                  <g
                      key={i}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => onKeySelect(key.major)}
                      style={{cursor: "pointer"}}
                  >
                    <circle cx={xOuter} cy={yOuter} r={16} fill={fill} stroke={stroke} stroke-width="2"/>
                    <text x={xOuter} y={yOuter + 1} text-anchor="middle" dominant-baseline="middle" fill={textColor}
                          font-size="12" font-weight="bold">
                      {key.major}
                    </text>

                    <text x={xInner} y={yInner} text-anchor="middle" dominant-baseline="middle" fill="#9ca3af"
                          font-size="10">
                      {key.minor}
                    </text>
                  </g>
              );
            })}
          </svg>
        </div>


      </div>


  );
}
