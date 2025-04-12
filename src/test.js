import React from 'react'
import { useState } from 'react';

 const Test = () => {
    const [isHidden, setIsHidden] = useState(true);

  const toggleSideNav = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <div>
      <button id="menuBtn" onClick={toggleSideNav}>
        Toggle Menu
      </button>
      <div id="sideNav" className={isHidden ? 'hidden' : ''}>
        kjkjkjkjkj
      </div>
    </div>


    
    </>
  )
}
export default Test