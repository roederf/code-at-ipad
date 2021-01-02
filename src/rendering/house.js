import { TransformierePunkt, TransformiereWert } from "./transform.js";

export default function ZeichneHaus (context,punkt,hoehe,breite){
    var pixel = TransformierePunkt (punkt);
    
    context.fillStyle="#000";
    context.fillRect(pixel.x, pixel.y, TransformiereWert(breite), -TransformiereWert(hoehe));
    context.fillStyle="darkgreen";
    context.fillRect(pixel.x+1, pixel.y+1, TransformiereWert(breite)-2, -TransformiereWert(hoehe)+1);
}