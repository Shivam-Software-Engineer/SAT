// import { ArrowUp } from "lucide-react";
// import { useEffect, useState } from "react";

// const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   // Show button after user scrolls down
//   useEffect(() => {
//     const toggleVisibility = () => {
//       setIsVisible(window.scrollY > 1000);
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
// <button
//   onClick={scrollToTop}
//   className={`scroll-to-top ${!isVisible ? "hidden" : ""} ]`}
//   aria-label="Scroll to top"
// >
//   <ArrowUp className="w-5 h-5" />
// </button>



//   );
// };

// export default ScrollToTopButton;
