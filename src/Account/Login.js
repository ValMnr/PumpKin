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

    loadLocalStorage=()=>{
            
        var cardList = jsonData.cards.filter(function (card) {
            return card.user_id === parseInt(localStorage.getItem('crt_user_id'))
        });
        
        localStorage.setItem("user_cards", JSON.stringify(cardList))


        var crt_acc = jsonData.accounts.filter(function (acc) {
            return acc.id === parseInt(localStorage.getItem('crt_user_id'))
        });
        console.log('Account is :', crt_acc[0])


        var crt_wall = jsonData.wallets.filter(function (wall) {
            return wall.id === parseInt(localStorage.getItem('crt_user_id'))
        });
        console.log('Wallet is :', crt_wall[0])

        
        let crt_user = {
            first_name: crt_acc[0].first_name,
            last_name: crt_acc[0].last_name,
            email: crt_acc[0].email,
            password: crt_acc[0].password,
            balance: crt_wall[0].balance
        }
        localStorage.setItem("user_info", JSON.stringify(crt_user))
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

        this.loadLocalStorage();

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
