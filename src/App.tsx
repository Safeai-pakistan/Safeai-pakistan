import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuickActions from "./components/QuickActions/QuickActions";
import EmergencyCards from "./components/EmergencyCards/EmergencyCards";
import Map from "./components/Map/Map";
import SOS from "./components/SOS/SOS";
import AIChat from "./components/AIChat/AIChat";
import EmergencyGuides from "./components/EmergencyGuides/EmergencyGuides";
import EmergencyToolkit from "./components/EmergencyToolkit/EmergencyToolkit";
import EmergencyContacts from "./components/EmergencyContacts/EmergencyContacts";
import Weather from "./components/Weather/Weather";
import FloatingSOS from "./components/FloatingSOS/FloatingSOS";
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

      <EmergencyContacts />

      <Weather />

      <Footer />

      <FloatingSOS />
    </div>
  );
}

export default App;