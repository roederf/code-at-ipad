var bufferContext = null;
var buffer = null;
var gorilla_bild = new Image();
var ballGeworfen = false;
var ballGeworfenStart = null;
var winkel;
var geschwindigkeit;
var punkt;

function Vorbereitung(){
    var canvas = document.getElementById('Spielflaeche');
    
    buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;

    bufferContext = buffer.getContext('2d');

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

function NeuZeichnen(){
    bufferContext.clearRect(0, 0, buffer.width, buffer.height);
}

function ZeichneGorilla(){
    bufferContext.drawImage(gorilla_bild, 100, 500);
    bufferContext.drawImage(gorilla_bild, 900 - 64, 500);  
}

function ZeichneBall(punkt){
    var scale = 10;
    bufferContext.beginPath();
    bufferContext.arc(100 + punkt.x * scale, 500 - punkt.y * scale, 10, 0, 2*Math.PI);
    bufferContext.fillStyle="red";
    bufferContext.fill();
}

function ZeigeZeichnung(){
    var canvas = document.getElementById('Spielflaeche');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(buffer, 0, 0);
}

function Sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
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

var lastRender = Date.now();

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
        
    ZeichneGorilla();
    ZeigeZeichnung();
  
    requestAnimationFrame(render);
}
