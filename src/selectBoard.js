import React from 'react';

const TrelloSelectBoard = props => {
        return (
            <div 
                onClick={() =>{props.getBoardOnSelect(props.boardId)}} 
                className='trello-home-board'
                style={{ 
                    backgroundImage: `url(${props.background.backgroundImage})`, 
                    backgroundColor: `${props.background.backgroundColor}`,
                    backgroundSize: 'cover'
                }}
            >
                <h4>{props.boardName}</h4>
            </div>
        );
}

export default TrelloSelectBoard