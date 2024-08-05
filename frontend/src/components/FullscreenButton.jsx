// src/FullscreenButton.js
import React, { useState, useEffect } from 'react';
import '../assets/style.css';

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  if (isFullscreen) {
    return null;
  }

  return (
    <svg className='button-top-right' onClick={handleFullscreen} id="fi_10023097" height="80" viewBox="0 0 512 512" width="80" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2"><g id="Icon"><g id="_103" data-name="103"><rect id="Background" fill="#2492ff" height="512" rx="150" transform="matrix(0 -1 1 0 0 512)" width="512"></rect><g fill="#fff"><path d="m193.57 283.07-40.48 40.48v-17.22c0-13.81-11.19-25-25-25-13.81 0-25 11.19-25 25v77.57c0 13.81 11.19 25 25 25h77.57c13.81 0 25-11.19 25-25 0-13.81-11.19-25-25-25h-17.22s40.48-40.48 40.48-40.48c9.76-9.76 9.76-25.59 0-35.36-9.76-9.76-25.59-9.76-35.36 0z"></path><path d="m318.43 228.93 40.48-40.48v17.22c0 13.81 11.19 25 25 25 13.81 0 25-11.19 25-25v-77.57c0-13.81-11.19-25-25-25h-77.57c-13.81 0-25 11.19-25 25 0 13.81 11.19 25 25 25h17.22s-40.48 40.48-40.48 40.48c-9.76 9.76-9.76 25.59 0 35.36 9.76 9.76 25.59 9.76 35.36 0z"></path><path d="m228.93 193.57-40.48-40.48h17.22c13.81 0 25-11.19 25-25 0-13.81-11.19-25-25-25h-77.57c-13.81 0-25 11.19-25 25v77.57c0 13.81 11.19 25 25 25 13.81 0 25-11.19 25-25v-17.22s40.48 40.48 40.48 40.48c9.76 9.76 25.59 9.76 35.36 0 9.76-9.76 9.76-25.59 0-35.36z"></path><path d="m283.07 318.43 40.48 40.48h-17.22c-13.81 0-25 11.19-25 25 0 13.81 11.19 25 25 25h77.57c13.81 0 25-11.19 25-25v-77.57c0-13.81-11.19-25-25-25-13.81 0-25 11.19-25 25v17.22s-40.48-40.48-40.48-40.48c-9.76-9.76-25.59-9.76-35.36 0-9.76 9.76-9.76 25.59 0 35.36z"></path></g></g></g></svg>
  );
};

export default FullscreenButton;
