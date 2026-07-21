export type Hospital = {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    phone?: string;
    emergency?: string;
  };
};

const OVERPASS_SERVERS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

export async function getNearbyHospitals(
  lat: number,
  lng: number
): Promise<Hospital[]> {
  const query = `
[out:json][timeout:20];

(
  node["amenity"="hospital"](around:10000,${lat},${lng});
  way["amenity"="hospital"](around:10000,${lat},${lng});
  relation["amenity"="hospital"](around:10000,${lat},${lng});
);

out center tags;
`;

  for (const server of OVERPASS_SERVERS) {
    try {
      const response = await fetch(server, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: query,
      });

      if (!response.ok) continue;

      const data = await response.json();

      const hospitals: Hospital[] = (data.elements || [])
        .map((item: any) => ({
          id: item.id,
          lat: item.lat ?? item.center?.lat,
          lon: item.lon ?? item.center?.lon,
          tags: item.tags ?? {},
        }))
        .filter(
          (h: Hospital) =>
            typeof h.lat === "number" &&
            typeof h.lon === "number"
        );

      if (hospitals.length > 0) {
        return hospitals;
      }
    } catch (err) {
      console.error(server, err);
    }
  }

  return [];
}