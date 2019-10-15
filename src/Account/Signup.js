import React, { Component } from 'react';
import { Button } from '../../node_modules/reactstrap'
import { Redirect } from 'react-router-dom';
var jsonData = require('../Data/Data.json')


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

    cleanForm = () => {
        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type === "text") {
                elements[i].value = "";
            }
        }
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

        let crt_acc = {
            id: jsonData['accounts'].length,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            is_admin: 'false'
        }
        //NEED TO ADD TO FILE
        this.cleanForm();
        localStorage.setItem('logged', true);
        localStorage.setItem('crt_user_id', crt_acc.id);
        console.log('Succesfully added account | user id:',localStorage.getItem('crt_user_id'));
        window.location.reload(true)
    }

    render() {
        if (localStorage.getItem('logged')) {
            return (
                <Redirect to={'/'} />
            )
        }
        else {
            return (
                <form>
                    <div className="col " id="form">
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
                </form>
            )
        }
    }
}

export default Signup