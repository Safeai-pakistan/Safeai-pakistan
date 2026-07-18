import { useState } from "react";
import { emergencyGuides } from "../../data/guides";

export default function EmergencyGuides() {
  const [search, setSearch] = useState("");

  const filtered = emergencyGuides.filter((guide) =>
    guide.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-5">
      <h2 className="text-3xl font-bold text-white mb-6">
        📖 Emergency Guides
      </h2>

      <input
        type="text"
        placeholder="🔍 Search guides..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-500"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((guide) => (
          <div
            key={guide.title}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-lg hover:scale-105 transition duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {guide.title}
            </h3>

            <ol className="space-y-2 text-gray-300">
              {guide.steps.map((step, index) => (
                <li key={index}>
                  <span className="text-cyan-400 font-bold">
                    {index + 1}.
                  </span>{" "}
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}