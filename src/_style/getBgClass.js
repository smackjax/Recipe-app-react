// (TODO) I don't like fragmenting the color references like this 
export default function getBgClass(colorType){
    let bgClass = colorType &&
    colorType === "snack" ? "bg-snack" : 
    colorType === "breakfast" ? "bg-breakfast"  :
    colorType === "lunch" ? "bg-lunch" :
    colorType === "dinner" ? "bg-dinner" : 
    colorType === "dessert" ? "bg-dessert" :
    colorType === "drink" && "bg-drink";
    // Default
    if(!bgClass) bgClass = "bg-untyped";

    return bgClass;
}