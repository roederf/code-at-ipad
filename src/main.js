import ZeichneHaus from "./rendering/house.js";
import ZeichneGorilla from "./rendering/gorilla.js";
import ZeichneBall from "./rendering/ball.js";
import { NeuesSpielStarten, Spieler1Werfen, Simulation } from "./game/gameplay.js";

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

    NeuesSpielStarten();

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
    
    Spieler1Werfen(winkel, geschwindigkeit);
       
    console.log("Es wurde abgworfen");
}

function render() {

    var spielzustand = Simulation();

    NeuZeichnen();
    
    for (let i = 0; i < spielzustand.haeuser.length; i++)
    {    
        const hoehe = spielzustand.haeuser[i];
        const breite = 5;
        ZeichneHaus(bufferContext, {x:i*breite, y:0}, hoehe, breite); 
    }
        
    ZeichneGorilla(bufferContext, spielzustand.spieler1.position);
    ZeichneGorilla(bufferContext, spielzustand.spieler2.position);

    if (spielzustand.spieler1.zustand === 'Abgeworfen'){
        ZeichneBall(bufferContext, spielzustand.ballPosition);
    }
    
    ZeigeZeichnung();
  
    requestAnimationFrame(render);
}
