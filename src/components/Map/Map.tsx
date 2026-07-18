import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
  } from "react-leaflet";
  import { useEffect, useState } from "react";
  import L from "leaflet";
  import { getNearbyHospitals } from "../../services/hospital";
  
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
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const newPos: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
  
          setPosition(newPos);
  
          try {
            const data = await getNearbyHospitals(
              newPos[0],
              newPos[1]
            );
  
            setHospitals(data);
          } catch (err) {
            console.error(err);
          }
        },
        (err) => console.log(err),
        {
          enableHighAccuracy: true,
        }
      );
    }, []);
  
    return (
      <div className="max-w-6xl mx-auto mt-10 p-5">
        <h2 className="text-3xl text-white font-bold mb-4">
          📍 Nearby Hospitals
        </h2>
  
        <MapContainer
          center={position}
          zoom={15}
          style={{
            height: "500px",
            borderRadius: "20px",
          }}
        >
          <ChangeMapView center={position} />
  
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
  
          {/* User */}
  
          <Marker position={position}>
            <Popup>
              <b>You are here</b>
            </Popup>
          </Marker>
  
          {/* Hospitals */}
  
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
      className="bg-blue-600 text-white px-3 py-2 rounded-lg inline-block mt-2"
    >
      🧭 Get Directions
    </a>
  </div>
</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }