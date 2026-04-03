"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Marquee from "./Marquee";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Marquee isOpen={isOpen} />
      
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-6 md:top-6 md:right-12 z-[110] flex flex-col justify-center items-center gap-[7px] w-14 h-14 group bg-transparent border-none cursor-pointer mix-blend-difference"
        aria-label="Toggle Navigation"
      >
        <span className={`block w-12 h-[1.5px] bg-white transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-[8.5px] rotate-45' : ''}`}></span>
        <span className={`block w-12 h-[1.5px] bg-white transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-12 h-[1.5px] bg-white transition-transform duration-500 ease-in-out ${isOpen ? '-translate-y-[8.5px] -rotate-45' : ''}`}></span>
      </button>
    </>
  );
}
