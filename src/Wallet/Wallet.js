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

        this.getCards = this.getCards.bind(this)
        this.addCardComp = this.addCardComp.bind(this)
        this.deleteCardComp = this.deleteCardComp.bind(this)
        this.removeAddCard = this.removeAddCard.bind(this);

        this.addCard = this.addCard.bind(this)

        this.onModifyCard = this.onModifyCard.bind(this)
        this.checkId = this.checkId.bind(this)
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
    componentDidUpdate() {
        console.log("post update", this.state.listCard)
    }

    loadCards() {
        var newList = jsonData.cards.filter(function (card) {
            return card.user_id == sessionStorage.getItem('crt_user_id')
        });
        console.log('new list is', newList)
        this.setState({ listCard: newList })

    }

    onDeleteCard = crt_card => { //PB sur la suppression

        let crt_id = crt_card.id
        console.log('crt_cart_id', crt_id)
        console.log("before delete", this.state.listCard)

        const items = this.state.listCard.filter(item =>
            item['id'] !== crt_id);

        console.log("after delete", items)
        this.setState({ listCard: items });

        delete jsonData['cards'][crt_card.id]
        console.log(crt_id)

    }

    onAddCard = crt_card => {
        console.log("adding card")

        let addedCard = {
            "id": jsonData['cards'].length,
            "last_four": crt_card.last_four,
            "brand": crt_card.brand,
            "expired_at": crt_card.expired_at,
            "user_id": sessionStorage.getItem('crt_user_id')
        }
        let newList = this.state.listCard;
        newList.push(addedCard)
        this.setState({
            listCard: newList,
            addCard: false
        })

    }

    onModifyCard = crt_card => {
        console.log("Modifying card")
        let newList = this.state.listCard;

        let modifiedCard = {
            "id": crt_card.id,
            "last_four": crt_card.last_four,
            "brand": crt_card.brand,
            "expired_at": crt_card.expired_at,
            "user_id": sessionStorage.getItem('crt_user_id')
        }

        for (var i in newList) {
            if (newList[i].id == crt_card.id) {
                newList[i] = modifiedCard;
                break;
            }
        }
        console.log(newList)
        this.setState({ listCard: newList })



    }



    addCard() {
        this.setState({ addCard: true })
        console.log(jsonData.accounts)
    }

    removeAddCard() {
        console.log("removing add card")
    }

    addCardComp() {
        return (
            <div><li>
                <Card cardMode="add" add={this.onAddCard} id='' last_four='' brand='' expired_at='' onChange={this.deleteCardComp} action={this.removeAddCard} />
            </li></div>
        )

    }
    deleteCardComp() {
        this.setState({ addCard: false })
    }

    getCards() {
        let Cards = []
        for (var i = 0; i < Data.Cards.length; i++) {
            if (parseInt(sessionStorage.getItem('crt_user_id')) === parseInt(Data.Cards[i].user_id)) {
                let crt_card = Data.Cards[i];
                Cards.push(crt_card);
                console.log('card added', crt_card)
            }
        }
        console.log(Cards)
        return Cards
    }

    checkId(card) {


    }

    displayCards() {

        console.log('crt list', this.state.listCard)
        let dispList = this.state.listCard.map((card, index) =>
            <li key={index}>
                <Card save={this.onModifyCard} add={this.onAddCard} delete={this.onDeleteCard} cardMode="display" id={card.id} last_four={card.last_four} brand={card.brand} expired_at={card.expired_at} />
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