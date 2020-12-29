var bufferContext = null;
var buffer = null;
var gorilla_bild = new Image();

function Vorbereitung(){
    var canvas = document.getElementById('Spielflaeche');
    
    buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;

    bufferContext = buffer.getContext('2d');

    gorilla_bild.src = 'donkey-kong.png';
    gorilla_bild.onload = function(){
        NeuZeichnen();
        ZeichneGorilla();
        ZeigeZeichnung();
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
    var winkel = parseInt(document.getElementById('EingabeWinkel').value);
    var geschwindigkeit = parseInt(document.getElementById('EingabeGeschwindigkeit').value);

    var punkt = {
        x:0,
        y:0
    };
    var startzeit = new Date();
    
    while(punkt.y >= 0){
        var aktuellerZeitpunkt = new Date();
        
        var sekunden = (aktuellerZeitpunkt.getTime() - startzeit.getTime()) / 1000;
        
        punkt = BerechnePosition(sekunden, winkel, geschwindigkeit);
        
        NeuZeichnen();
        ZeichneBall(punkt);
        ZeichneGorilla();
        ZeigeZeichnung();
        
        await Sleep(50);
    }
   
    
    console.log("Es wurde abgworfen");
}