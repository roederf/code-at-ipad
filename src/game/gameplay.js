import BerechneBallPosition from "./formulas.js";

const AN_DER_REIHE = 'AnDerReihe';
const ABGEWORFEN = 'Abgeworfen';
const WARTEN = 'Warten';

var spielzustand = {
    spieler1: {
        name: "",
        position: null,
        zustand: AN_DER_REIHE,
        zeitAbgeworfen: null,
        winkel: undefined,
        geschwindigkeit: undefined
    },
    spieler2: {
        name: "",
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
        10, 8, 5, 9, 11, 20, 8, 7, 11, 9, 10
    ];
    spielzustand.ballPosition = null;
    spielzustand.spieler1.zustand = WARTEN;
    spielzustand.spieler2.zustand = AN_DER_REIHE;
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
        
        if (spielzustand.ballPosition.y < 0){
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
        
        if (spielzustand.ballPosition.y < 0){
            spielzustand.spieler1.zustand = AN_DER_REIHE;
            spielzustand.spieler2.zustand = WARTEN;
        }
    }
    
    return spielzustand;
}


