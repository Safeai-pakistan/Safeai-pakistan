import { useEffect, useState } from "react";

type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        const data = await res.json();

        setWeather(data.current_weather);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-5">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-3xl font-bold text-white mb-5">
          🌦 Live Weather
        </h2>

        {loading && (
          <p className="text-slate-400">
            Loading weather...
          </p>
        )}

        {weather && (
          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-slate-400">Temperature</p>
              <h3 className="text-4xl font-bold text-cyan-400">
                {weather.temperature}°C
              </h3>
            </div>

            <div>
              <p className="text-slate-400">Wind Speed</p>
              <h3 className="text-4xl font-bold text-green-400">
                {weather.windspeed} km/h
              </h3>
            </div>

            <div>
              <p className="text-slate-400">Weather Code</p>
              <h3 className="text-4xl font-bold text-yellow-400">
                {weather.weathercode}
              </h3>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}