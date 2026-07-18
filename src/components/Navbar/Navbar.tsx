import { Shield, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <Shield className="text-blue-500" size={30} />
        <h1 className="text-2xl font-bold text-white">SafeAI</h1>
      </div>

      <button className="text-white md:hidden">
        <Menu size={28} />
      </button>

      <ul className="hidden md:flex gap-8 text-slate-300">
        <li className="hover:text-white cursor-pointer">Home</li>
        <li className="hover:text-white cursor-pointer">Emergency</li>
        <li className="hover:text-white cursor-pointer">Hospitals</li>
        <li className="hover:text-white cursor-pointer">AI Assistant</li>
      </ul>
    </nav>
  );
}

export default Navbar;