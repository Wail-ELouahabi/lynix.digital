import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-white">
          lynix<span className="text-green-400">.digital</span>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-white">
          <li>
            <Link to="/" className="hover:text-green-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-green-400">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-400">
              Contact
            </Link>
          </li>
        </ul>

        {/* MOBILE BURGER BUTTON */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Burger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#020617]/95">
          <ul className="flex flex-col px-4 py-3 space-y-3 text-sm text-white">
            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block py-1 hover:text-green-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="block py-1 hover:text-green-400"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="block py-1 hover:text-green-400"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block py-1 hover:text-green-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
