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

function BerechnePosition(sekunden, geschwindigkeit){
    var strecke = geschwindigkeit * sekunden;
    var pixelX = strecke * 100;

    return pixelX;
}

function NeuZeichnen(){
    bufferContext.clearRect(0, 0, buffer.width, buffer.height);
}

function ZeichneGorilla(){
    bufferContext.drawImage(gorilla_bild, 100, 300);
    bufferContext.drawImage(gorilla_bild, 900 - 64, 300);  
}

function ZeichneBall(positionX){
    bufferContext.beginPath();
    bufferContext.arc(positionX, 50, 10, 0, 2*Math.PI);
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
    var winkel = document.getElementById('EingabeWinkel').value;
    var kraft = document.getElementById('EingabeKraft').value;

    var pixelX = 0;
    var startzeit = new Date();
    
    while(pixelX < 1000){
        var aktuellerZeitpunkt = new Date();
        
        var sekunden = (aktuellerZeitpunkt.getTime() - startzeit.getTime()) / 1000;
        
        pixelX = BerechnePosition(sekunden,3);
        
        NeuZeichnen();
        ZeichneBall(pixelX);
        ZeichneGorilla();
        ZeigeZeichnung();
        
        await Sleep(100);
    }
   
    
    console.log("Es wurde abgworfen");
}