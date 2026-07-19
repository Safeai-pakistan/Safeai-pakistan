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
    node["amenity"="hospital"](around:8000,${lat},${lng});
    way["amenity"="hospital"](around:8000,${lat},${lng});
    relation["amenity"="hospital"](around:8000,${lat},${lng});
  );
  
  out center tags;
  `;
  
    try {
      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: query,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to load hospitals.");
      }
  
      const data = await response.json();
  
      return (data.elements || []).map((item: any) => ({
        id: item.id,
        lat: item.lat ?? item.center?.lat,
        lon: item.lon ?? item.center?.lon,
        tags: item.tags,
      }));
    } catch (err) {
      console.error("Hospital API Error:", err);
      return [];
    }
  }