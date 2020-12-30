import Sleep from "../src/helper/sleep.js";

var bufferContext = null;
var buffer = null;
var gorilla_bild = new Image();
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

    gorilla_bild.src = 'donkey-kong.png';
    gorilla_bild.onload = function(){
        render();
    }
    
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

function TransformiereWert(wert){
    return wert *20;

}

function TransformierePunkt (punkt){
    var ergebnis = {
        x: TransformiereWert(punkt.x),
        y: 560-TransformiereWert(punkt.y)
    };
    return ergebnis;

}

function NeuZeichnen(){
    bufferContext.clearRect(0, 0, buffer.width, buffer.height);
}

function ZeichneGorilla(punkt){
    var pixel = TransformierePunkt(punkt);

    bufferContext.drawImage(gorilla_bild, pixel.x - 31, pixel.y - 46);
}

function ZeichneBall(punkt){
    var pixel = TransformierePunkt (punkt);
    
    bufferContext.beginPath();
    bufferContext.arc(pixel.x, pixel.y, 10, 0, 2*Math.PI);
    bufferContext.fillStyle="red";
    bufferContext.fill();
}

function ZeichneHaus (punkt,hoehe,breite){
    var pixel = TransformierePunkt (punkt);
    
    bufferContext.fillStyle="#000";
    bufferContext.fillRect(pixel.x, pixel.y, TransformiereWert(breite), -TransformiereWert(hoehe));
    bufferContext.fillStyle="green";
    bufferContext.fillRect(pixel.x+1, pixel.y+1, TransformiereWert(breite)-2, -TransformiereWert(hoehe)+1);
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

        ZeichneBall(punkt);
    }
        
    ZeichneGorilla({x:50,y:0});
    ZeichneGorilla({x:17,y:13});
    ZeichneHaus({x:15, y:0},13, 5);
    ZeichneGorilla({x:0,y:0});
    ZeigeZeichnung();
  
    requestAnimationFrame(render);
}
