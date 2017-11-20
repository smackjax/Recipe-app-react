import untypedSvg from './untyped-circle.svg';
import snackSvg from './snack-circle.svg';
import breakfastSvg from './breakfast-circle.svg';
import lunchSvg from './lunch-circle.svg';
import dinnerSvg from './dinner-circle.svg';
import dessertSvg from './dessert-circle.svg';
import drinkSvg from './drink-circle.svg';


export const untyped = untypedSvg;
export const snack = snackSvg;
export const breakfast = breakfastSvg;
export const lunch = lunchSvg;
export const dinner =  dinnerSvg;
export const dessert = dessertSvg;
export const drink = drinkSvg;

export function getIconSrc(iconType){
    // sets recipe body image src
    let svgSrc = iconType &&
    iconType === "snack" ? snackSvg : 
    iconType === "breakfast" ? breakfastSvg  :
    iconType === "lunch" ? lunchSvg :
    iconType === "dinner" ? dinnerSvg : 
    iconType === "dessert" ? dessertSvg :
    iconType === "drink" && drinkSvg;
    // Default
    if(!svgSrc)svgSrc = untypedSvg;
    
    return svgSrc;
}