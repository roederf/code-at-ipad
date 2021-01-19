export default function BerechneBallPosition(x, y, sekunden, winkel, geschwindigkeit){

    var b = winkel * Math.PI / 180;

    var gravity = 9.81;

    var sx = x + geschwindigkeit * Math.cos(b) * sekunden;
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