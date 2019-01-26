import React, { Component } from 'react';
import GetCard from './getCards'
class TrelloGetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card:'',
        }
    }
    getCard = (e) => {
        this.setState({
            card:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault()
        this.props.createNewCard(this.state.card,this.props.listData.id)
        this.setState({card:''})
    }
    //https://api.trello.com/1/lists/5c4af8461e3ae476dad7341c/closed?value=true&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b
    archiveList=() =>{
        fetch(
            `https://api.trello.com/1/lists/${this.props.listData.id}/closed?value=true&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
            .then(res => res.json())
            .then(list => {
                this.props.updateList(list,false)
            });
    }
    render() {
        return(
            <div className='trello-board-list'>
            <div className='trello-board-list-title'>
                <span>{this.props.listData.name}</span>
                <span className='trello-board-delete-list' onClick={this.archiveList}>&times;</span>
            </div>
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




