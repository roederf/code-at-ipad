import BerechneBallPosition from "./formulas.js";

var playerStates = ['Define', 'Throwing', 'Waiting'];

var state = {
    playerName1: null,
    player1Position: null,
    playerName2: null,
    player2Position: null,
    ball1Position: null,
    player1State: playerStates[0],
    player2State: playerStates[2],
    ball2Position: null,
    houses: [],
    player1ThrownTime: null,
    player1Winkel: undefined,
    player1Geschwindigkeit: undefined
}

export function NewGame(){
    state.player1Position = {
        x: 12,
        y: 5
    };
    state.player2Position = {
        x:43,
        y:11
    };
    state.houses = [
        10, 8, 5, 9, 11, 20, 8, 7, 11, 9, 10
    ];
}

export function Player1Throw(winkel, geschwindigkeit){
    state.player1ThrownTime = new Date();
    state.player1State = playerStates[1];

    state.player1Winkel = winkel;
    state.player1Geschwindigkeit = geschwindigkeit;
    state.ball1Position = state.player1Position;
}

export function Simulate(){
    var aktuellerZeitpunkt = new Date();

    if (state.player1State === playerStates[1]){
        var sekunden = (aktuellerZeitpunkt.getTime() - state.player1ThrownTime.getTime()) / 1000;
        state.ball1Position = BerechneBallPosition(state.player1Position.x, state.player1Position.y, sekunden, state.player1Winkel, state.player1Geschwindigkeit);
        
        if (state.ball1Position.y < 0){
            state.player1State = playerStates[2];
            state.player2State = playerStates[1];
        }
    }
    
    return state;
}

export function GetGameState() {
    return state;
}

