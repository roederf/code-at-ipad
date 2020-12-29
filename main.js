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

function Abwerfen(){
    var winkel = document.getElementById('EingabeWinkel').value;
    var kraft = document.getElementById('EingabeKraft').value;

    context.beginPath();
    context.arc(50, 50, 10, 0, 2*Math.PI);
    context.fillStyle="red";
    context.fill();
    
    console.log("Es wurde abgworfen");
}