import React from 'react';
import { updateEmail } from '../../../../../_data/data';

import EmailFormInput from '../../../../_inputs/email/email-form-input.component';
import UpdateMessage from '../../../_update-message/update-message.component';


export default class UpdateUserEmailBlock extends React.Component{
    // props.password
    // props.token
    // props.password
    // onSuccess
    
    state={
        attempting: null,
        updateSuccess: null
    }

    updateResult(result){
        this.setState({
            attempting: false,
            updateSuccess: result
        })
    }

    async handleSubmit(e){
        const newEmail = e.target.email.value;
        e.preventDefault();
        try {
            await updateEmail(
                this.props.token,
                this.props.password,
                newEmail
            );
            this.updateResult(true);
            this.props.onSuccess(newEmail);
        } catch (err){
            console.log(err);
            this.updateResult(false);
        }
    }


    render(){
        // Makes input reset on update attempt
        const EmailInput = ()=>(
            <EmailFormInput
            placeholder={this.props.placeholder}
            name="email"
            required
            onSubmit={this.handleSubmit.bind(this)}
            />
        )

        return (
        <div className="container-fluid mt-3">
            <EmailInput />

            <UpdateMessage 
            attempting={this.state.attempting}
            updateSuccess={this.state.updateSuccess} />
        </div>        
        )
    }
}