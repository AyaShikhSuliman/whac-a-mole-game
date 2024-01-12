
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WS_URL = 'http://localhost:8080/ws-game'; // Replace with your WebSocket server URL

let stompClient = null;

export const connectWebSocket = (onMessageReceived, onScoreReceived) => {
  const socket = new SockJS(WS_URL);
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    stompClient.subscribe('/topic/game-state', (message) => {
      const messageBody = JSON.parse(message.body);
      onMessageReceived(messageBody);
    });

    // Subscribe to the /topic/score-update destination
    stompClient.subscribe('/topic/score-update', (message) => {
      const score = JSON.parse(message.body);
      onScoreReceived(score);
    });
  });
};

export const sendGameAction = (gameAction) => {
  console.log('game action sent');
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/game', {}, JSON.stringify(gameAction));
  } else {
    console.warn('WebSocket is not connected');
  }
};

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => {
      console.log('WebSocket connection closed');
    });
  }
};
