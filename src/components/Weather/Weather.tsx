import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  MapPin,
} from "lucide-react";

type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
};

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );

          const weatherData = await weatherRes.json();
          setWeather(weatherData.current_weather);

          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
          );

          const geoData = await geoRes.json();

          setCity(
            geoData.address?.city ||
              geoData.address?.town ||
              geoData.address?.village ||
              geoData.address?.state ||
              "Current Location"
          );
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false),
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  function weatherText(code: number) {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Fog";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
  }

  function WeatherIcon(code: number) {
    if (code === 0)
      return <Sun size={50} className="text-yellow-400" />;

    if (code <= 3)
      return <Cloud size={50} className="text-slate-300" />;

    return <CloudRain size={50} className="text-cyan-400" />;
  }

  return (
    <section
      id="weather"
      className="max-w-6xl mx-auto mt-14 px-5 scroll-mt-24"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <div className="flex items-center justify-between flex-wrap gap-5 mb-8">

          <div>
            <h2 className="text-4xl font-bold text-white">
              🌦 Live Weather
            </h2>

            <div className="flex items-center gap-2 mt-3 text-slate-400">
              <MapPin size={18} />
              {city}
            </div>
          </div>

          {weather && WeatherIcon(weather.weathercode)}

        </div>

        {loading && (
          <p className="text-slate-400">
            Loading weather...
          </p>
        )}

        {weather && (

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-slate-400">
                Temperature
              </p>

              <h3 className="text-4xl font-black text-cyan-400 mt-2">
                {weather.temperature}°C
              </h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-slate-400">
                Condition
              </p>

              <h3 className="text-xl font-bold text-white mt-2">
                {weatherText(weather.weathercode)}
              </h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Wind size={18} />
                Wind
              </div>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                {weather.windspeed} km/h
              </h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Droplets size={18} />
                Updated
              </div>

              <h3 className="text-lg font-bold text-blue-300 mt-2">
                {new Date(weather.time).toLocaleTimeString()}
              </h3>
            </div>

          </div>

        )}

      </div>
    </section>
  );
}