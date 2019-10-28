import React, { Component } from 'react';
import Data from '../Data/Data.js'
import { Button } from '../../node_modules/reactstrap'
const fs = require('fs')
var jsonData = require('../Data/Data.json')


class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            last_four: this.props.last_four,
            brand: this.props.brand,
            expired_at: this.props.expired_at,
            form_val: true,
            user_id: parseInt(localStorage.getItem('crt_user_id')),
            cardMode: this.props.cardMode
        }

        this.assignValue = this.assignValue.bind(this);
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
            if (elements[i].type === "text" && elements[i].className === "add") {
                elements[i].value = "";
            }
        }
    }

    isFormValid = () => {
            const { last_four, brand } = this.state
            if (last_four.length === 4 && brand.length > 0) {
                this.setState({ form_val: false });
            }
        
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        this.isFormValid()

    }
      
    modify = () => {
        this.setState({ cardMode: "modify" })
    }
    delete = () => {
        console.log("Deleting card")
        this.props.delete(this.state)
    }
    add = () => {
        console.log("adding card / child")
        this.props.add(this.state)
    }
    save = () => {
        console.log("saving modified card / child")
        console.log(this.state.expired_at)
        this.props.save(this.state)
        this.setState({ cardMode: 'display' })

    }


    display() {
        if (this.state.cardMode === "add") {
            return (
                <div className="col">
                    <div className="row">
                        <input className="add" type="text" value={this.state.last_four} onChange={this.handleChange} name="last_four" placeholder="Last 4 number of Card"></input>
                    </div>
                    <div className="row">
                        <input className="add" type="text" value={this.state.brand} onChange={this.handleChange} name="brand" placeholder="Card Type"></input>
                    </div>
                    <div>
                        <input type="month"   name="expired_at" min="2019-10" value={this.state.expired_at} onChange={this.handleChange} />
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
                    <div>
                        <input type="month"   name="expired_at" min="2019-10" value={this.state.expired_at} onChange={this.handleChange} />
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
                    <div>
                        <input type="month"   name="expired_at" min="2019-10" value={this.state.expired_at} onChange={this.handleChange} readOnly />
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