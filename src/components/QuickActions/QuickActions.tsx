import {
    Hospital,
    Phone,
    Bot,
    MapPinned,
  } from "lucide-react";
  
  const actions = [
    {
      title: "Nearby Hospitals",
      icon: Hospital,
    },
    {
      title: "Emergency Contacts",
      icon: Phone,
    },
    {
      title: "AI Assistant",
      icon: Bot,
    },
    {
      title: "Safe Places",
      icon: MapPinned,
    },
  ];
  
  function QuickActions() {
    return (
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-white mb-8">
          Quick Actions
        </h2>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {actions.map((item) => {
            const Icon = item.icon;
  
            return (
              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 hover:scale-105 transition-all cursor-pointer"
              >
                <Icon size={45} className="text-blue-400 mb-5" />
  
                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  
  export default QuickActions;