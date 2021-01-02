
import {TransformierePunkt} from "./transform.js"

export default function ZeichneBall(buffer,punkt){
    var pixel = TransformierePunkt (punkt);
    
    buffer.beginPath();
    buffer.arc(pixel.x, pixel.y, 10, 0, 2*Math.PI);
    buffer.fillStyle="red";
    buffer.fill();
}