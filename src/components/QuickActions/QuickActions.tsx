import {
  Hospital,
  Phone,
  Bot,
  MapPinned,
} from "lucide-react";
import { useAI } from "../../context/AIContext";

function QuickActions() {
  const { setPrompt } = useAI();

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const actions = [
    {
      title: "Nearby Hospitals",
      icon: Hospital,
      color: "text-red-400",
      border: "hover:border-red-500",
      description: "Find nearby hospitals",
      action: () => {
        scrollTo("map");
      },
    },
    {
      title: "Emergency Contacts",
      icon: Phone,
      color: "text-green-400",
      border: "hover:border-green-500",
      description: "Emergency numbers",
      action: () => {
        scrollTo("sos");
      },
    },
    {
      title: "AI Assistant",
      icon: Bot,
      color: "text-cyan-400",
      border: "hover:border-cyan-500",
      description: "Ask SafeAI anything",
      action: () => {
        setPrompt(
          "I need emergency help. Please guide me step by step according to my situation."
        );

        scrollTo("ai");
      },
    },
    {
      title: "Safe Places",
      icon: MapPinned,
      color: "text-yellow-400",
      border: "hover:border-yellow-500",
      description: "Find safe shelter",
      action: () => {
        setPrompt(`I need to find a safe place during an emergency.

Please ask me:
- Which city am I in?
- What type of disaster is happening?
- Am I indoors or outdoors?

Then guide me step by step to the safest location.`);

        scrollTo("ai");
      },
    },
  ];

  return (
    <section
      id="quick-actions"
      className="max-w-7xl mx-auto px-6 pb-20 scroll-mt-24"
    >
      <h2 className="text-3xl font-bold text-white mb-3">
        Quick Actions
      </h2>

      <p className="text-slate-400 mb-8">
        Instantly access the most important emergency tools.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={item.action}
              className={`group bg-slate-900 border border-slate-800 ${item.border} rounded-2xl p-8 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-left`}
            >
              <Icon
                size={46}
                className={`${item.color} mb-5 group-hover:scale-110 transition`}
              />

              <h3 className="text-white text-xl font-bold">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-3">
                {item.description}
              </p>

              <div className="mt-6 text-cyan-400 font-semibold">
                Open →
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;