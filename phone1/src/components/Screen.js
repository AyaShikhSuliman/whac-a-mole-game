import React from 'react';

const Screen = ({ colors, onScreenTap }) => {
  return (
    <div className="screen" style={{ backgroundColor: colors[0] }}>
      <div
        className="inner-screen"
        style={{
          backgroundColor: colors,
          width: '100px', // Adjust the size as needed
          height: '100px',
          borderRadius: '50%', // Make it round
          cursor: colors[0] === 'green' ? 'pointer' : 'default',
        }}
        onClick={onScreenTap}
      ></div>
    </div>
  );
};

export default Screen;
