import React, { Component } from 'react';
import GetCard from './getCards'
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
        fetch(
          `https://api.trello.com/1/lists/${id}/cards?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => res.json())
        .then(cardInList =>
            this.setState({
                cards: cardInList
            })
        )
    }
    createNewCard = (value, listId) => {
        if(value!== ''){
    
          let bodyData = {
            name: value,
            idList: listId
          };
          fetch(
            `https://api.trello.com/1/cards?keepFromSource=all&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(bodyData)
            }
          )
            .then(res => res.json())
            .then(card => {
              this.setState({
                cards:[...this.state.cards,card]
              })
            });
        }
      };
      DeleteCard =id =>{
        fetch(
            `https://api.trello.com/1/cards/${id}?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
            }
          )
            .then(res => res.json())
            .then(card => {
                let cardData = this.state.cards
                cardData = cardData.filter(card => card.id !== id)
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
                        listId={this.props.listData.id} 
                        cardData={card}
                        DeleteCard={this.DeleteCard}
                    />
                )
            }
            <form onSubmit={this.onSubmit}>
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




