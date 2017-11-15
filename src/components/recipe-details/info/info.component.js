import React from 'react';
import RecipeTypeSelect from '../../_recipe-type-select/recipe-type-select.component';
import OvenTemp from './oven-temp/oven-temp.component';
import CookTime from './cook-time/cook-time.component';

export default (props)=>{
    // props.ovenTemp
    // props.cookTime
    // props.editing
    // props.setState
    
    // setState on these refers to PARENT
    // (which is the main recipe object)
    const handleOvenTemp=(e)=>{
        const newTemp = e.target.value.trim();
        props.setState({ ovenTemp: newTemp });
    }
    const handleCookTime=(e)=>{
        const newTime = e.target.value.trim();
        props.setState({ cookTime: newTime });
    }
    return(
        <div className="row recipe-info">

            { // If ovenTemp set OR are editing
                (props.ovenTemp || props.editing) &&
                <OvenTemp 
                onChange={handleOvenTemp}
                editing={props.editing}
                ovenTemp={props.ovenTemp}
              />
            }
            
            { // Cook time
                (props.ovenTemp || props.editing) &&
                <CookTime 
                cookTime={props.cookTime}
                editing={props.editing}
                inChange={handleCookTime}        
                />
            }

            
        </div>
    )
}