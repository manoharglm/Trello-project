import React, { Component } from 'react';
import DisplayCard from './displayCard'

class TrelloGetCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card:'',
            showPopup: false
        }
    }
    openCard=()=>{
        this.setState({
            showPopup: !this.state.showPopup
        })
        if(this.props.cardData.idChecklists.length){
            fetch(
                `https://api.trello.com/1/checklists/${this.props.cardData.idChecklists[0]}?fields=name&cards=all&card_fields=name&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              ).then(res => res.json())
               .then(checkListData=>{
                    this.setState({
                        card:checkListData.checkItems,
                    })
               })
        }
    }
    render() {
    return(
        <div className='trello-board-cards'>
        {
            (this.props.cardData.idList === this.props.listId)
            ?   <div className='trello-board-list-card-content'>
                    <p onClick={this.openCard}>{this.props.cardData.name}</p>
                    <span onClick={()=>(this.props.DeleteCard(this.props.cardData.id))}>&times;</span>
                </div>
            : null
        }
        {
            (this.state.showPopup)
            ? <DisplayCard
                cardData={this.state.card}
                closeWindow ={this.openCard}
              />
            : null
        }

        </div>
    )
    }
}
export default TrelloGetCards