package com.example.whacamoleserver.controller;

import com.example.whacamoleserver.model.GameAction;
import com.example.whacamoleserver.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/game/tap") // Handle player taps
    public void handlePlayerTap(@Payload GameAction gameAction) {
        // Delegate the player tap handling to the GameService
        gameService.handlePlayerTap(gameAction.getScreenIndex());
    }
    
    @MessageMapping("/game/score") // Handle score updates
    @SendTo("/topic/score-update")
    public int getScore() {
        return gameService.getScore();
    }
}
