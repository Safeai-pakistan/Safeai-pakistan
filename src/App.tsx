import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuickActions from "./components/QuickActions/QuickActions";
import EmergencyCards from "./components/EmergencyCards/EmergencyCards";
import SOS from "./components/SOS/SOS";

import AIChat from "./components/AIChat/AIChat";
import Map from "./components/Map/Map";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <QuickActions />
      <EmergencyCards />
      <Map />
      <SOS />
      
    </div>
  );
}

export default App;