const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              SAT
              {/* <span className="text-blue-600">Pro</span> */}
            </h3>
            <p className="text-gray-600">
              Empowering students to achieve their highest SAT scores through expert instruction and proven strategies.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#demos" className="text-gray-600 hover:text-blue-600 transition-colors">Demo Lectures</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Practice Tests</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Study Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Score Calculator</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">College Finder</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                  <a 
                    href="mailto:maxiwiselearning@gmail.com" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Help Center
                  </a>
              </li>

              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; 2025 SAT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
