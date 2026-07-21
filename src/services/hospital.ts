export type Hospital = {
  id: string | number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    phone?: string;
  };
};

export async function getNearbyHospitals(
  lat: number,
  lon: number
): Promise<Hospital[]> {
  try {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    const url =
      `https://api.geoapify.com/v2/places` +
      `?categories=healthcare.hospital` +
      `&filter=circle:${lon},${lat},10000` +
      `&bias=proximity:${lon},${lat}` +
      `&limit=20` +
      `&apiKey=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return (data.features || []).map((item: any) => ({
      id: item.properties.place_id,
      lat: item.properties.lat,
      lon: item.properties.lon,
      tags: {
        name:
          item.properties.name ||
          item.properties.address_line1 ||
          "Unnamed Hospital",
        phone: item.properties.datasource?.raw?.phone,
      },
    }));
  } catch (err) {
    console.error("Geoapify:", err);
    return [];
  }
}