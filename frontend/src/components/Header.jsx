import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = ({ setIsRegisterOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
     <header className={`sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b transition-all duration-300 ${
  isScrolled ? "border-gray-200 shadow-sm" : "border-transparent shadow-none"
}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 relative inline-block">
          <span className="relative">SAT</span>
        </h1>
      </div>

      {/* Center: Nav Links */}
     <div className="hidden md:flex flex-1 justify-center">
  <div className="flex items-baseline space-x-8">
    <a href="#home" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">Home</a>
    <a href="#about" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">About</a>
    <a href="#demo" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">Demo Lectures</a>
    <a href="#testimonials" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">Testimonials</a>
    <a href="#faqs" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">FAQ's</a>
  </div>
</div>


      {/* Right: Button */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          <span className="relative z-10 font-semibold text-[15px]">Get Free Access</span>
          <span className="absolute inset-0 rounded-xl bg-white/10 blur-sm group-hover:blur-md transition duration-300"></span>
        </button>
      </div>

      {/* Mobile: Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </button>
      </div>
    </div>
  </div>
</header>


      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[999] transition-opacity duration-300 ${
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        {/* Backdrop with blur effect */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {[
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#demos", label: "Demo Lectures" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faqs", label: "FAQ's" }
]
.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA section */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsRegisterOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition-all duration-200"
              >
                Get Free Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;