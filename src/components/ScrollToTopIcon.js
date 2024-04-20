"use client";
"use client";
import React, { useState, useEffect } from 'react';

const ScrollToTopIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const toggleVisibility = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > 300) {
      setIsVisible(true);
      setPrevScrollPos(currentScrollPos);
    } else if (currentScrollPos < prevScrollPos - 100) {
      setIsVisible(false);
    }

    setPrevScrollPos(currentScrollPos);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      toggleVisibility();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 cursor-pointer ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500 hover:text-blue-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </div>
  );
};

export default ScrollToTopIcon;