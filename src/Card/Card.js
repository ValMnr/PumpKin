import React, { Component } from 'react';
import Cards from '../Data/Data.js'
import { Button } from '../../node_modules/reactstrap'
import Login from '../Account/Login.js'


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last_four: '',
            brand:'',
            expired_at:'',
            form_val:true
        }
        this.addCard = this.addCard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }



    isFormValid = () => {
        const { last_four, brand, expired_at } = this.state      
        if (last_four.length == 16 && brand.length > 0 && expired_at.length > 0) {
            this.setState({ form_val: false });
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        this.isFormValid()
    }
    addCard() {
        console.log('addin card')
        let crt_card = {
            id: Cards.length,
            last_four: this.state.last_four.substr(this.state.last_four.length - 4),
            brand: this.state.brand,
            user_id: sessionStorage.getItem('crt_user_id')
        }
        Cards.push(crt_card);
        console.log(Cards)
    }

    render() {
        return (
            <div className="col">
                <div className="row">
                    <input type="text" value={this.state.last_four} onChange={this.handleChange} name="last_four" placeholder="Card Number"></input>
                </div>
                <div className="row">
                    <input type="text" value={this.state.brand} onChange={this.handleChange} name="brand" placeholder="Card Type"></input>
                </div>
                <div className="row">
                    <input type="text" value={this.state.expired_at} onChange={this.handleChange} name="expired_at" placeholder="Expiring on"></input>
                </div>
                <div className="row">
                    <Button color="primary" title="Add Card" name="form_val" onChange={this.handleChange} onClick={this.addCard} disabled={this.state.form_val}>Sign-Up</Button>{' '}
                </div>
            </div>
        )
    }
}

export default Card