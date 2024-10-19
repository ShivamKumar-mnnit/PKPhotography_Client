"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Carousel from "./Crousel";

const HeroContent = () => {
  const contentOptions = ["Photography", "Videography", "Live Stream"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentOptions.length);
    }, 5000); // Change option every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-0  w-full h-screen relative z-10 overflow-hidden" // Use overflow-hidden
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start z-20 relative mx-4">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Mumbai's Best Photography, Videography, and Live Stream Studio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-black max-w-[600px] w-auto h-auto"
        >
          <span>
            We are the creative Agency Focused on 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              {contentOptions[currentIndex]}{" "}
            </span>
          </span>
        </motion.div>

        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          Learn More!
        </motion.a>
      </div>

      {/* Background Carousel */}
      <div className="absolute top-0 right-0 w-full h-full z-0">
        <Carousel />
      </div>
    </motion.div>
  );
};

export default HeroContent;
