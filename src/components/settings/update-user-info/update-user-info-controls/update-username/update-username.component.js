import React from 'react';
import { updateUsername } from '../../../../../_data/data';
import UpdateMessage from '../../../_update-message/update-message.component';
import UsernameStandalone from '../../../../_inputs/username/username-standalone.component'

export default class UpdateUsername extends React.Component{
    // props.password
    // props.token
    // props.onSuccess
    // props.placeholder
    state={
        attempting: null,
        updateSuccess: null
    }

    async handleSubmit(e){
        e.preventDefault()
        const newUsername = e.target.username.value;
        this.setState({
            attempting: true
        });
        try{
            await updateUsername(
                this.props.token, 
                this.props.password, 
                newUsername
            );
            this.setState({
                attempting: false, 
                updateSuccess: true
            })
            if(this.props.onSuccess){
                this.props.onSuccess(newUsername);
            }
        } catch (e){
            this.setState({
                attempting: false, 
                updateSuccess: false
            })
        }
    }

    render(){
        // Using this to reset everything after each submit
        const UsernameFormInput = ()=>(
            <UsernameStandalone
            checkUsername={true}
            name="username"
            placeholder={this.props.placeholder}
            onSubmit={this.handleSubmit.bind(this)}
            />
        )

        return (
            <div className="container-fluid">
                <UsernameFormInput />
                <UpdateMessage 
                attempting={this.state.attempting}
                updateSuccess={this.state.updateSuccess}
                />
            </div>
        )
    }
    
}