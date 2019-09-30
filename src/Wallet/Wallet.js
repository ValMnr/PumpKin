import React, { Component } from 'react';
import Data from '../Data/Data.js'
import Card from '../Card/Card.js'
import { Button } from '../../node_modules/reactstrap'


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCard: this.getCards(),
            addCard: false

        };

        this.getCards = this.getCards.bind(this)
        this.addCardComp = this.addCardComp.bind(this)
        this.deleteCardComp = this.deleteCardComp.bind(this)

        this.addCard = this.addCard.bind(this)
    }


    componentDidMount() {
        try {
            //this.fillCards()
            console.log('list card:', this.state.listCard)
        }
        catch (e) {
            alert(e);
        }

    }

    addCard(){
        this.setState({addCard:true})
    }

    addCardComp() {
        return (
            <div><li>
                <Card cardMode="add" id='' last_four='' brand='' expired_at='' onChange={this.deleteCardComp} />
            </li></div>
        )

    }
    deleteCardComp(){
        this.setState({addCard:false})
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

    displayCards() {
        let crtList = this.state.listCard.map((card, index) =>
            <li key={index}>
                <Card cardMode="display" id={card.id} last_four={card.last_four} brand={card.brand} expired_at={card.expired_at} />
            </li>
        );
        return (<ul>{crtList}
            {this.state.addCard ? this.addCardComp() : null}
        </ul>);

    }

    render() {

        return (


        <div className="">
            {this.displayCards()}

            <Button color="primary" title="Add Card" name="addCard" onChange={this.handleChange} onClick={this.addCard} >Modify</Button>{ ' ' }


        </div>
        );

    };

}

export default Wallet