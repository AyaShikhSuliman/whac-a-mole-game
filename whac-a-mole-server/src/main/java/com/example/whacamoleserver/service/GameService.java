package com.example.whacamoleserver.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class GameService {
    private final SimpMessagingTemplate messagingTemplate;
    private final ScheduledExecutorService executorService;
    private String[] screens = new String[3]; // Array to represent screen colors (red, green)
    private int activeScreenIndex = -1; // Index of the currently active green screen
    private int score = 0;

    public GameService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.executorService = Executors.newSingleThreadScheduledExecutor();
        initializeGame();
    }

    public void initializeGame() {
        // Initialize all screens as red
        for (int i = 0; i < screens.length; i++) {
            screens[i] = "red";
        }
        // Start the game loop
        startGameLoop();
    }

    private void startGameLoop() {
        executorService.scheduleAtFixedRate(this::updateGameState, 0, 2000, TimeUnit.MILLISECONDS);
    }

    private void updateGameState() {
        // Randomly choose the next active screen (0, 1, or 2)
        int randomIndex = new Random().nextInt(3);

        // Set the chosen screen to green
        screens[randomIndex] = "green";

        // Set the previous active screen back to red
        if (activeScreenIndex >= 0) {
            screens[activeScreenIndex] = "red";
        }

        // Update the active screen index
        activeScreenIndex = randomIndex;

        // Send the updated game state to clients
        sendGameStateToClients();
    }

    public void handlePlayerTap(int tappedScreenIndex) {
        // if (tappedScreenIndex == activeScreenIndex) {
        // Player tapped the active (green) screen
        // screens[tappedScreenIndex] = "green"; // Show a tap indication (you can
        // adjust this)
        score++;
        // Send score update to clients
        sendScoreUpdateToClients();
        // }
    }

    private void sendGameStateToClients() {
        messagingTemplate.convertAndSend("/topic/game-state", screens);
    }

    private void sendScoreUpdateToClients() {
        messagingTemplate.convertAndSend("/topic/score-update", score);
    }

    public int getScore() {
        return score;
    }

    public String[] getScreens() {
        return screens;
    }
}
