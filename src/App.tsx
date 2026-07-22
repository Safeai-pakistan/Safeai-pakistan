import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuickActions from "./components/QuickActions/QuickActions";
import EmergencyCards from "./components/EmergencyCards/EmergencyCards";
import Map from "./components/Map/Map";
import SOS from "./components/SOS/SOS";
import AIChat from "./components/AIChat/AIChat";
import EmergencyGuides from "./components/EmergencyGuides/EmergencyGuides";
import EmergencyToolkit from "./components/EmergencyToolkit/EmergencyToolkit";
import Weather from "./components/Weather/Weather";
import FloatingSOS from "./components/FloatingSOS/FloatingSOS";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="quick-actions">
          <QuickActions />
        </section>

        <section id="disasters">
          <EmergencyCards />
        </section>

        <section id="map">
          <Map />
        </section>

        <section id="sos">
          <SOS />
        </section>

        <section id="ai">
          <AIChat />
        </section>

        <section id="guides">
          <EmergencyGuides />
        </section>

        <section id="toolkit">
          <EmergencyToolkit />
        </section>

        <section id="weather">
          <Weather />
        </section>
      </main>

      <Footer />
      <FloatingSOS />
    </div>
  );
}

export default App;