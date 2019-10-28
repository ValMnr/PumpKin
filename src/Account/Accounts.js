import React, { Component } from 'react';
import Data from '../Data/Data.js'
import { Button } from '../../node_modules/reactstrap'
import { Redirect } from 'react-router-dom';

const fs = require('fs')
var jsonData = require('../Data/Data.json')


class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crt_user_id: localStorage.getItem('crt_user_id'),
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            modeAcc: this.props.mode,
            balance: 0
        }

        this.makeChanges = this.makeChanges.bind(this);

    }

    componentDidMount() {
        this.loadData()
        //this.setState({modeAcc:"display"})
    }
    componentDidUpdate() {
        console.log("post update, state ->", this.state)
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    makeChanges() {
        this.setState({ modeAcc: "modify" })
        console.log('mode acc :', this.state.modeAcc)

    }

    saveModif = () => {
        console.log(this.state)

        this.setState({ modeAcc: "display" })


        let crt_user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            balance: this.state.balance
        }
        localStorage.setItem('user_info', JSON.stringify(crt_user))
        localStorage.setItem('user_balance', this.state.balance)
    }

    loadData = () => {

        let crt_user_info = JSON.parse(localStorage.getItem('user_info'))
        console.log("TESTEST", crt_user_info.first_name)
        this.setState({
            first_name: crt_user_info.first_name,
            last_name: crt_user_info.last_name,
            email: crt_user_info.email,
            password: crt_user_info.password,
            balance: localStorage.getItem('user_balance')
        })
        console.log(this.state)
    }

    changeInformation() {


    }


    display() {


        if (this.state.modeAcc === "modify") {
            console.log("Modify mode")

            return (

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
                        <Button color="primary" title="Sign-up" name="form_val" onClick={this.saveModif} >Enregistrer les modifications</Button>{' '}
                    </div>
                </div>

            )
        }
        else if (this.state.modeAcc === "display") {
            console.log("dipslpay mode")

            return (

                <div className="col " id="form">
                    <div className="row">
                        <input type="text" value={this.state.first_name} onChange={this.handleChange} name="first_name" placeholder="First Name" readOnly></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.last_name} onChange={this.handleChange} name="last_name" placeholder="Last Name" readOnly></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email" readOnly></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password" readOnly></input>
                    </div>
                    <div className="row">
                        <Button color="primary" title="Sign-up" onClick={this.makeChanges} >Modifier mes informations</Button>{' '}
                    </div>
                </div>

            )
        }

    }

    getBalance() {
        let crt_balance = this.state.balance.toString()
        let entier = crt_balance.slice(0, -2);
        let cent = crt_balance.substring(crt_balance.length - 2);
        console.log("crt balance", this.state.balance, "|", entier, ",", cent);
        let balance = entier + "," + cent
        return balance
    }

    render() {
        return (
            <div>
                <h1>Current balance is : {this.getBalance()} €</h1>

                {this.display()}
            </div>
        )


    }



}

export default Account;
