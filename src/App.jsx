import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";

import Contact from "./pages/Contact";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import WhatsAppButton from "./components/WhatsAppButton";
// import QuickContactButtons from "./components/QuickContactButtons";



export default function App() {
  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
           <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <WhatsAppButton />
         {/* <QuickContactButtons /> */}
      </div>

      <Footer />
    </div>
  );
}
