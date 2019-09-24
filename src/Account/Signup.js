import React, { Component } from 'react';
import Accounts from '../Data/Data.js'
import { Button } from '../../node_modules/reactstrap'


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            form_val: true
        }
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }



    isFormValid = () => {
        const { first_name, last_name, email, password } = this.state
        if (first_name.length > 0 && last_name.length > 0 && email.length > 0 && password.length > 0) {
            this.setState({ form_val: false });
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        this.isFormValid()
    }

    signup() {
        console.log('signingup')
        //checkEmpty();

        let crt_acc = {
            id: Accounts.length,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            is_admin: 'false'
        }
        Accounts.push(crt_acc);
        console.log(Accounts)


    }

    render() {
        return (
            <div className="col">
                <div className="row">
                    <input type="text" value={this.state.first_name} onChange={this.handleChange} name="first_name" placeholder="First Name"></input>
                </div>
                <div className="row">
                    <input type="text" value={this.state.last_name} onChange={this.handleChange} name="last_name" placeholder="Last Name"></input>
                </div>
                <div className="row">
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email"></input>
                </div>
                <div className="row">
                    <input type="text" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password" ></input>
                </div>
                <div className="row">
                    <Button color="primary" title="Sign-up" name="form_val" onChange={this.handleChange} onClick={this.signup} disabled={this.state.form_val}>Sign-Up</Button>{' '}
                </div>
            </div>
        )
    }
}

export default Signup