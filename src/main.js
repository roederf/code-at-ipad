import ZeichneHaus from "./rendering/house.js";
import ZeichneGorilla from "./rendering/gorilla.js";
import ZeichneBall from "./rendering/ball.js";
import { NeuesSpielStarten, 
    Spieler1Werfen, 
    Spieler2Werfen,
    Simulation } from "./game/gameplay.js";
import { ABGEWORFEN, AN_DER_REIHE, WARTEN } from "./game/konstanten.js"

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

    document.getElementById("EingabeButon1").onclick = AbwerfenSpieler1;
    document.getElementById("EingabeButon2").onclick = AbwerfenSpieler2;

    NeuesSpielStarten();

    document.getElementById("Spieler1Titel").innerHTML = "Spieler 1 ist dran";

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

async function AbwerfenSpieler1(){
    winkel = parseInt(document.getElementById('EingabeWinkel1').value);
    geschwindigkeit = parseInt(document.getElementById('EingabeGeschwindigkeit1').value);
    
    Spieler1Werfen(winkel, geschwindigkeit);
}

async function AbwerfenSpieler2(){
    winkel = parseInt(document.getElementById('EingabeWinkel2').value);
    geschwindigkeit = parseInt(document.getElementById('EingabeGeschwindigkeit2').value);
    
    Spieler2Werfen(180 - winkel, geschwindigkeit);
}

function ZeigeZustand(spieler) {
    if (spieler.zustand === AN_DER_REIHE ){
        document.getElementById("Spieler" + spieler.name + "Titel").innerHTML = "Spieler " + spieler.name + " ist dran";
    }
    else if (spieler.zustand === ABGEWORFEN){
        document.getElementById("Spieler" + spieler.name + "Titel").innerHTML = "Spieler " + spieler.name + " hat geworfen";
    }
    else if (spieler.zustand === WARTEN){
        document.getElementById("Spieler" + spieler.name + "Titel").innerHTML = "Spieler " + spieler.name + " wartet";
    }
}

function render() {

    var spielzustand = Simulation();

    NeuZeichnen();
    
    for (let i = 0; i < spielzustand.haeuser.length; i++)
    {    
        const hoehe = spielzustand.haeuser[i].y;
        const breite = 5;
        ZeichneHaus(bufferContext, {x:i*breite, y:0}, hoehe, breite); 
    }
        
    ZeichneGorilla(bufferContext, spielzustand.spieler1.position);
    ZeichneGorilla(bufferContext, spielzustand.spieler2.position);

    if (spielzustand.spieler1.zustand === ABGEWORFEN || spielzustand.spieler2.zustand === ABGEWORFEN){
        ZeichneBall(bufferContext, spielzustand.ballPosition);
    }

    ZeigeZustand(spielzustand.spieler1);
    ZeigeZustand(spielzustand.spieler2);

    ZeigeZeichnung();
  
    requestAnimationFrame(render);
}
