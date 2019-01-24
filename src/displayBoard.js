import React from 'react';
import GetList from './getLists'

const TrelloDisplayBoard = props => {
        return (
            <div className='trello-board'>
                <p className='trello-board-name'>{props.boardName}</p>
                <div className='trello-board-lists'>
                {
                    props.lists.map(list =>{
                        return  <GetList
                                    lists={props.lists}
                                    cards={props.cards}
                                    listData={list}
                                />
                    })
                }
                            
                </div>
            </div>
        );
}

export default TrelloDisplayBoard
