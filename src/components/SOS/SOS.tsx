import { useState, useEffect } from "react";

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
  const [showSOS, setShowSOS] = useState(false);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!showSOS) return;

    if (count === 0) {
      window.location.href = "tel:1122";
      return;
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showSOS, count]);

  function startSOS() {
    setCount(3);
    setShowSOS(true);
  }

  function cancelSOS() {
    setShowSOS(false);
    setCount(3);
  }

  function shareLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const url = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
  
      const message = `🚨 EMERGENCY ALERT 🚨
  
  I need immediate help.
  
  My live location:
  ${url}
  
  Please reach me as soon as possible.
  
  Sent from SafeAI`;
  
      if (navigator.share) {
        navigator.share({
          title: "🚨 Emergency Alert",
          text: message,
        });
      } else {
        navigator.clipboard.writeText(message);
        alert("Emergency message copied. Paste it into WhatsApp or SMS.");
      }
    });
  }

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

        <button
          onClick={startSOS}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-2xl animate-pulse"
        >
          🚨 EMERGENCY SOS
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <a
            key={contact.number}
            href={`tel:${contact.number}`}
            className={`${contact.color} rounded-2xl p-6 text-white hover:scale-105 transition`}
          >
            <div className="text-5xl">{contact.emoji}</div>

            <h3 className="text-2xl font-bold mt-4">
              {contact.name}
            </h3>

            <p className="mt-2 text-white/80">
              {contact.description}
            </p>

            <div className="mt-5 text-3xl font-bold">
              {contact.number}
            </div>

            <div className="mt-6 bg-white/20 rounded-xl px-4 py-2 inline-block">
              📞 Call Now
            </div>
          </a>
        ))}
      </div>

      {showSOS && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-5">

          <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center border border-red-600">

            <h2 className="text-red-500 text-4xl font-bold">
              🚨 SOS ACTIVE
            </h2>

            <p className="text-white mt-5">
              Calling Rescue 1122 in
            </p>

            <div className="text-7xl text-red-500 font-black my-6 animate-pulse">
              {count}
            </div>

            <button
              onClick={shareLocation}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl mb-3"
            >
              📍 Share Live Location
            </button>

            <button
              onClick={cancelSOS}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl"
            >
              ❌ Cancel SOS
            </button>

          </div>

        </div>
      )}
    </section>
  );
}