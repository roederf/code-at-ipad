export function TransformiereWert(wert){
    return wert *20;

}

export function TransformierePunkt (punkt){
    var ergebnis = {
        x: TransformiereWert(punkt.x),
        y: 560-TransformiereWert(punkt.y)
    };
    return ergebnis;

}