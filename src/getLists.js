import React, { Component } from 'react';
import GetCard from './getCards'
import Fetch from "./fetchAPICalls";

class TrelloGetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card:'',
            cards:[]
        }
    }
    componentDidMount(){
        this.getAllCardsInList(this.props.listData.id)
    }
    getCard = (e) => {
        this.setState({
            card:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault()
        this.createNewCard(this.state.card,this.props.listData.id)
        this.setState({card:''})
    }
    getAllCardsInList = id => {
        Fetch.getAllCardsInListFetch(id).then(cardInList =>
            this.setState({
                cards: cardInList
            })
        )
    }
    createNewCard = (value, listId) => {
        if(value!== ''){
            Fetch.createNewCardFetch(value,listId).then(card => {
              this.setState({
                cards:[...this.state.cards,card]
              })
            });
        }
      };
    DeleteCard =id =>{
        Fetch.DeleteCardFetch(id).then(_ => {
            let cardData = this.state.cards.filter(card => card.id !== id)
            this.setState({
                cards:cardData
            })
        });
    }
    render() {
        return(
            <div className='trello-board-list'>
            <div className='trello-board-list-title'>
                <span>{this.props.listData.name}</span>
                <span className='trello-board-delete-list' onClick={()=>(this.props.archiveList(this.props.listData.id))}>&times;</span>
            </div>
            {
                this.state.cards.map(card =>
                    <GetCard 
                        key={card.id}
                        listId={this.props.listData.id} 
                        cardData={card}
                        DeleteCard={this.DeleteCard}
                    />
                )
            }
            <form className='trello-board-list-form' onSubmit={this.onSubmit}>
                <input  placeholder='Create new Card'
                        value={this.state.card}  
                        type='text'
                        onChange={this.getCard} 
                ></input>
                <button>Submit</button>
            </form>
            </div>
        )
    }
}
export default TrelloGetList




