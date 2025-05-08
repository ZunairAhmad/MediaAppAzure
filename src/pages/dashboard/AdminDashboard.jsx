import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this
import HeroForm from "./forms/HeroForm";
import CardsForm from "./forms/CardsForm";
import AboutForm from "./forms/AboutForm";
import TeamForm from "./forms/TeamForm";
import FeaturesForm from "./forms/FeaturesForm";
import ContactForm from "./forms/ContactForm";

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Home");
  const navigate = useNavigate(); // <-- Add this

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    navigate("/sign-in"); // <-- Redirect to sign-in page
  };

  const renderForm = () => {
    switch (activeSection) {
      case "Home":
        return <HeroForm />;
      case "upload Media":
        return <CardsForm />;
      case "Profile":
        return <AboutForm />;
      default:
        return <HeroForm />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav className="flex flex-col gap-4">
          {["Home", "upload Media", "Profile", "Logout"].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Logout") {
                  handleLogout(); // <-- Call logout
                } else {
                  setActiveSection(item);
                }
              }}
              className={`text-left p-2 rounded hover:bg-gray-700 ${
                activeSection === item ? "bg-gray-700" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">{activeSection}</h2>
        {renderForm()}
      </main>
    </div>
  );
}

export default AdminDashboard;
