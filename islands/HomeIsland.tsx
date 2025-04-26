import { useState } from "preact/hooks";
import CircleOfFifths from "../islands/CircleOfFifths.tsx";
import { FingeringChart } from "../components/FingeringChart.tsx";

export default function HomeIsland() {
  const [selectedKey, setSelectedKey] = useState<string>("C");
  const [showIntervals, setShowIntervals] = useState<boolean>(true);
  const [scaleMode, setScaleMode] = useState("Major Scale");
  const cagedPositions = ["C", "A", "G", "E", "D"];

  return (
      <div className="min-h-screen min-w-screen bg-gray-900 text-gray-100 grid grid-rows-2 grid-cols-3">

        {/* Tile 1: Navigation & Controls */}
        <div className="flex flex-col items-center justify-center bg-gray-950 p-4 border border-gray-800">
          <CircleOfFifths selectedKey={selectedKey} onKeySelect={setSelectedKey} />

          <div className="mt-6 space-y-4 w-full">

            <div className="flex flex-col items-start">
              <label className="mb-1 font-semibold">Scale:</label>
              <select
                  value={scaleMode}
                  onChange={(e) => setScaleMode((e.target as HTMLSelectElement).value)}
                  className="w-full bg-gray-800 p-2 rounded shadow border border-gray-700"
              >
                <option>Major Scale</option>
                <option>Natural Minor</option>
                <option>Major Pentatonic</option>
                <option>Minor Pentatonic</option>
                <option>Major Blues</option>
                <option>Minor Blues</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                  type="checkbox"
                  checked={showIntervals}
                  onChange={() => setShowIntervals(!showIntervals)}
                  className="form-checkbox text-amber-500 mr-2"
              />
              <span>Show Intervals</span>
            </div>
          </div>
        </div>

        {/* Tiles 2–6: CAGED Fingering Charts */}
        {cagedPositions.map((position) => (
            <div key={position} className="flex items-center justify-center bg-gray-800 p-4 border border-gray-700">
              <FingeringChart
                  keyName={selectedKey}
                  position={position}
                  showIntervals={showIntervals}
                  mode={scaleMode}
                  startFret={0}
              />
            </div>
        ))}

      </div>
  );
}