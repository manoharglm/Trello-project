import React, { Component } from 'react';
import GetCard from './getCards'
class TrelloGetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card:'',
            cards:this.props.cards
        }
    }
    getCard = (e) => {
        this.setState({
            card:e.target.value
        })
    }
    createNewCard = (value, listId) => {
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
      };
    onSubmit=(e)=>{
        e.preventDefault()
        this.createNewCard(this.state.card,this.props.listData.id)
        this.setState({card:''})
    }
    render() {
        console.log("rendered")
        return(
            <div className='trello-board-list'>
            <p>{this.props.listData.name}</p>
            {
                this.props.cards.map(card =>
                    <GetCard listId={this.props.listData.id} cardData={card}/>
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




