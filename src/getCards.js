import React, { Component } from 'react';
import DisplayCard from './displayCard'

class TrelloGetCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        }
    }
    openCard=()=>{
        this.setState({
            showPopup: !this.state.showPopup
        })
    }
    render() {
        // console.log(this.props.cardData)
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
                cardId={this.props.cardData.id}
                cardName={this.props.cardData.name}
                checkListIds={this.props.cardData.idChecklists}
                closeWindow ={this.openCard}
              />
            : null
        }

        </div>
    )
    }
}
export default TrelloGetCards