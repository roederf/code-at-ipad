import ZeichneHaus from "../src/rendering/house.js";
import ZeichneGorilla from "../src/rendering/gorilla.js";
import ZeichneBall from "../src/rendering/ball.js";
import { TransformierePunkt, TransformiereWert } from "../src/rendering/transform.js";

var bufferContext = null;
var buffer = null;
var ballGeworfen = false;
var ballGeworfenStart = null;
var winkel;
var geschwindigkeit;
var punkt;

window.onload = function(){
    var canvas = document.getElementById('Spielflaeche');
    
    buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;

    bufferContext = buffer.getContext('2d');

    document.getElementById("EingabeButon").onclick = Abwerfen;

    render();
    
}

function BerechnePosition(sekunden, winkel, geschwindigkeit){

    var b = winkel * Math.PI / 180;

    var gravity = 9.81;

    var sx = geschwindigkeit * Math.cos(b) * sekunden;
    var sy = geschwindigkeit * Math.sin(b) * sekunden - 0.5 * gravity * sekunden * sekunden;

    var punkt = {
        x: sx,
        y: sy
    };

    return punkt;
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

    punkt = {
        x:0,
        y:0
    };
    
    ballGeworfenStart = new Date();
    ballGeworfen = true;
       
    console.log("Es wurde abgworfen");
}

function render() {
    NeuZeichnen();

    if (ballGeworfen){
        var aktuellerZeitpunkt = new Date();

        var sekunden = (aktuellerZeitpunkt.getTime() - ballGeworfenStart.getTime()) / 1000;
        
        punkt = BerechnePosition(sekunden, winkel, geschwindigkeit);

        if (punkt.y < 0){
            ballGeworfen = false;
        }

        ZeichneBall(bufferContext,punkt);
    }
        
    ZeichneGorilla(bufferContext, {x:50,y:0});
    ZeichneGorilla(bufferContext, {x:17,y:13});
    ZeichneHaus(bufferContext, {x:15, y:0},13, 5);
    ZeichneGorilla(bufferContext, {x:0,y:0});
    ZeigeZeichnung();
  
    requestAnimationFrame(render);
}
