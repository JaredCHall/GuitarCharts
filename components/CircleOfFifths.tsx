import { h } from "preact";

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

  return (
      <svg width="300" height="300" viewBox="0 0 300 300">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#ccc" stroke-width="2" />
        {keys.map((key, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const xOuter = center + radius * Math.cos(angle);
          const yOuter = center + radius * Math.sin(angle);
          const xInner = center + (radius - 30) * Math.cos(angle);
          const yInner = center + (radius - 30) * Math.sin(angle);
          return (
              <g key={i}>
                <text x={xOuter} y={yOuter} text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="14">
                  {key.major}
                </text>
                <text x={xInner} y={yInner} text-anchor="middle" dominant-baseline="middle" fill="#aaa" font-size="10">
                  {key.minor}
                </text>
              </g>
          );
        })}
      </svg>
  );
};

export default CircleOfFifths;
