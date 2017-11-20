import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import SwitchUserTypeBtn from './switch-user-type-btn/switch-user-type-btn.component';
import './login-type-btns.style.css';
export default (props)=>{
    // props.newUser
    // props.switchType()
    
    return(
        <div className="other-options-wrapper">
            <Dropdown 
            open={!props.newUser}>
                <SwitchUserTypeBtn
                onClick={props.switchType} >
                    New user
                </SwitchUserTypeBtn>
            </Dropdown>

            <Dropdown 
            open={props.newUser}>
                <SwitchUserTypeBtn
                onClick={props.switchType} >
                    Already have an account 
                </SwitchUserTypeBtn>
            </Dropdown>
        </div>
    )
}