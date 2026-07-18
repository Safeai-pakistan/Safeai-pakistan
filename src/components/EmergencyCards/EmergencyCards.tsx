import {
    Flame,
    Waves,
    Building2,
    HeartPulse,
    CloudLightning,
    Sun,
  } from "lucide-react";
  
  const disasters = [
    {
      title: "Fire",
      description: "Get instant fire safety instructions.",
      icon: Flame,
      color: "text-red-500",
    },
    {
      title: "Flood",
      description: "Flood survival guide and alerts.",
      icon: Waves,
      color: "text-blue-500",
    },
    {
      title: "Earthquake",
      description: "Drop, Cover and Hold guidance.",
      icon: Building2,
      color: "text-yellow-500",
    },
    {
      title: "Medical",
      description: "First aid and emergency response.",
      icon: HeartPulse,
      color: "text-green-500",
    },
    {
      title: "Storm",
      description: "Lightning and storm precautions.",
      icon: CloudLightning,
      color: "text-purple-500",
    },
    {
      title: "Heatwave",
      description: "Stay safe during extreme heat.",
      icon: Sun,
      color: "text-orange-500",
    },
  ];
  
  function EmergencyCards() {
    return (
      <section className="max-w-7xl mx-auto px-6 pb-24">
  
        <h2 className="text-4xl font-bold text-white mb-10">
          Disaster Categories
        </h2>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  
          {disasters.map((item) => {
            const Icon = item.icon;
  
            return (
              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all cursor-pointer"
              >
                <Icon
                  size={50}
                  className={`${item.color} mb-5`}
                />
  
                <h3 className="text-2xl text-white font-bold">
                  {item.title}
                </h3>
  
                <p className="text-slate-400 mt-4">
                  {item.description}
                </p>
  
              </div>
            );
          })}
  
        </div>
  
      </section>
    );
  }
  
  export default EmergencyCards;