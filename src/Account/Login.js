import React, { Component } from 'react';
import { Button } from '../../node_modules/reactstrap'
import {Link, Redirect } from 'react-router-dom';
var jsonData = require('../Data/Data.json')


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
        this.connect = this.connect.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.fastLogin = this.fastLogin.bind(this)
        this.fastLogout = this.fastLogout.bind(this)
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    async  fastLogin() {
        console.log("Before login test, current logged state : ", localStorage.getItem('logged'))

        localStorage.setItem('logged', true)
        localStorage.setItem('crt_user_id', '1')

        window.location.reload(true);

        console.log("After login test, current logged state : ", localStorage.getItem('logged'))
        this.setState({ redirect: true })

    }

    fastLogout() {
        localStorage.clear()
        console.log("After logout current logged state : ", localStorage.getItem('logged'))
        if (localStorage.getItem('logged') === false) {
            console.log("loffed out")
        }
        window.location.reload(true)
    }

    connect() {
        let accounts = jsonData['accounts']
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].email === this.state.email) {
                if (accounts[i].password === this.state.password) {
                    localStorage.setItem('crt_user_id', accounts[i].id);
                    localStorage.setItem('logged',true);
                    console.log('Signup succesful, id :',localStorage.getItem('crt_user_id'));
                    window.location.reload(true)
                    break;
                }
            }
        }
    }


    render() {
        if (localStorage.getItem('logged')) {
            return (
                <Redirect to={'/'} />
            )
        }
        else {

            return (
                <div className="col">
                    <div className="row">
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email"></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password"></input>
                    </div>
                    <div className="row">
                        <Button color="danger" title="Login test" onClick={this.connect} >Login</Button>
                    </div>

                    <Link to="/" ><Button color="danger" title="Login test" onClick={this.fastLogin} >Login Test</Button></Link>    
                </div>

            )
        }

    }

}

export default Login
