import BerechneBallPosition from "./formulas.js";
import { AN_DER_REIHE, ABGEWORFEN, WARTEN, GEWONNEN } from "./konstanten.js"

var spielzustand = {
    spieler1: {
        name: "1",
        position: null,
        zustand: AN_DER_REIHE,
        zeitAbgeworfen: null,
        winkel: undefined,
        geschwindigkeit: undefined
    },
    spieler2: {
        name: "2",
        position: null,
        zustand: WARTEN,
        zeitAbgeworfen: null,
        winkel: undefined,
        geschwindigkeit: undefined
    },
    ballPosition: null,
    haeuser: []
}

export function NeuesSpielStarten(){
    
    spielzustand.haeuser = [
        { x: 0, y: generateRandomHeight(), b:5 },
        { x: 5, y: generateRandomHeight(), b:5 },
        { x:10, y: generateRandomHeight(), b:5 },
        { x:15, y: generateRandomHeight(), b:5 },
        { x:20, y: generateRandomHeight(), b:5 },
        { x:25, y: generateRandomHeight(), b:5 },
        { x:30, y: generateRandomHeight(), b:5 },
        { x:35, y: generateRandomHeight(), b:5 },
        { x:40, y: generateRandomHeight(), b:5 },
        { x:45, y: generateRandomHeight(), b:5 }
    ];
    spielzustand.spieler1.position = {
        x: spielzustand.haeuser[1].x + 3,
        y: spielzustand.haeuser[1].y
    };
    spielzustand.spieler2.position = {
        x: spielzustand.haeuser[spielzustand.haeuser.length-2].x + 3,
        y: spielzustand.haeuser[spielzustand.haeuser.length-2].y
    };
    spielzustand.ballPosition = null;
}

function generateRandomHeight()
{
    return Math.random() * 20;
}

export function Spieler1Werfen(winkel, geschwindigkeit){
    if (spielzustand.spieler1.zustand === AN_DER_REIHE) {
        spielzustand.spieler1.zeitAbgeworfen = new Date();
        spielzustand.spieler1.zustand = ABGEWORFEN;
    
        spielzustand.spieler1.winkel = winkel;
        spielzustand.spieler1.geschwindigkeit = geschwindigkeit;
        spielzustand.ballPosition=spielzustand.spieler1.position;
    }
}

export function Spieler2Werfen(winkel, geschwindigkeit){
    if (spielzustand.spieler2.zustand === AN_DER_REIHE) {
        spielzustand.spieler2.zeitAbgeworfen = new Date();
        spielzustand.spieler2.zustand = ABGEWORFEN;
    
        spielzustand.spieler2.winkel = winkel;
        spielzustand.spieler2.geschwindigkeit = geschwindigkeit;
        spielzustand.ballPosition=spielzustand.spieler2.position;
    }
}

function TesteObBallAußerhalbDesBereichsIst() {
    return (spielzustand.ballPosition.y < 0) || (spielzustand.ballPosition.x > 50) || (spielzustand.ballPosition.x < 0);
}

function TesteObBallEtwasGetroffenHat(){
    for(var i=0; i<spielzustand.haeuser.length; i++){
        var haus = spielzustand.haeuser[i];
        if (spielzustand.ballPosition.x > haus.x 
            && spielzustand.ballPosition.x < haus.x + haus.b)
            {
                if (haus.y > spielzustand.ballPosition.y){
                    return true;
                }
            }
    }

    return false;
}

function TesteObBallSpielerGetroffenWurde(spieler){
    var abstandX = spieler.position.x - spielzustand.ballPosition.x;
    var abstandY = spieler.position.y - spielzustand.ballPosition.y;
    var abstand = Math.sqrt( abstandX * abstandX + abstandY * abstandY );
    return (abstand <= 1.5);
}

export function Simulation(){
    var aktuellerZeitpunkt = new Date();

    if (spielzustand.spieler1.zustand === ABGEWORFEN){
        var sekunden = (aktuellerZeitpunkt.getTime() - spielzustand.spieler1.zeitAbgeworfen.getTime()) / 1000;
        spielzustand.ballPosition = BerechneBallPosition(
            spielzustand.spieler1.position.x, 
            spielzustand.spieler1.position.y, 
            sekunden, 
            spielzustand.spieler1.winkel,
            spielzustand.spieler1.geschwindigkeit);
        
        if (TesteObBallSpielerGetroffenWurde(spielzustand.spieler2)){
            spielzustand.spieler1.zustand = GEWONNEN;
        }
        else if (TesteObBallEtwasGetroffenHat() || TesteObBallAußerhalbDesBereichsIst()){
            spielzustand.spieler1.zustand = WARTEN;
            spielzustand.spieler2.zustand = AN_DER_REIHE;
        }
    }

    if (spielzustand.spieler2.zustand === ABGEWORFEN){
        var sekunden = (aktuellerZeitpunkt.getTime() - spielzustand.spieler2.zeitAbgeworfen.getTime()) / 1000;
        spielzustand.ballPosition = BerechneBallPosition(
            spielzustand.spieler2.position.x, 
            spielzustand.spieler2.position.y, 
            sekunden, 
            spielzustand.spieler2.winkel,
            spielzustand.spieler2.geschwindigkeit);
        
        if (TesteObBallSpielerGetroffenWurde(spielzustand.spieler1)){
            spielzustand.spieler2.zustand = GEWONNEN;
        }
        else if (TesteObBallEtwasGetroffenHat() || TesteObBallAußerhalbDesBereichsIst()){
            spielzustand.spieler1.zustand = AN_DER_REIHE;
            spielzustand.spieler2.zustand = WARTEN;
        }
    }
    
    return spielzustand;
}


