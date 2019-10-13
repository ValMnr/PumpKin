import React, { Component } from 'react';
import Data from '../Data/Data.js'
import { Button } from '../../node_modules/reactstrap'
var jsonData = require('../Data/Data.json');
var fs = require("browserify-fs");

class Transfert extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: '',
            recipient: '',
            form_val:true
            
        }
        this.transfert = this.transfert.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    isFormValid = () => {
        const { amount,recipient     } = this.state
        if (amount.length > 0 && recipient.length > 0 ) {
            this.setState({ form_val: false });
        }
    }

    cleanForm = () => {
        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type === "text" && elements[i].className==="add" ){
                elements[i].value = "";
            }
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        this.isFormValid();
    }

    transfert() {
        let add_transfer = {
            id: Data.Transfers.length,
            debited_wallet_id: parseInt(sessionStorage.getItem('crt_user_id'), 10) ,
            credited_wallet_id:  parseInt(this.state.recipient, 10),
            amount: parseInt(this.state.amount, 10)
        }
        jsonData.transfers.push(add_transfer);
        console.log("In transfert");
        console.log(jsonData.transfers);/*
        var json = JSON.stringify(add_transfer);
        fs.writeFile("../Data/Data.json", json, (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });*/
        
        this.cleanForm();

    }

    render() {
        return (
            <div className="col">
                <div className="row">
                    <input type="text" value={this.state.recipient} onChange={this.handleChange} name="recipient" placeholder="Recipient"></input>
                    <input type="text" value ={this.state.amount} onChange={this.handleChange}  name="amount" placeholder="Amount"></input>
                </div>
                <div className="row">
                <Button color="primary" title="Transfer" onChange={this.handleChange}  onClick={this.transfert} name="transfert" disabled={this.state.form_val} >Transfert</Button>
                </div>
            </div>
        )
    }

}

export default Transfert
