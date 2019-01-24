import React from 'react';

const TrelloSelectBoard = props => {
        return (
            <div onClick={() =>{props.DisplayBoardOnSelect(props.boardId)}} className='trello-home-board'>
                <p>{props.boardName}</p>
            </div>
        );
}

export default TrelloSelectBoard