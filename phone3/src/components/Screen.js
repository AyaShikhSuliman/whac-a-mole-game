import React from 'react';
import { sendGameAction } from '../WebSocketService'; // Adjust the path to your WebSocketService.js


const Screen = ({ color }) => {
  const handleScreenTap = () => {
    if (color === 'green') {
      // Send a "tap" action to the server
      const gameAction = {
        type: 'tap', // Define your action type as needed
        screenIndex: 2, // Adjust the screen index based on your setup
      };
      sendGameAction(gameAction);
    }
  };

  const screenStyle = {
    backgroundColor: color,
    width: '100px', // Adjust the size as needed
    height: '100px',
    borderRadius: '50%', // Make it round
    cursor: color === 'green' ? 'pointer' : 'default', // Change cursor on green screen
  };

  return (
    <div className="screen" style={screenStyle} onClick={handleScreenTap}></div>
  );
};

export default Screen;
