import {
    ShieldAlert,
    ArrowRight,
    MapPin,
    Brain,
    Hospital,
    Activity,
  } from "lucide-react";
  import { useAI } from "../../context/AIContext";
  
  function Hero() {
    const { setPrompt } = useAI();
  
    function scrollTo(id: string) {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  
    return (
      <section
        id="hero"
        className="relative overflow-hidden px-6 py-24 scroll-mt-24"
      >
        {/* Background Glow */}
  
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
  
        <div className="relative flex flex-col items-center text-center">
  
          {/* Logo */}
  
          <div className="bg-cyan-500/20 border border-cyan-500 p-6 rounded-full shadow-2xl">
            <ShieldAlert size={72} className="text-cyan-400" />
          </div>
  
          {/* Live Status */}
  
          <div className="mt-6 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
            <Activity size={18} className="text-emerald-400" />
  
            <span className="text-sm font-medium text-emerald-300">
              SafeAI System Online
            </span>
          </div>
  
          {/* Feature Badges */}
  
          <div className="mt-8 flex flex-wrap justify-center gap-3">
  
            <button
              onClick={() => {
                setPrompt("Help me in an emergency.");
                scrollTo("ai");
              }}
              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-cyan-300 transition hover:scale-105 hover:border-cyan-400 flex items-center gap-2"
            >
              <Brain size={18} />
              AI Powered
            </button>
  
            <button
              onClick={() => scrollTo("map")}
              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-green-300 transition hover:scale-105 hover:border-green-400 flex items-center gap-2"
            >
              <MapPin size={18} />
              Live GPS
            </button>
  
            <button
              onClick={() => scrollTo("map")}
              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-red-300 transition hover:scale-105 hover:border-red-400 flex items-center gap-2"
            >
              <Hospital size={18} />
              Nearby Hospitals
            </button>
  
          </div>
  
          {/* Title */}
  
          <h1 className="mt-10 text-6xl font-black text-white md:text-7xl">
            Safe<span className="text-cyan-400">AI</span>
          </h1>
  
          <p className="mt-6 max-w-3xl text-2xl text-slate-300">
            Pakistan's Smart AI Disaster & Emergency Assistant
          </p>
  
          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            Get instant AI guidance, live GPS location, nearby hospitals,
            emergency contacts, disaster survival guides, weather updates and
            life-saving assistance whenever you need it.
          </p>
  
          {/* Buttons */}
  
          <div className="mt-10 flex flex-wrap justify-center gap-4">
  
            <button
              onClick={() => {
                setPrompt(
                  "I have an emergency. Give me immediate step-by-step help."
                );
                scrollTo("ai");
              }}
              className="flex items-center gap-3 rounded-xl bg-cyan-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-cyan-700 hover:scale-105"
            >
              Get Emergency Help
              <ArrowRight size={22} />
            </button>
  
            <button
              onClick={() => scrollTo("quick-actions")}
              className="rounded-xl border border-slate-600 px-8 py-4 text-lg text-white transition hover:border-cyan-400 hover:text-cyan-300 hover:scale-105"
            >
              Explore Features
            </button>
  
          </div>
  
          {/* Stats */}
  
          <div className="mt-14 grid w-full max-w-4xl gap-6 md:grid-cols-3">
  
            <div
              onClick={() => {
                setPrompt("Help me in an emergency.");
                scrollTo("ai");
              }}
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500 hover:-translate-y-1"
            >
              <h3 className="text-4xl font-black text-cyan-400">AI</h3>
  
              <p className="mt-2 text-slate-400">
                Emergency Guidance
              </p>
            </div>
  
            <div
              onClick={() => scrollTo("map")}
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-green-500 hover:-translate-y-1"
            >
              <h3 className="text-4xl font-black text-green-400">GPS</h3>
  
              <p className="mt-2 text-slate-400">
                Live Navigation
              </p>
            </div>
  
            <div
              onClick={() => scrollTo("contacts")}
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-red-500 hover:-translate-y-1"
            >
              <h3 className="text-4xl font-black text-red-400">
                24/7
              </h3>
  
              <p className="mt-2 text-slate-400">
                Emergency Contacts
              </p>
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Hero;