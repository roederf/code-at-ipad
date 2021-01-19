import { TransformierePunkt, TransformiereWert } from "./transform.js";

export default function ZeichneLoch (context,punkt){
    
    var pixel = TransformierePunkt (punkt);
    var radius = TransformiereWert(3);
    context.beginPath();
    context.fillStyle="blue";
    context.arc(pixel.x, pixel.y, radius, 0, 2 * Math.PI);
    context.fill();
}