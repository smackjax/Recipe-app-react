import React from 'react';
import ColorSplotch from './color-splotch/color-splotch.component';
import Select from '../../_ez-select/select/select.component';
import Option from '../../_ez-select/option/option.component';

import './recipe-type-select.css'
export default (props)=>{
    // props.invalid
    // props.currentType
    // props.placeholderTxt
    // props.noPlaceholder
    
    // props.onChange
    // props.className

    
    const type = props.currentType;

    
    const snackValid = (type === "snack");
    const breakfastValid = (type === "breakfast");
    const lunchValid = (type === "lunch");
    const dinnerValid = (type === "dinner");
    const dessertValid = (type === "dessert");
    const drinkValid = (type === "drink");

    const invalidClassName = props.invalid ? " border-danger" : "";
    const selectedClassName = "selected" + invalidClassName;
    return (
        <Select
        className={"recipe-type-select " + props.className}
        optClassName="recipe-type-select-item"
        dropdownClassName="recipe-type-select-dropdown"
        selectedClassName={selectedClassName}
        onChange={props.onChange}
        >
            <Option
            placeholder={!props.noPlaceholder}
            selected
            value={props.noPlaceholder ? "all" : ""}
            >
                <ColorSplotch className="bg-untyped" />
                <span>{props.placeholderTxt || "Select a type"}</span>
            </Option>

            <Option
            value="snack"
            selected={snackValid}
            >
                <ColorSplotch className="bg-snack" />
                <span>Snack</span>
            </Option>

            <Option
            value="breakfast"
            selected={breakfastValid}
            >
                <ColorSplotch className="bg-breakfast" />
                <span>Breakfast</span>
            </Option>

            <Option
            value="lunch"
            selected={lunchValid}
            >
                <ColorSplotch className="bg-lunch" />
                <span>Lunch</span>
            </Option>

            <Option
            value="dinner"
            selected={dinnerValid}
            >
                <ColorSplotch className="bg-dinner" />
                <span>Dinner</span>
            </Option>

            <Option
            value="dessert"
            selected={dessertValid}
            >
                <ColorSplotch className="bg-dessert" />
                <span>Dessert</span>
            </Option>
            <Option
            value="drink"
            selected={drinkValid}
            >
                <ColorSplotch className="bg-drink" />
                <span>Drink</span>
            </Option>

        </Select>

    )
}
