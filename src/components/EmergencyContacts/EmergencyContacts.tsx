import {
    Phone,
    Ambulance,
    Shield,
    Flame,
    HeartHandshake,
  } from "lucide-react";
  
  const contacts = [
    {
      title: "Rescue 1122",
      number: "1122",
      description: "Medical, Fire & Rescue",
      icon: Ambulance,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Police",
      number: "15",
      description: "Police Emergency",
      icon: Shield,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Fire Brigade",
      number: "16",
      description: "Fire Emergency",
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Edhi Ambulance",
      number: "115",
      description: "Ambulance Service",
      icon: HeartHandshake,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];
  
  export default function EmergencyContacts() {
    return (
      <section
        id="contacts"
        className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white">
            📞 Emergency Contacts
          </h2>
  
          <p className="text-slate-400 mt-3">
            One-tap access to important emergency services in Pakistan.
          </p>
        </div>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contacts.map((item) => {
            const Icon = item.icon;
  
            return (
              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bg}`}
                >
                  <Icon className={item.color} size={34} />
                </div>
  
                <h3 className="text-white text-xl font-bold mt-5">
                  {item.title}
                </h3>
  
                <p className="text-slate-400 text-sm mt-2">
                  {item.description}
                </p>
  
                <div className="mt-4 text-3xl font-bold text-cyan-400">
                  {item.number}
                </div>
  
                <a
                  href={`tel:${item.number}`}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl transition"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }