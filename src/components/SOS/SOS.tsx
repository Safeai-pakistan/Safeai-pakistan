const contacts = [
    {
      name: "Rescue 1122",
      number: "1122",
      emoji: "🚑",
      color: "bg-red-600",
    },
    {
      name: "Police",
      number: "15",
      emoji: "👮",
      color: "bg-blue-600",
    },
    {
      name: "Fire Brigade",
      number: "16",
      emoji: "🔥",
      color: "bg-orange-600",
    },
    {
      name: "Edhi Ambulance",
      number: "115",
      emoji: "❤️",
      color: "bg-green-600",
    },
    {
      name: "Chhipa Ambulance",
      number: "1020",
      emoji: "🏥",
      color: "bg-purple-600",
    },
  ];
  
  export default function SOS() {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-5">
        <h2 className="text-3xl font-bold text-white mb-6">
          🆘 Emergency Contacts
        </h2>
  
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contacts.map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className={`${contact.color} rounded-2xl p-6 text-white hover:scale-105 transition`}
            >
              <div className="text-5xl mb-3">{contact.emoji}</div>
  
              <h3 className="text-xl font-bold">
                {contact.name}
              </h3>
  
              <p className="text-2xl mt-3 font-semibold">
                {contact.number}
              </p>
            </a>
          ))}
        </div>
      </div>
    );
  }