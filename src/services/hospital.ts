export async function getNearbyHospitals(
    lat: number,
    lng: number
  ) {
    const query = `
  [out:json];
  
  (
    node
      ["amenity"="hospital"]
      (around:5000,${lat},${lng});
  );
  
  out body;
  `;
  
    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: query,
      }
    );
  
    const data = await response.json();
  
    return data.elements;
  }