import React, { useState, useEffect } from 'react';
import './App.css';
import Screen from './components/Screen';
import ScoreDisplay from './components/ScoreDisplay';
import { connectWebSocket, disconnectWebSocket, sendGameAction } from './WebSocketService'; // Import WebSocket functions


function App() {
  const [screenColor, setScreenColor] = useState('red');
  const [score, setScore] = useState(0);

  useEffect(() => {
    connectWebSocket(handleWebSocketMessage, handleScoreUpdate);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      disconnectWebSocket();
    };
  }, []);

  // Function to simulate screen color changes
  const changeScreenColor = () => {
    if (screenColor === 'red') {
      setScreenColor('green');
    } else {
      setScreenColor('red');
    }
  };

  // Simulate screen color changes at a random interval
  useEffect(() => {
    const intervalId = setInterval(changeScreenColor, Math.random() * 2000 + 1000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [screenColor]);



  // Callback function to handle WebSocket messages
  const handleWebSocketMessage = (message) => {
    console.log(message)
    switch (message.type) {
      case 'screenUpdate':
        // Update the screen color based on the received message
        setScreenColor(message.screens);
        break;
      default:
        // Handle other message types if needed
        break;
    }
  };

  const handleScoreUpdate = (score) => {
    console.log(score)
    // Update the score in your component's state or UI
    setScore(score);
  };



  const handleScreenTap = () => {
    console.log("is tapped")
    
    if (screenColor[0] === 'green') {
      // Send a "tap" action to the server
      const gameAction = {
        type: 'tap', // Define your action type as needed
        screenIndex: 0, // Adjust the screen index based on your setup
      };
      sendGameAction(gameAction);
    }
  };


  return (
    <div className="App">
      <h1>Phone App</h1>
      <Screen colors={screenColor} onScreenTap={handleScreenTap} />
      <ScoreDisplay score={score} />
    </div>
  );
}

export default App;
