import React, { useEffect, useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import DemoLectures from './DemoLectures';
import Testimonials from './Testimonials';
import AboutSection from './AboutSection';
import Footer from './Footer';
import RegisterModal from './RegisterModal';
import CollegeLogosMarquee from './CollegeLogosMarquee';
import FeatureHighlights from './FeatureHighlights';
import WhatWeOffer from './WhatWeOffer';
import SATFaq from './SATFaq';
import { useLocation } from 'react-router-dom';
// import ScrollToTopButton from './ScrollToTopButton';

const SATLandingPage = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({ 
    name: '',
    email: '',
    phone: ''
  });

  const location = useLocation();
  useEffect(() => {
  if (location.state?.isRegisterOpen) {
    setIsRegisterOpen(true);

    // Optional: clear the state to prevent modal on refresh
    window.history.replaceState({}, document.title);
  }
}, [location.state]);


  const demoLectures = [
    {
      id: 1,
      title: "SAT Math: Algebra Fundamentals",
      instructor: "Dr. Sarah Johnson",
      duration: "45 minutes",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop",
      description: "Master essential algebra concepts that appear frequently on the SAT Math section."
    },
    {
      id: 2,
      title: "SAT Reading: Passage Analysis",
      instructor: "Prof. Michael Chen",
      duration: "38 minutes",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop",
      description: "Learn effective strategies for analyzing complex reading passages."
    },
    {
      id: 3,
      title: "SAT Writing: Grammar Essentials",
      instructor: "Ms. Emily Rodriguez",
      duration: "42 minutes",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=225&fit=crop",
      description: "Perfect your grammar skills with targeted SAT writing techniques."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Jessica Martinez",
      score: "1480",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=80&h=80&fit=crop&crop=face",
      text: "The demo lectures were incredibly helpful! I improved my score by 200 points after accessing the full program."
    },
    {
      id: 2,
      name: "David Thompson",
      score: "1520",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      text: "The instructors explain complex concepts so clearly. I felt confident walking into the test."
    },
    {
      id: 3,
      name: "Aisha Patel",
      score: "1450",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      text: "Amazing platform! The free demos convinced me to sign up, and I'm so glad I did."
    }
  ];

  const handleRegister = () => {
    console.log('Registration attempt:', registerForm);
    if (registerForm.name && registerForm.email && registerForm.phone) {
      setIsRegisterOpen(false);
      // alert('Registration successful! Welcome to our platform.');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-100 to-gray-100">
      <Header 
        setIsRegisterOpen={setIsRegisterOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />
      
      <HeroSection setIsRegisterOpen={setIsRegisterOpen} />
      <CollegeLogosMarquee />
      <DemoLectures demoLectures={demoLectures} setIsRegisterOpen={setIsRegisterOpen} />
      <Testimonials testimonials={testimonials} />
      <AboutSection setIsRegisterOpen={setIsRegisterOpen} />
      <WhatWeOffer />
      <FeatureHighlights setIsRegisterOpen={setIsRegisterOpen} />
      <SATFaq />
      <Footer />

      <RegisterModal 
        isRegisterOpen={isRegisterOpen} 
        setIsRegisterOpen={setIsRegisterOpen} 
        registerForm={registerForm} 
        setRegisterForm={setRegisterForm} 
        handleRegister={handleRegister} 
      />

     
    </div>
  );
};

export default SATLandingPage;
