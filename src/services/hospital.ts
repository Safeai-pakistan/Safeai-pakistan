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

export async function getNearbyHospitals(
  lat: number,
  lng: number
): Promise<Hospital[]> {
  const query = `
[out:json][timeout:25];

(
  node["amenity"="hospital"](around:10000,${lat},${lng});
  way["amenity"="hospital"](around:10000,${lat},${lng});
  relation["amenity"="hospital"](around:10000,${lat},${lng});
);

out center tags;
`;

  try {
    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: query,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

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

    return hospitals;
  } catch (error) {
    console.error("Hospital API Error:", error);
    return [];
  }
}