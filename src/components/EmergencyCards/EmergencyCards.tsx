import {
    Flame,
    Waves,
    Building2,
    HeartPulse,
    CloudLightning,
    Sun,
    ArrowRight,
  } from "lucide-react";
  
  function EmergencyCards() {
    function openAI(prompt: string) {
      navigator.clipboard.writeText(prompt);
  
      document.getElementById("ai")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  
      setTimeout(() => {
        alert(
          "✅ Emergency prompt copied.\n\nScroll down to AI Assistant, paste (Ctrl+V) and press Ask SafeAI."
        );
      }, 600);
    }
  
    const disasters = [
      {
        title: "Fire",
        description: "House fire, gas leakage, smoke & evacuation.",
        icon: Flame,
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "hover:border-red-500",
        prompt: "There is a fire in my house. Give immediate life-saving instructions.",
      },
      {
        title: "Flood",
        description: "Flash floods & water safety guidance.",
        icon: Waves,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "hover:border-blue-500",
        prompt: "Flood water is entering my area. What should I do immediately?",
      },
      {
        title: "Earthquake",
        description: "Drop, Cover & Hold survival steps.",
        icon: Building2,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        border: "hover:border-yellow-500",
        prompt: "An earthquake is happening now. Tell me exactly what to do.",
      },
      {
        title: "Medical",
        description: "First aid & emergency medical response.",
        icon: HeartPulse,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "hover:border-green-500",
        prompt: "Someone is injured. Give first aid instructions.",
      },
      {
        title: "Storm",
        description: "Lightning & severe weather precautions.",
        icon: CloudLightning,
        color: "text-violet-500",
        bg: "bg-violet-500/10",
        border: "hover:border-violet-500",
        prompt: "A severe storm is approaching. How do I stay safe?",
      },
      {
        title: "Heatwave",
        description: "Extreme heat & dehydration protection.",
        icon: Sun,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "hover:border-orange-500",
        prompt: "How can I protect myself during an extreme heatwave?",
      },
    ];
  
    return (
      <section
        id="disasters"
        className="max-w-7xl mx-auto px-6 pb-24 scroll-mt-24"
      >
        <h2 className="text-4xl font-bold text-white mb-3">
          Disaster Categories
        </h2>
  
        <p className="text-slate-400 mb-10">
          Tap any emergency below to instantly prepare an AI response.
        </p>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {disasters.map((item) => {
            const Icon = item.icon;
  
            return (
              <button
                key={item.title}
                onClick={() => openAI(item.prompt)}
                className={`text-left bg-slate-900 border border-slate-800 ${item.border} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}
                >
                  <Icon size={34} className={item.color} />
                </div>
  
                <h3 className="text-2xl text-white font-bold">
                  {item.title}
                </h3>
  
                <p className="text-slate-400 mt-4 leading-7">
                  {item.description}
                </p>
  
                <div className="mt-6 flex items-center gap-2 text-cyan-400 font-semibold">
                  Open AI Guide
                  <ArrowRight size={18} />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    );
  }
  
  export default EmergencyCards;