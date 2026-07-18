import { useState } from "react";
import {
  Flashlight,
  MapPinned,
  Compass,
  Battery,
} from "lucide-react";

export default function EmergencyToolkit() {
  const [battery, setBattery] = useState("Unknown");

  async function checkBattery() {
    try {
      const nav = navigator as any;

      if (!nav.getBattery) {
        alert("Battery API is not supported in this browser.");
        return;
      }

      const batteryManager = await nav.getBattery();
      setBattery(`${Math.round(batteryManager.level * 100)}%`);
    } catch {
      alert("Unable to read battery information.");
    }
  }

  function shareLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const url = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;

      if (navigator.share) {
        navigator.share({
          title: "My Current Location",
          text: "Here is my live location.",
          url,
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Location link copied to clipboard.");
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-5">
      <h2 className="text-3xl font-bold text-white mb-6">
        🧰 Emergency Toolkit
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <button
          onClick={shareLocation}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-400 transition"
        >
          <MapPinned className="text-cyan-400 mb-3" size={40} />
          <h3 className="text-white font-bold">Share Location</h3>
          <p className="text-slate-400 text-sm mt-2">
            Share your live GPS location.
          </p>
        </button>

        <button
          onClick={checkBattery}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-green-400 transition"
        >
          <Battery className="text-green-400 mb-3" size={40} />
          <h3 className="text-white font-bold">Battery Level</h3>
          <p className="text-slate-400 text-sm mt-2">
            {battery}
          </p>
        </button>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <Compass className="text-orange-400 mb-3" size={40} />
          <h3 className="text-white font-bold">Compass</h3>
          <p className="text-slate-400 text-sm mt-2">
            Coming Soon
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <Flashlight className="text-yellow-400 mb-3" size={40} />
          <h3 className="text-white font-bold">Flashlight</h3>
          <p className="text-slate-400 text-sm mt-2">
            Coming Soon
          </p>
        </div>

      </div>
    </div>
  );
}