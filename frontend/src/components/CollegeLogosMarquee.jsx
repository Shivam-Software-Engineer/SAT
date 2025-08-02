import React from "react";
import { motion } from "framer-motion";

const collegeLogos = [
  { src: "/logos/image (1).avif", alt: "Harvard University logo" },
  { src: "/logos/image (2).avif", alt: "Stanford University seal" },
  { src: "/logos/image (3).avif", alt: "MIT seal" },
  { src: "/logos/image (4).avif", alt: "Cambridge coat of arms" },
  { src: "/logos/image (5).avif", alt: "Oxford coat of arms" },
  { src: "/logos/image (6).avif", alt: "Yale University logo" },
  { src: "/logos/image (7).png", alt: "Columbia University seal" },
  { src: "/logos/image (8).png", alt: "Princeton seal" },
  { src: "/logos/image (9).png", alt: "UPenn coat of arms" },
  { src: "/logos/image (10).png", alt: "Brown University coat of arms" },
];

const CollegeLogosMarquee = () => {
  return (
    <div className="overflow-hidden py-12 bg-gray-50 border-t border-b border-gray-200">
      <div className="relative flex w-max">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {[...collegeLogos, ...collegeLogos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="relative h-16 w-32 flex items-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain w-full h-full select-none"
                loading="lazy"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CollegeLogosMarquee;
