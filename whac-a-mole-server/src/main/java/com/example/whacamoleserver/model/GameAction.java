package com.example.whacamoleserver.model;

public class GameAction {
    public enum ActionType {
        TAP, // Add more action types as needed
    }

    private ActionType actionType;
    private int screenIndex; // Index of the tapped screen
    private int playerId; // Add a player ID if needed

    // Constructors, getters, and setters

    public GameAction() {
        // Default constructor
    }

    public GameAction(ActionType actionType, int screenIndex) {
        this.actionType = actionType;
        this.screenIndex = screenIndex;
    }

    public ActionType getActionType() {
        return actionType;
    }

    public void setActionType(ActionType actionType) {
        this.actionType = actionType;
    }

    public int getScreenIndex() {
        return screenIndex;
    }

    public void setScreenIndex(int screenIndex) {
        this.screenIndex = screenIndex;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }
}
