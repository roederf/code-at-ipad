import { TransformierePunkt } from "./transform.js";

export default function ZeichneLoch (context,punkt){
    var pixel = TransformierePunkt (punkt);
    var radius = 50;
    context.beginPath();
    context.fillStyle="blue";
    context.arc(pixel.x, pixel.y, radius, 0, 2 * Math.PI);
    context.fill();
}