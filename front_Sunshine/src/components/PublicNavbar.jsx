import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../public/logo.png'; // ✅ import correto
export const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLink = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Sobre" },
    { to: "/login", label: "Login" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-accent/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          {/* logotipo */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-white p-2 rounded-full shadow-lg flex items-end justify-end">
              <img
                src={logo}
                alt="logotipo site sunshine"
                className="w-[150%] h-[150%] md:w-12 md:h-12"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-white md:text-2xl">
                Sunshine
              </span>
              <p className="text-xs text-light font-medium hidden sm:block">
                Sistema Psicológico
              </p>
            </div>
          </div>

          {/* Links desktop */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {navLink.slice(0, -1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hidden sm:block font-medium transition-colors text-sm md:text-base ${
                  isActive(link.to)
                    ? "text-white hover:text-light"
                    : "text-white hover:text-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login">
              <button className="bg-gradient-to-r from-accent to-dark text-white hover:text-light px-3 py-2 md:px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-sm md:text-base">
                <span className="hidden sm:inline">Entrar</span>
                <span className="sm:hidden">Login</span>
              </button>
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center ml-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark/70 hover:text-light"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile aberto */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="px-2 pt-2 pb-2 space-y-1 bg-white/80 backdrop:blur-md rounded-lg">
              {navLink.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 rounded-lg transition-colors ${
                    isActive(link.to)
                      ? "text-light bg-light/10 font-medium"
                      : "text-dark/70 hover:text-accent hover:bg-light/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
