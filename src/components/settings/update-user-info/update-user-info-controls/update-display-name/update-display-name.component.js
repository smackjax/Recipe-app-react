import React from 'react';
import { updateDisplayName } from '../../../../../_data/serverData';
import UpdateMessage from '../../../_update-message/update-message.component';
import DisplayNameFormInput from '../../../../_inputs/display-name/display-name-form-input.component';

export default class UpdateDisplayName extends React.Component {
    // props.password
    // props.token
    // props.onSuccess
    // props.placeholder

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
        const newDisplayName = e.target.displayName.value;
        e.preventDefault();
        try {
            await updateDisplayName(
                this.props.token,
                this.props.password, 
                newDisplayName 
            );
            this.updateResult(true);
            this.props.onSuccess(newDisplayName);
        } catch (err){
            console.log(err);
            this.updateResult(false);
        }
    }


    render(){
        // Makes input reset on change attempt
        const DisplayNameInput = ()=>(
            <DisplayNameFormInput
            placeholder={this.props.placeholder}
            name="displayName"
            onSubmit={this.handleSubmit.bind(this)}
            />
        )

        return (
        <div className="container-fluid mt-3">
            <DisplayNameInput />

            <UpdateMessage 
            attempting={this.state.attempting}
            updateSuccess={this.state.updateSuccess} />
        </div>        
        )
    }
}
