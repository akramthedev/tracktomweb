import React from 'react';

export default function ToggleButton({ isOn, onToggle }) {
  const backgroundColor = isOn ? '#68a46c' : '#D5D5D5';
  const translateX = isOn ? 34 : 2; 

  const containerStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const toggleBackgroundStyle = {
    width: '70px',
    height: '39px',
    borderRadius: '25px',
    backgroundColor,
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.1s ease-in-out',
  };

  const circleStyle = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    transform: `translateX(${translateX}px)`,
    transition: 'transform 0.1s ease-in-out',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  return (
    <div style={containerStyle} onClick={onToggle}>
      <div style={toggleBackgroundStyle}>
        <div style={circleStyle} />
      </div>
    </div>
  );
}
