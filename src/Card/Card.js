import React, { Component } from 'react';
import Data from '../Data/Data.js'
import { Button } from '../../node_modules/reactstrap'
import Wallet from '../Wallet/Wallet.js'

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            last_four: this.props.last_four,
            brand: this.props.brand,
            expired_at: this.props.expired_at,
            form_val: true,
            user_id:sessionStorage.getItem('crt_user_id'),
            cardMode: this.props.cardMode
        }

        this.assignValue = this.assignValue.bind(this);
        this.addCard = this.addCard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        //this.modify = this.modify.bind(this);
    }

    assignValue = () => {
        if (this.props.cardMode === "modify") {
            console.log("setting values")
            this.setState({
                id: this.props.cardId,
                last_four: Data.Cards[this.props.cardId].last_four,
                brand: Data.Cards[this.props.cardId].brand,
                expired_at: Data.Cards[this.props.cardId].expired_at,
                form_val: true
            });
            console.log(this.state.expired_at, this.state.brand)
        }
        else if (this.props.cardMode === "add") {
            console.log("setting state value to empty")
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

    isFormValid = () => {
        const { last_four, brand, expired_at } = this.state
        if (last_four.length > 10 && brand.length > 0 && expired_at.length > 0) {
            this.setState({ form_val: false });
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        this.isFormValid()
    }
    addCard() {
        
        //this.props.deleteCardComp()
        console.log('addin card')
        //sessionStorage.setItem('crt_user_id', 3)
        let crt_card = {
            id: Data.Cards.length,
            last_four: this.state.last_four.substr(this.state.last_four.length - 4),
            brand: this.state.brand,
            expired_at: this.state.expired_at,
            user_id: sessionStorage.getItem('crt_user_id')
        }
        Data.Cards.push(crt_card);
        console.log(Data.Cards);
        //this.props.addCard =false;
        this.cleanForm();
        
    }


    deleteCard() {
        console.log("Deleting Card");
        console.log(this.props)
        for (var i = 0; i < Data.Cards.length; i++) {
            if (Data.Cards[i] === parseInt(this.state.id)) {
                Data.Cards.splice(i, 1);
                console.log('Card deleted');
            }
        }
        console.log("Card deleted");

    }

    modify =()=>{
        //this.props.modify(this.state)
        this.setState({cardMode:"modify"})
    }
    delete =()=>{
        this.props.delete(this.state)
    }
    add =()=>{
        console.log("adding card / child")
        this.props.add(this.state)
    }
    save = () =>{
        console.log("saving modified card / child")
        this.props.save(this.state)
        this.setState({cardMode:'display'})

    }


    display() {
        if (this.state.cardMode === "add") {
            return (
                <div className="col">
                    <div className="row">
                        <input className="add" type="text" value={this.state.last_four} onChange={this.handleChange} name="last_four" placeholder="Card Number"></input>
                    </div>
                    <div className="row">
                        <input className="add" type="text" value={this.state.brand} onChange={this.handleChange} name="brand" placeholder="Card Type"></input>
                    </div>
                    <div className="row">
                        <input className="add" type="text" value={this.state.expired_at} onChange={this.handleChange} name="expired_at" placeholder="Expiring on"></input>
                    </div>
                    <div className="row">
                        <Button color="primary" title="Add Card" name="form_val" onChange={this.handleChange} onClick={this.add} disabled={this.state.form_val}>Save</Button>{' '}
                    </div>
                </div>
            )
        }
        else if (this.state.cardMode === "modify") {
            return (
                <div className="col">
                    <div className="row">
                        <input type="text" value={this.state.last_four} onChange={this.handleChange} name="last_four" placeholder={this.state.last_four}></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.brand} onChange={this.handleChange} name="brand" placeholder={this.state.brand}></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.expired_at} onChange={this.handleChange} name="expired_at" placeholder={this.state.expired_at}></input>
                    </div>
                    <div className="row">
                        <Button color="primary" title="Modify Card" name="form_val" onChange={this.handleChange} onClick={this.save} disabled={this.state.form_val}>Save</Button>{' '}
                    </div>
                </div>
            )
        }
        else if (this.state.cardMode === "display") {
            return (
                <div className="col">
                    <div className="row">
                        <input type="text" value={this.state.last_four} onChange={this.handleChange} name="last_four" readOnly></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.brand} onChange={this.handleChange} name="brand" readOnly></input>
                    </div>
                    <div className="row">
                        <input type="text" value={this.state.expired_at} onChange={this.handleChange} name="expired_at" readOnly ></input>
                    </div>
                    <div className="row">
                        <Button color="primary" title="Modify Card" name="form_val" onChange={this.handleChange} onClick={this.modify} >Modify</Button>{' '}
                    </div>
                    <div className="row">
                        <Button color="danger" title="Delete Card" name="form_val" onChange={this.handleChange} onClick={this.delete} >Delete</Button>{' '}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>{this.display()}</div>
        )
    }
}

export default Card