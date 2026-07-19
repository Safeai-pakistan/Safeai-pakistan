import { useEffect, useState } from "react";
import {
  Flashlight,
  MapPinned,
  Compass,
  Battery,
  Navigation,
} from "lucide-react";

export default function EmergencyToolkit() {
  const [battery, setBattery] = useState("Unknown");
  const [heading, setHeading] = useState<number | null>(null);
  const [coords, setCoords] = useState("");
  const [flashSupport, setFlashSupport] = useState(false);

  useEffect(() => {
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", (e) => {
        if (e.alpha !== null) {
          setHeading(Math.round(e.alpha));
        }
      });
    }

    setFlashSupport(
      !!navigator.mediaDevices &&
        !!navigator.mediaDevices.getUserMedia
    );
  }, []);

  async function checkBattery() {
    try {
      const nav = navigator as any;

      if (!nav.getBattery) {
        alert("Battery API is not supported.");
        return;
      }

      const info = await nav.getBattery();
      setBattery(`${Math.round(info.level * 100)}%`);
    } catch {
      alert("Unable to read battery.");
    }
  }

  function shareLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setCoords(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);

      const url = `https://www.google.com/maps?q=${lat},${lng}`;

      if (navigator.share) {
        navigator.share({
          title: "My Live Location",
          text: "Emergency Location",
          url,
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Location copied.");
      }
    });
  }

  function flashlightInfo() {
    alert(
      flashSupport
        ? "Camera access is available. Flashlight control depends on your device/browser."
        : "Flashlight is not supported on this device/browser."
    );
  }

  return (
    <section className="max-w-6xl mx-auto mt-12 px-5">
      <h2 className="text-3xl font-bold text-white mb-6">
        🧰 Emergency Toolkit
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <button
          onClick={shareLocation}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 transition"
        >
          <MapPinned className="text-cyan-400 mb-3" size={42} />
          <h3 className="text-white font-bold">
            Share Location
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            {coords || "Share your live GPS"}
          </p>
        </button>

        <button
          onClick={checkBattery}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-green-500 transition"
        >
          <Battery className="text-green-400 mb-3" size={42} />
          <h3 className="text-white font-bold">
            Battery
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            {battery}
          </p>
        </button>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <Compass className="text-orange-400 mb-3" size={42} />
          <h3 className="text-white font-bold">
            Compass
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            {heading !== null
              ? `${heading}°`
              : "Supported on mobile devices"}
          </p>
        </div>

        <button
          onClick={flashlightInfo}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-yellow-500 transition"
        >
          <Flashlight className="text-yellow-400 mb-3" size={42} />
          <h3 className="text-white font-bold">
            Flashlight
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            {flashSupport
              ? "Support Detected"
              : "Not Supported"}
          </p>
        </button>

      </div>

      <div className="mt-6 bg-slate-900 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
        <Navigation className="text-cyan-400" />
        <p className="text-slate-300">
          Tip: Share your live location with rescuers during emergencies.
        </p>
      </div>
    </section>
  );
}