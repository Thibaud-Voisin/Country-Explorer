import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Result = ({ theme, isCountryRetrieved }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isCountryRetrieved) {
      scrollToBottom();
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isCountryRetrieved]);

  const scrollToBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollHeight = documentHeight - windowHeight;

    const scrollTo = () => {
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    };

    setTimeout(() => {
      scrollTo();
      setShowButton(true);
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setShowButton(false);
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop === documentHeight - windowHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  return isCountryRetrieved ? (
    <motion.div
      className='result w-[100vw] h-[100vh] relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showButton && (
        <button className="up_btn opacity-80	btn rounded-full absolute bottom-[8vh] right-[2vh] h-[5rem] w-[5rem]" onClick={scrollToTop}>
  <svg width="30" height="50" viewBox="0 0 185 284" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M93 0L184.924 91.9239L166.539 110.309L74.6152 18.3848L93 0Z" fill={theme === 'dark' ? 'black' : 'white'} class="three"/>
    <rect y="93" width="130" height="26" transform="rotate(-45 0 93)" fill={theme === 'dark' ? 'black' : 'white'} class="two"/>
    <rect x="81" y="33" width="26" height="251" fill={theme === 'dark' ? 'black' : 'white'} class="middle" />
  </svg>
</button>
      )}
    </motion.div>
  ) : null;
};

export default Result;
