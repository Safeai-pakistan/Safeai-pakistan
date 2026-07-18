import { ShieldAlert, ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24">

      <div className="bg-blue-600/20 p-5 rounded-full border border-blue-500">
        <ShieldAlert size={70} className="text-blue-400" />
      </div>

      <h1 className="text-6xl font-extrabold text-white mt-8">
        SafeAI
      </h1>

      <p className="text-2xl text-slate-300 mt-4 max-w-3xl">
        Pakistan's AI-powered Disaster & Emergency Assistant
      </p>

      <p className="text-slate-400 mt-6 max-w-2xl">
        Get instant AI guidance, emergency contacts, nearby hospitals,
        and survival instructions during floods, earthquakes,
        fires, and other emergencies.
      </p>

      <button className="mt-10 flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all">
        Get Emergency Help
        <ArrowRight size={22} />
      </button>

    </section>
  );
}

export default Hero;