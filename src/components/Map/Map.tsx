import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { getNearbyHospitals } from "../../services/hospital";
import { Navigation, Hospital, MapPin, LocateFixed } from "lucide-react";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);

  return null;
}

function MapRefSetter({
  mapRef,
}: {
  mapRef: React.MutableRefObject<L.Map | null>;
}) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map]);

  return null;
}

type Hospital = {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
  };
};

export default function Map() {
  const [position, setPosition] = useState<[number, number]>([
    24.8607,
    67.0011,
  ]);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const nearest = hospitals.slice(0, 5);
  const mapRef = useRef<L.Map | null>(null);

  const goToMyLocation = () => {
    if (mapRef.current) {
      mapRef.current.setView(position, 15);
    }
  };

  const loadHospitals = async (lat: number, lng: number) => {
    setLoading(true);

    try {
      const data = await getNearbyHospitals(lat, lng);
      setHospitals(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const newPos: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setPosition(newPos);

        await loadHospitals(
          newPos[0],
          newPos[1]
        );
      },
      (err) => {
        console.log(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <section
      id="map"
      className="max-w-6xl mx-auto mt-12 px-5 scroll-mt-24"
    >
      <div className="flex flex-wrap items-center justify-between mb-5">
        <div>
          <h2 className="text-3xl font-bold text-white">
            📍 Nearby Hospitals
          </h2>

          <p className="text-slate-400 mt-2">
            Showing hospitals near your current location.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              loadHospitals(position[0], position[1])
            }
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl"
          >
            🔄 Reload Hospitals
          </button>

          <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-300 text-sm">
            {loading ? "Locating..." : "Location Active"}
          </div>
        </div>
      </div>

      <div className="relative">
        <MapContainer
          center={position}
          zoom={15}
          style={{
            height: "500px",
            borderRadius: "20px",
          }}
        >
          <ChangeMapView center={position} />
          <MapRefSetter mapRef={mapRef} />
  
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
  
          <Marker position={position}>
            <Popup>
              <b>📍 You are here</b>
            </Popup>
          </Marker>
  
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.lat, hospital.lon]}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2">
                    🏥 {hospital.tags?.name || "Unnamed Hospital"}
                  </h3>
  
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg inline-block mt-2"
                  >
                    🧭 Get Directions
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <button
          onClick={goToMyLocation}
          title="Go to my location"
          className="absolute bottom-4 right-4 z-[1000] bg-white hover:bg-slate-100 text-slate-900 p-3 rounded-full shadow-lg"
        >
          <LocateFixed size={22} />
        </button>
      </div>
      <div className="mt-8">

<h3 className="text-2xl font-bold text-white mb-5">
  🏥 Nearby Hospitals
</h3>

<div className="grid md:grid-cols-2 gap-4">

  {nearest.map((hospital) => (

    <div
      key={hospital.id}
      className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500 transition"
    >

      <div className="flex items-center gap-3">

        <Hospital
          className="text-red-400"
          size={26}
        />

        <div>

          <h4 className="text-white font-bold text-lg">
            {hospital.tags?.name || "Unnamed Hospital"}
          </h4>

          <p className="text-slate-400 text-sm">
            Nearby Medical Facility
          </p>

        </div>

      </div>

      <div className="flex gap-3 mt-5">

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
        >
          <Navigation size={18} />
          Directions
        </a>

        <a
          href={`https://maps.google.com/?q=${hospital.lat},${hospital.lon}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 border border-slate-700 hover:border-cyan-500 px-4 py-2 rounded-lg text-white"
        >
          <MapPin size={18} />
          View
        </a>

      </div>

    </div>

  ))}

</div>

</div>
    </section>
  );
}