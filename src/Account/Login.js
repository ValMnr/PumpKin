import React, { Component } from 'react';
import Accounts from '../Data/Data.js'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.connect = this.connect.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    connect() {
        for (let i = 0; i < Accounts.length; i++) {
            if (Accounts[i].email === this.state.email ) {
                if(Accounts[i].password===this.state.password){
                    sessionStorage.setItem('crt_user_id', Accounts[i].id);
                    console.log('Signup succesful');
                    break;
                }
            }
        }
    }


    render() {
        return (
            <div className="col">
                <div className="row">
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email"></input>
                </div>
                <div className="row">
                    <input type="text" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password"></input>
                </div>
                <div className="row">
                    <button name="Log-in" onClick={this.connect} ></button>
                </div>
            </div>
        )
    }

}

export default Login
