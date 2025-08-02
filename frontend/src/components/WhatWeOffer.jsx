import React from 'react';
import {
  FaChalkboardTeacher,
  FaLaptop,
  FaUserClock,
  FaUserTie,
} from 'react-icons/fa';

const offerings = [
  {
    icon: <FaChalkboardTeacher size={30} className="text-green-700" />,
    title: 'Classroom',
    description: 'SAT Coaching',
  },
  {
    icon: <FaLaptop size={30} className="text-green-700" />,
    title: 'Live Online',
    description: 'SAT Prep',
  },
  {
    icon: <FaUserClock size={30} className="text-green-700" />,
    title: 'Self-Paced',
    description: 'SAT Course',
  },
  {
    icon: <FaUserTie size={30} className="text-green-700" />,
    title: 'Private',
    description: 'SAT Tutor',
  },
];

const WhatWeOffer = () => {
  return (
    <section className="bg-white py-8 px-4 md:px-12 lg:px-20">
      <div className="bg-gray-50 rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center">
        {/* Left Label */}
        <div className="w-full md:w-[240px] mb-6 md:mb-0 md:pr-8 border-b md:border-b-0 md:border-r border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 pl-2 md:pl-6">
            What we offer
          </h2>
        </div>

        {/* Offerings */}
        <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2 mt-4 md:mt-0">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-lg font-semibold text-green-700">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
