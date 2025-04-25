import {FingeringChart} from "../components/FingeringChart.tsx";

export default function Home() {
  return (

      <div className="min-h-screen flex bg-gray-900 text-gray-100">

        {/* Sidebar */}
        <aside className="w-48 bg-gray-950 p-4 space-y-2">
          <h2 className="text-lg font-bold mb-2">Scales</h2>
          <ul className="space-y-1">
            {["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"].map((note) => (
                <li>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-800">
                    {note}
                  </button>
                </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <img src="/logo.png" alt="Guitar Charts logo" className="w-28 mx-auto mb-1 rotate-90" />
          <h1 className="text-4xl font-bold text-center mb-4">Guitar Charts!</h1>

          <div className="bg-gray-800 p-6 rounded shadow text-center">
            <FingeringChart />
          </div>

          <div className="mt-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-amber-500" />
              <span className="ml-2">Show Intervals</span>
            </label>
          </div>
        </main>
      </div>

        );
        }
