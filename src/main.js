import ZeichneHaus from "./rendering/house.js";
import ZeichneGorilla from "./rendering/gorilla.js";
import ZeichneBall from "./rendering/ball.js";
import { NewGame, Player1Throw, Simulate } from "./game/gameplay.js";

var bufferContext = null;
var buffer = null;
var winkel;
var geschwindigkeit;

window.onload = function(){
    var canvas = document.getElementById('Spielflaeche');
    
    buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;

    bufferContext = buffer.getContext('2d');

    document.getElementById("EingabeButon").onclick = Abwerfen;

    NewGame();

    render();
}

function NeuZeichnen(){
    bufferContext.clearRect(0, 0, buffer.width, buffer.height);
}

function ZeigeZeichnung(){
    var canvas = document.getElementById('Spielflaeche');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(buffer, 0, 0);
}

async function Abwerfen(){
    winkel = parseInt(document.getElementById('EingabeWinkel').value);
    geschwindigkeit = parseInt(document.getElementById('EingabeGeschwindigkeit').value);
    
    Player1Throw(winkel, geschwindigkeit);
       
    console.log("Es wurde abgworfen");
}

function render() {

    var state = Simulate();

    NeuZeichnen();
    
    for (let i = 0; i < state.houses.length; i++)
    {    
        const hoehe = state.houses[i];
        const breite = 5;
        ZeichneHaus(bufferContext, {x:i*breite, y:0}, hoehe, breite); 
    }
        
    ZeichneGorilla(bufferContext, {x:state.player1Position.x,y:state.player1Position.y});
    ZeichneGorilla(bufferContext, {x:state.player2Position.x,y:state.player2Position.y});

    if (state.player1State === 'Throwing'){
        ZeichneBall(bufferContext, state.ball1Position);
    }
    
    ZeigeZeichnung();
  
    requestAnimationFrame(render);
}
