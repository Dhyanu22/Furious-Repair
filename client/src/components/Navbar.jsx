import { Home, User, Settings, Mail } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Home, label: "Login/SignUp", href: "/auth" },
    { icon: User, label: "About", href: "#about" },
    { icon: Settings, label: "Services", href: "#services" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <div className="custom-boxing heading flex justify-between mx-1 pl-5 pr-5 pt-1 pb-1 bg-orange-600">
      <div className="flex items-center space-x-3 ">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded" />
        <div>
          <div>
            <h1 className="text-2xl font-bold text-orange-900">Furious</h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-orange-900">Repair</h1>
          </div>
        </div>
      </div>

      <div className="heading flex items-right justify-between">
        <div className="relative">
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="relative z-50 mx-auto items-center rounded-md hover:bg-orange-200 transition-colors duration-200 "
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              {/* Top line */}
              <div
                className={`w-6 h-0.5 bg-orange-900 transform transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>

              {/* Middle line */}
              <div
                className={`w-6 h-0.5 bg-orange-900 my-1 transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              ></div>

              {/* Bottom line */}
              <div
                className={`w-6 h-0.5 bg-orange-900 transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></div>
            </div>
          </button>

          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMenu}
          />

          {/* Side Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-80 bg-orange-50 shadow-2xl z-100 transform transition-transform duration-300 ease-in-out border-l-4 border-orange-600 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Menu Header */}
            <div className="p-6 bg-gradient-to-r from-orange-600 to-red-600 text-cream-100">
              <h2 className="text-2xl font-bold text-orange-50">Menu</h2>
              <p className="text-orange-100 mt-1">
                Navigate to your destination
              </p>
            </div>

            {/* Menu Items */}
            <nav className="p-6">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={toggleMenu}
                      className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-orange-100 transition-all duration-200 transform hover:scale-105 border border-orange-200 ${
                        isOpen ? "animate-slide-in" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
                        <item.icon size={20} />
                      </div>
                      <span className="text-orange-900 font-medium text-lg">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-orange-100 border-t border-orange-300">
              <p className="text-orange-800 text-sm text-center">
                © 2025 Furious Repair. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slide-in {
            animation: slide-in 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Navbar;
