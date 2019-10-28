import React, { Component } from 'react';
import Data from '../Data/Data.js';
import '../index.css';
import Card from '../Card/Card';
//import React from 'react';
import Cards from 'react-credit-cards';
import { Button,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from '../../node_modules/reactstrap'
import { Container, Row, Col } from 'reactstrap';
var jsonData = require('../Data/Data.json');
var fs = require("browserify-fs");

class Payout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: '',
            recipient: '',
            form_val:true,
            dropdownOpen: false, 
            prevState: '',
            listCard: [],
            selected_card: ''
        }
        this.paiment = this.paiment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.displayCards = this.displayCards.bind(this);
        this.displayCards_option = this.displayCards_option.bind(this);
        this.get_selected = this.get_selected.bind(this);
        this.get_value_input = this.get_value_input.bind(this);

        this.clear = this.clear.bind(this);

    }

    componentDidMount() {
        try {
            console.log("Loading cards")
            this.loadCards()
        }
        catch (e) {
            alert(e);
        }

    }

    isFormValid = () => {
        const { amount,recipient } = this.state
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
    clear = () => {
        var elements = document.getElementById("amount_trans");
        elements.value = "";
        this.state.first = true;
        
    }

    paiment() {
        this.get_selected();
        console.log(this.state.selected_card);
        let add_payouts = {
            id: Data.Payouts.length,
            wallet_id: parseInt(localStorage.getItem('crt_user_id'), 10) ,
            amount: parseInt(this.state.amount*100, 10)
        }
        jsonData.payouts.push(add_payouts);
        
        console.log(jsonData.payouts);
        var new_balance = parseInt(localStorage.getItem('user_balance'))- parseInt(this.state.amount*100)
        localStorage.setItem('user_balance',new_balance)
        console.log("new balance is ",new_balance)
        
        this.cleanForm();

    }
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
      loadCards() {
        console.log(localStorage.getItem('crt_user_id'));
       // console.log(parseInt(localStorage.getItem('crt_user_id'), 10));
        var newList = jsonData.cards.filter(function (card) {
            return card.user_id == parseInt(localStorage.getItem('crt_user_id'), 10);
        });
        console.log('new list is', newList)
        this.setState({ listCard: newList })
        console.log(this.listCard);
    }

    displayCards=()=> {
        let dispList = this.state.listCard.map((card, index) =>
        <div className="dispcards" >
            <li key={index}>
            <DropdownItem >
                    <text >{card.id}</text><br/>
                    <text>{card.expired_at}</text><br/>
                    <text>{card.last_four}</text>

               </DropdownItem>
            </li></div>
        );
        return (<ul>{dispList}
            {this.state.addCard ? this.addCardComp() : null}
        </ul>);

    }
    displayCards_option=()=> {
        let dispList = this.state.listCard.map((card, index) =>
            <option value={card.id}>
                    {card.id} {card.last_four}  {card.expired_at} 
                 </option>
        );
        return (<select id="selected_card"  onChange={this.handleChange}>{dispList}</select>);

    }
      
    get_selected()
    {
        var selector = document.getElementById('selected_card');
        var value = selector[selector.selectedIndex].value;
        this.state.selected_card = value
    }
    get_value_input(event)
    {
        var selector = document.getElementById('amount_trans');
        var value = selector.value;
        if(this.state.first)
           { value = value/1000;
            this.state.first = false;
           }
        var value_fixed = value*10;
        this.setState({ [event.target.name]: value_fixed.toFixed(2) })
        this.state.amount =  value_fixed.toFixed(2);
        console.log(this.state.amount);
    }

    render() {
        return (
            
            <div className="col">
                <text class="title">Payouts</text>
                <Col sm="12" md={{ size: 6, offset: 3 }}><div className="row" >
                    <Col sm={{ size: 'auto', offset: 1 }}>{this.displayCards_option()}</Col>
                    <Col sm={{ size: 'auto', offset: 1 }}><input type="text" id="amount_trans" value ={this.state.amount} onChange={this.get_value_input}  name="amount" placeholder="Amount"></input></Col>   
                    <Col sm={{ size: 'auto', offset: 1 }}><Button color="primary" title="Transfer" onChange={this.handleChange}  onClick={this.paiment} name="transfert" /*disabled={this.state.form_val}*/ >Transfert</Button></Col>
                    <Col sm={{ size: 'auto', offset: 1 }}><Button color="primary" title="Clear" onChange={this.handleChange}  onClick={this.clear} name="Clear" /*disabled={this.state.form_val}*/ >Clear</Button></Col>

                </div></Col>
            </div>
        )
    }

}

export default Payout