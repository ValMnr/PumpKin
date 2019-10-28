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

class Payin extends Component {
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

    paiment() {
        this.get_selected();
        console.log(this.state.selected_card);
        let add_payins = {
            id: Data.Payins.length,
            wallet_id: parseInt(localStorage.getItem('crt_user_id'), 10) ,
            amount: parseInt(this.state.amount, 10)
        }
        jsonData.payins.push(add_payins);
        
        console.log(jsonData.payins);
        
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

    render() {
        return (
            
            <div className="col">
                <text class="title">Payins</text>
                <Col sm="12" md={{ size: 6, offset: 3 }}><div className="row" >
                    <Col sm={{ size: 'auto', offset: 1 }}>{this.displayCards_option()}</Col>
                    <Col sm={{ size: 'auto', offset: 1 }}><input type="text" value ={this.state.amount} onChange={this.handleChange}  name="amount" placeholder="Amount"></input></Col>   
                    <Col sm={{ size: 'auto', offset: 1 }}><Button color="primary" title="Transfer" onChange={this.handleChange}  onClick={this.paiment} name="transfert" /*disabled={this.state.form_val}*/ >Transfert</Button></Col>
                </div></Col>
            </div>
        )
    }

}

export default Payin
