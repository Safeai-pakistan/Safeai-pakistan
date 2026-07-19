import {
    ShieldAlert,
    ArrowRight,
    MapPin,
    Brain,
    Hospital,
    Activity,
  } from "lucide-react";
  
  function Hero() {
    return (
      <section className="relative overflow-hidden px-6 py-24">
  
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-3xl rounded-full" />
  
        <div className="relative flex flex-col items-center text-center">
  
          <div className="bg-cyan-500/20 border border-cyan-500 p-6 rounded-full shadow-lg">
            <ShieldAlert size={72} className="text-cyan-400" />
          </div>
  
          {/* Live Status */}
          <div className="mt-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full">
            <Activity size={18} className="text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">
              System Online
            </span>
          </div>
  
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-cyan-300 flex items-center gap-2">
              <Brain size={18} />
              AI Powered
            </span>
  
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-green-300 flex items-center gap-2">
              <MapPin size={18} />
              Live GPS
            </span>
  
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-red-300 flex items-center gap-2">
              <Hospital size={18} />
              Nearby Hospitals
            </span>
          </div>
  
          <h1 className="text-6xl md:text-7xl font-black text-white mt-10">
            Safe<span className="text-cyan-400">AI</span>
          </h1>
  
          <p className="text-2xl text-slate-300 mt-6 max-w-3xl">
            Pakistan's AI-Powered Disaster & Emergency Assistant
          </p>
  
          <p className="text-slate-400 mt-6 max-w-2xl leading-8">
            Get instant AI guidance, nearby hospitals, emergency contacts,
            GPS location, disaster survival guides and life-saving assistance
            whenever you need it.
          </p>
  
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-xl text-lg font-semibold transition">
              Get Emergency Help
              <ArrowRight size={22} />
            </button>
  
            <button className="border border-slate-600 hover:border-cyan-400 hover:text-cyan-300 px-8 py-4 rounded-xl text-lg text-white transition">
              Explore Features
            </button>
          </div>
  
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 w-full max-w-3xl">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-cyan-400">AI</h3>
              <p className="text-slate-400 mt-2 text-sm">Emergency Guidance</p>
            </div>
  
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-green-400">GPS</h3>
              <p className="text-slate-400 mt-2 text-sm">Live Location</p>
            </div>
  
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-red-400">24/7</h3>
              <p className="text-slate-400 mt-2 text-sm">Emergency Support</p>
            </div>
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Hero;