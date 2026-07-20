import { Shield } from "lucide-react";

function Navbar() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3"
        >
          <Shield className="text-cyan-400" size={30} />
          <h1 className="text-2xl font-bold text-white">
            SafeAI
          </h1>
        </button>

        <ul className="flex flex-wrap justify-center gap-6 text-slate-300 text-sm md:text-base">

          <li
            onClick={() => scrollTo("hero")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            Home
          </li>

          <li
            onClick={() => scrollTo("quick-actions")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            Emergency
          </li>

          <li
            onClick={() => scrollTo("map")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            Map
          </li>

          <li
            onClick={() => scrollTo("ai")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            AI Assistant
          </li>

          <li
            onClick={() => scrollTo("sos")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            SOS
          </li>

        </ul>

      </div>

    </nav>
  );
}

export default Navbar;