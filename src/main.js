import ZeichneHaus from "./rendering/house.js";
import ZeichneGorilla from "./rendering/gorilla.js";
import ZeichneBall from "./rendering/ball.js";
import { NeuesSpielStarten, 
    Spieler1Werfen, 
    Spieler2Werfen,
    Simulation } from "./game/gameplay.js";
import { ABGEWORFEN, AN_DER_REIHE, GEWONNEN, WARTEN } from "./game/konstanten.js"
import { TransformierePunkt } from "./rendering/transform.js";
import { BerechneWinkelUndGeschwindigkeit } from "./game/gameplay.js";
import { BerechneSekunden } from "./game/formulas.js";

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

    console.log("adding eventhandler ");

    canvas.addEventListener("mousedown", handleMouseDown, false);
    canvas.addEventListener("mousemove", handleMouseMove, false);
    canvas.addEventListener("mouseup", handleMouseUp, false);

    NeuesSpielStarten();

    document.getElementById("Spieler1Titel").innerHTML = "Spieler 1 ist dran";

    render();
}

var startDrag = undefined;
var startTime = undefined;

function handleMouseDown(event) {
    console.log(event);
    startDrag = {
        x: event.offsetX,
        y: event.offsetY
    }
    startTime = new Date();
}

function handleMouseMove(event) {
    
}

function handleMouseUp(event) {
    console.log(event);
    var endDrag = {
        x: event.offsetX,
        y: event.offsetY
    }
    
    var sekunden = BerechneSekunden(startTime);

    if (startDrag)
    {
        var p1 = TransformierePunkt(startDrag);
        var p2 = TransformierePunkt(endDrag);
        
        var daten = BerechneWinkelUndGeschwindigkeit(p1, p2, sekunden)

        Spieler1Werfen(daten.winkel, daten.geschwindigkeit);
        
        startDrag = null;
    }
    
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
    if (spieler.zustand === GEWONNEN){
        document.getElementById("Info").innerHTML = "Spieler" + spieler.name + " hat gewonnen.";
    }
    else if (spieler.zustand === AN_DER_REIHE ){
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
    
    var startX = 0;
    for (let i = 0; i < spielzustand.haeuser.length; i++)
    {    
        const hoehe = spielzustand.haeuser[i].y;
        const breite = spielzustand.haeuser[i].b;
        ZeichneHaus(bufferContext, {x:startX, y:0}, hoehe, breite); 
        startX += breite;
    }
        
    ZeichneGorilla(bufferContext, spielzustand.spieler1.position);
    ZeichneGorilla(bufferContext, spielzustand.spieler2.position);

    ZeigeZustand(spielzustand.spieler1);
    ZeigeZustand(spielzustand.spieler2);

    if (spielzustand.spieler1.zustand === ABGEWORFEN || spielzustand.spieler2.zustand === ABGEWORFEN){
        ZeichneBall(bufferContext, spielzustand.ballPosition);
    }

    ZeigeZeichnung();
  
    requestAnimationFrame(render);
}
