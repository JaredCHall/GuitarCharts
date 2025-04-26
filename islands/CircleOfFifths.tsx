import { h } from "preact";
import { useState } from "preact/hooks";

interface Key {
  major: string;
  minor: string;
}

const keys: Key[] = [
  { major: "C", minor: "a" },
  { major: "G", minor: "e" },
  { major: "D", minor: "b" },
  { major: "A", minor: "f#" },
  { major: "E", minor: "c#" },
  { major: "B", minor: "g#" },
  { major: "F#", minor: "d#" },
  { major: "C♭", minor: "a♭" },
  { major: "G♭", minor: "e♭" },
  { major: "D♭", minor: "b♭" },
  { major: "A♭", minor: "f" },
  { major: "E♭", minor: "c" },
  { major: "B♭", minor: "g" },
  { major: "F", minor: "d" },
];

const CircleOfFifths = () => {
  const radius = 120;
  const center = 150;
  const angleStep = (2 * Math.PI) / keys.length;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
      <svg width="300" height="300" viewBox="0 0 300 300" class="mx-auto">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#444" stroke-width="2" />

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
          const fill = isHovered ? "#1f2937" : "#111827";
          const stroke = isHovered ? "#d1d5db" : "#6b7280";

          return (
              <g
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
              >
                <circle cx={xOuter} cy={yOuter} r={16} fill={fill} stroke={stroke} stroke-width="2" />
                <text x={xOuter} y={yOuter + 1} text-anchor="middle" dominant-baseline="middle" fill="#f3f4f6" font-size="12" font-weight="bold">
                  {key.major}
                </text>

                <text x={xInner} y={yInner} text-anchor="middle" dominant-baseline="middle" fill="#9ca3af" font-size="10">
                  {key.minor}
                </text>
              </g>
          );
        })}
      </svg>
  );
};

export default CircleOfFifths;
