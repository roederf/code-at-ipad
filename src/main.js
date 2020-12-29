var context = null;

function Vorbereitung(){
    var canvas = document.getElementById('Spielflaeche');
    
    context = canvas.getContext('2d');

    var gorilla_bild = new Image();
    gorilla_bild.src = 'donkey-kong.png';
    gorilla_bild.onload = function(){
        context.drawImage(gorilla_bild, 100, 300);
        context.drawImage(gorilla_bild, 900 - 64, 300);
    }

}

function BerechnePosition(sekunden, geschwindigkeit){
    var strecke = geschwindigkeit * sekunden;
    var pixelX = strecke * 100;

    return pixelX;
}

function NeuZeichnen(){
    var canvas = document.getElementById('Spielflaeche');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function ZeichneGorilla(){
    var gorilla_bild = new Image();
    gorilla_bild.src = 'donkey-kong.png';
    gorilla_bild.onload = function(){
        context.drawImage(gorilla_bild, 100, 300);
        context.drawImage(gorilla_bild, 900 - 64, 300);
    }  
}

function ZeichneBall(positionX){
    context.beginPath();
    context.arc(positionX, 50, 10, 0, 2*Math.PI);
    context.fillStyle="red";
    context.fill();
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
        await Sleep(50);
    }
   
    
    console.log("Es wurde abgworfen");
}