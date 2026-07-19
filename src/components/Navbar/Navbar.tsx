import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }

    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-cyan-500/20 p-2 rounded-xl">
            <Shield className="text-cyan-400" size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Safe<span className="text-cyan-400">AI</span>
            </h1>

            <p className="text-xs text-slate-400">
              Emergency Assistant
            </p>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
          <li
            onClick={() => scrollToSection("home")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            Home
          </li>

          <li
            onClick={() => scrollToSection("map")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            Map
          </li>

          <li
            onClick={() => scrollToSection("ai")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            AI Assistant
          </li>

          <li
            onClick={() => scrollToSection("contacts")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            Contacts
          </li>
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-6 py-4">

          <button
            onClick={() => scrollToSection("home")}
            className="block w-full text-left text-white py-3"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("map")}
            className="block w-full text-left text-white py-3"
          >
            Map
          </button>

          <button
            onClick={() => scrollToSection("ai")}
            className="block w-full text-left text-white py-3"
          >
            AI Assistant
          </button>

          <button
            onClick={() => scrollToSection("contacts")}
            className="block w-full text-left text-white py-3"
          >
            Emergency Contacts
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;