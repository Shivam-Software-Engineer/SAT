import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import SATLandingPage from './components/SATLandingPage';
import FreeDemoVideos from './components/FreeDemoVideos'; // Make sure to create this component

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Main landing page route */}
        <Route path="/" element={<SATLandingPage />} />
        
        {/* Free demo videos route */}
        <Route path="/free-demo-videos" element={<FreeDemoVideos />} />
        
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;