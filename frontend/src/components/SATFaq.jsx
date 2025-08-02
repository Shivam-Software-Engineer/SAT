// src/components/SATFaq.jsx
import React from 'react';

const faqs = [
  {
    question: 'When is the ideal time to begin SAT preparation?',
    answer:
      'We recommend commencing SAT preparation immediately following your 10th grade board examinations. Begin with a comprehensive diagnostic test to evaluate your current proficiency and identify areas for improvement.',
  },
  {
    question: 'Are practice mock tests included in the program?',
    answer:
      'Absolutely. Our SAT Online Classes program includes access to 10+ full-length, timed mock tests designed to simulate actual exam conditions and track your progress.',
  },
  {
    question: 'What practice resources are available?',
    answer:
      'Our online learning portal provides access to an extensive question bank with over 5,000 curated practice questions, complete with detailed solutions and performance analytics.',
  },
  {
    question: 'How can I get assistance with program-related queries?',
    answer: (
      <>
        Our dedicated support team is available to address your concerns. You may schedule a consultation with an academic counselor through our registration portal, or direct your inquiries via email to{' '}
        <a
          href="mailto:support@maxiwiselearning.com"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          maxiwiselearning@gmail.com
        </a>
        . We typically respond within 24 business hours.
      </>
    ),
  },
];

const SATFaq = () => {

  
  return (
    <section id="faqs" className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common queries about our SAT preparation program
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                {faq.question}
              </h3>
              <div className="text-gray-700 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SATFaq;