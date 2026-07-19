import { useState } from "react";
import { Phone, X } from "lucide-react";

export default function FloatingSOS() {
  const [open, setOpen] = useState(false);

  const contacts = [
    { name: "Rescue 1122", number: "1122" },
    { name: "Police", number: "15" },
    { name: "Fire Brigade", number: "16" },
    { name: "Edhi", number: "115" },
  ];

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl z-50 w-64">
          <h3 className="text-white font-bold mb-3">
            Emergency Call
          </h3>

          <div className="space-y-3">
            {contacts.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number}`}
                className="block bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-3"
              >
                {c.name} ({c.number})
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        {open ? <X size={30} color="white" /> : <Phone size={30} color="white" />}
      </button>
    </>
  );
}