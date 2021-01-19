export default function BerechneBallPosition(x, y, sekunden, winkel, geschwindigkeit, wind){

    var b = winkel * Math.PI / 180;

    var gravity = 9.81;

    var sx = x + geschwindigkeit * Math.cos(b) * sekunden + wind/2 * sekunden * sekunden;
    var sy = y + geschwindigkeit * Math.sin(b) * sekunden - 0.5 * gravity * sekunden * sekunden;

    var punkt = {
        x: sx,
        y: sy
    };

    return punkt;
}

export function BerechneSekunden(startZeit) {
    var now = new Date();
    return (now.getTime() - startZeit.getTime()) / 1000;
}

export function BerechneAbstandVonPunkten(p1, p2) {
    var v = {
        x: p2.x - p1.x,
        y: p2.y - p1.y
    }

    var length = Math.sqrt( v.x * v.x + v.y * v.y );

    return length;
}