function Vorbereitung(){
    console.log("Vorbereitung starten");
    
    var canvas = document.getElementById('Spielflaeche'),
    context = canvas.getContext('2d');

    var gorilla_bild_1 = new Image();
    gorilla_bild_1.src = 'donkey-kong.png';
    gorilla_bild_1.onload = function(){
        context.drawImage(gorilla_bild_1, 100, 300);
    }

    var gorilla_bild_2 = new Image();
    gorilla_bild_2.src = 'donkey-kong.png';
    gorilla_bild_2.onload = function(){
        context.drawImage(gorilla_bild_2, 900 - 64, 300);
    }

    console.log("Vorbereitung fertig");
}

function Abwerfen(){
    console.log("Es wurde abgworfen");
}