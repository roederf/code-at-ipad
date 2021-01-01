import { TransformierePunkt } from "./transform.js"

var gorilla_bild = new Image();
gorilla_bild.src = 'donkey-kong.png';

export default function ZeichneGorilla(buffer, punkt){
    var pixel = TransformierePunkt(punkt);

    buffer.drawImage(gorilla_bild, pixel.x - 31, pixel.y - 46);
}