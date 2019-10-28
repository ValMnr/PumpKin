import React, { Component } from 'react';
import Data from '../Data/Data.js'
import Card from '../Card/Card.js'
import { Button } from '../../node_modules/reactstrap'
var jsonData = require('../Data/Data.json')


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCard: [],
            addCard: false
        };

        this.addCardComp = this.addCardComp.bind(this)
        this.addCard = this.addCard.bind(this)
        this.onModifyCard = this.onModifyCard.bind(this)
    }

    addCard() {
        this.setState({ addCard: true })
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

    loadCards() {
        this.setState({ listCard: JSON.parse(localStorage.getItem("user_cards")) })
    }

    onDeleteCard = crt_card => {
        const items = this.state.listCard.filter(item =>
            item['id'] !== crt_card.id);
        this.setState({ listCard: items });
        localStorage.setItem('user_cards', JSON.stringify(items))
        console.log("post delete", localStorage.getItem('user_cards'))

    }

    onAddCard = crt_card => {
        console.log("adding card")
        let addedCard = {
            "id": jsonData['cards'].length,
            "last_four": parseInt(crt_card.last_four),
            "brand": crt_card.brand,
            "expired_at": crt_card.expired_at,
            "user_id": parseInt(localStorage.getItem('crt_user_id'))
        }
        let newList = this.state.listCard;
        newList.push(addedCard)
        this.setState({
            listCard: newList,
            addCard: false
        })
        localStorage.setItem('user_cards', JSON.stringify(newList))
    }

    onModifyCard = crt_card => {
        let newList = this.state.listCard;
        let modifiedCard = {
            "id": crt_card.id,
            "last_four": parseInt(crt_card.last_four),
            "brand": crt_card.brand,
            "expired_at": crt_card.expired_at,
            "user_id": parseInt(localStorage.getItem('crt_user_id'))
        }
        for (var i in newList) {
            if (newList[i].id === crt_card.id) {
                newList[i] = modifiedCard;
                break;
            }
        }
        console.log("modified card list",newList)
        this.setState({ listCard: newList })
        localStorage.setItem('user_cards', JSON.stringify(newList))
    }

    addCardComp() {
        return (
            <div><li>
                <Card cardMode="add" add={this.onAddCard} id='' last_four='' brand='' expired_at='' onChange={this.deleteCardComp} action={this.removeAddCard} />
            </li></div>
        )
    }




    displayCards = () => {
        let dispList = this.state.listCard.map((card, index) =>
            <li key={index}>
                <Card save={this.onModifyCard} add={this.onAddCard} delete={this.onDeleteCard} cardMode="display" id={card.id} last_four={parseInt(card.last_four)} brand={card.brand} expired_at={card.expired_at} />
            </li>
        );
        return (<ul>{dispList}
            {this.state.addCard ? this.addCardComp() : null}
        </ul>);
    }

    render() {
        return (
            <div className="">
                {this.displayCards()}
                <Button color="primary" title="Add Card" name="addCard" onChange={this.handleChange} onClick={this.addCard} >Add Card</Button>{' '}
            </div>
        );
    };
}

export default Wallet

