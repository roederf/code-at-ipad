import BerechneBallPosition from "./formulas.js";
import { AN_DER_REIHE, ABGEWORFEN, WARTEN } from "./konstanten.js"

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
    spielzustand.spieler1.position = {
        x: 12,
        y: 5
    };
    spielzustand.spieler2.position = {
        x:43,
        y:11
    };
    spielzustand.haeuser = [
        { x: 0, y:10, b:5 },
        { x: 5, y: 8, b:5 },
        { x:10, y: 5, b:5 },
        { x:15, y: 9, b:5 },
        { x:20, y:11, b:5 },
        { x:25, y:20, b:5 },
        { x:30, y: 8, b:5 },
        { x:35, y: 7, b:5 },
        { x:40, y:11, b:5 },
        { x:45, y: 9, b:5 },
        { x:50, y:10, b:5 }
    ];
    spielzustand.ballPosition = null;
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

function TesteObBallEtwasGetroffenHat(){
    var ergebnis = false;
    
    for(var i=0; i<spielzustand.haeuser.length; i++){
        var haus = spielzustand.haeuser[i];
        if (spielzustand.ballPosition.x > haus.x 
            && spielzustand.ballPosition.x < haus.x + haus.b)
            {
                if (haus.y > spielzustand.ballPosition.y){
                    ergebnis = true;
                    return ergebnis;
                }
            }
    }

    return ergebnis
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
        
        if (TesteObBallEtwasGetroffenHat()){
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
        
        if (TesteObBallEtwasGetroffenHat()){
            spielzustand.spieler1.zustand = AN_DER_REIHE;
            spielzustand.spieler2.zustand = WARTEN;
        }
    }
    
    return spielzustand;
}


