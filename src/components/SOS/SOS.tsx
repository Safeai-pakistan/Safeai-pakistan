const contacts = [
    {
      name: "Rescue 1122",
      number: "1122",
      emoji: "🚑",
      color: "bg-red-600",
      description: "Medical • Fire • Rescue",
    },
    {
      name: "Police",
      number: "15",
      emoji: "👮",
      color: "bg-blue-600",
      description: "Police Emergency",
    },
    {
      name: "Fire Brigade",
      number: "16",
      emoji: "🔥",
      color: "bg-orange-600",
      description: "Fire Emergency",
    },
    {
      name: "Edhi Ambulance",
      number: "115",
      emoji: "❤️",
      color: "bg-green-600",
      description: "Nationwide Ambulance",
    },
    {
      name: "Chhipa Ambulance",
      number: "1020",
      emoji: "🏥",
      color: "bg-purple-600",
      description: "Emergency Ambulance",
    },
  ];
  
  export default function SOS() {
    return (
      <section
        id="sos"
        className="max-w-6xl mx-auto mt-14 px-5 scroll-mt-24"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            🆘 Emergency Contacts
          </h2>
  
          <p className="text-slate-400 mt-3">
            Tap any card below to instantly call emergency services.
          </p>
        </div>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  
          {contacts.map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className={`${contact.color} rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300 shadow-lg`}
            >
              <div className="text-5xl mb-4">
                {contact.emoji}
              </div>
  
              <h3 className="text-2xl font-bold">
                {contact.name}
              </h3>
  
              <p className="mt-2 text-white/80">
                {contact.description}
              </p>
  
              <div className="mt-5 text-3xl font-bold">
                {contact.number}
              </div>
  
              <div className="mt-6 inline-block bg-white/20 px-4 py-2 rounded-xl font-semibold">
                📞 Call Now
              </div>
            </a>
          ))}
  
        </div>
      </section>
    );
  }