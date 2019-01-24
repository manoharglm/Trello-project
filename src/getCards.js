import React from 'react';
const TrelloGetCards = props => {
    return(
        <div className='trello-board-cards'>
        {
            (props.cardData.idList === props.listId)
            ? <p>{props.cardData.name}</p>
            : ''
        }
        </div>
    )
}
export default TrelloGetCards




