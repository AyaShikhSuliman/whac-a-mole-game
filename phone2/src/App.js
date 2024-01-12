import React, { useState, useEffect } from 'react';
import './App.css';
import Screen from './components/Screen';
import ScoreDisplay from './components/ScoreDisplay';
import { connectWebSocket, disconnectWebSocket } from './WebSocketService'; // Import WebSocket functions

function App() {
  const [screenColor, setScreenColor] = useState('red');
  const [score, setScore] = useState(0);

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

  useEffect(() => {
    connectWebSocket(handleWebSocketMessage);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      disconnectWebSocket();
    };
  }, []);

  // Callback function to handle WebSocket messages
  const handleWebSocketMessage = (message) => {
    // Assuming that the incoming message has a 'type' field
    switch (message.type) {
      case 'screenUpdate':
        // Update the screen color based on the received message
        // The 'color' field represents the new screen color
        setScreenColor(message.color);
        break;
  
      case 'scoreUpdate':
        // Update the player's score based on the received message
        // The 'score' field represents the new score
        setScore(message.score);
        break;
  
      default:
        // Handle other message types if needed
        break;
    }
  };
  


  return (
    <div className="App">
      <h1>Phone App</h1>
      <Screen color={screenColor} />
      <ScoreDisplay score={score} />
    </div>
  );
}

export default App;
