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

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    makeChanges () {
        this.setState({ modeAcc: "modify" })
        console.log('mode acc :',this.state.modeAcc)
      
    }

    saveModif(){
        
    }

    loadData() {

        var crt_acc = jsonData.accounts.filter(function (acc) {
            return acc.id === parseInt(localStorage.getItem('crt_user_id'))
        });
        console.log('Account is :', crt_acc[0])

        var crt_wall = jsonData.wallets.filter(function (wall) {
            return wall.id === parseInt(localStorage.getItem('crt_user_id'))
        });
        console.log('Wallet is :', crt_wall[0])



        this.setState({
            first_name: crt_acc[0].first_name,
            last_name: crt_acc[0].last_name,
            email: crt_acc[0].email,
            password: crt_acc[0].password,
            balance: crt_wall[0].balance
        })

        console.log(this.state)



    }

    changeInformation() {


    }


    display(){
       
 
             if(this.state.modeAcc==="modify"){
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
                                 <Button color="primary" title="Sign-up" name="form_val"  onClick={this.saveModif} >Enregistrer les modifications</Button>{' '}
                             </div>
                         </div>
                
                 )
             }
             else if (this.state.modeAcc==="display"){
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
                                 <Button color="primary" title="Sign-up"  onClick={this.makeChanges} >Modifier mes informations</Button>{' '}
                             </div>
                         </div>
                 
                 )
             }
            
    }

    render() {
        return(
            <div>
                {this.display()}
            </div>
        )
      
        
    }



}

export default Account;
