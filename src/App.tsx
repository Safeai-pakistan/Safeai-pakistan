import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuickActions from "./components/QuickActions/QuickActions";
import EmergencyCards from "./components/EmergencyCards/EmergencyCards";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <QuickActions />
      <EmergencyCards />
    </div>
  );
}

export default App;