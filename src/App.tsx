import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuickActions from "./components/QuickActions/QuickActions";
import EmergencyCards from "./components/EmergencyCards/EmergencyCards";
import Map from "./components/Map/Map";
import SOS from "./components/SOS/SOS";
import EmergencyGuides from "./components/EmergencyGuides/EmergencyGuides";
import AIChat from "./components/AIChat/AIChat";
import EmergencyToolkit from "./components/EmergencyToolkit/EmergencyToolkit";
import Weather from "./components/Weather/Weather";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <Hero />

      <QuickActions />

      <EmergencyCards />

      <Map />

      <SOS />

      <AIChat />

      <EmergencyGuides />

      <EmergencyToolkit />

      <Weather />

      <Footer />
    </div>
  );
}

export default App;