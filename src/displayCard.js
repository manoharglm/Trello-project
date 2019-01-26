import React from 'react';

const TrelloDisplayCard = props => {
    return (
        <div className='trello-card-window'>
            <div class="trello-card-window-content">
                <span class="trello-card-window-content-close" onClick={() =>props.closeWindow()}>&times;</span>
                <div className='trello-card-window-data'>
                    <p>{props.cardData.name}</p>
                    <p>Description:{props.cardData.desc}</p>
                    <p>Add Comment</p>
                    <input type='text'></input>
                    <p>checklist</p>
                    {
                        (props.cardData !== '')
                        ?   props.cardData.map(checkListItem =>{
                            return(
                                <div>
                                {
                                (checkListItem.state === 'complete')
                                ?   <input type="checkbox" checked></input>
                                :   <input type="checkbox"></input>
                                } 
                                    <span>{checkListItem.name}</span>
                                    </div>
                            )                                
                            })
                        :  <button>Add checklist</button>
                    }
                </div>
            </div>            
        </div>
    );
}

export default TrelloDisplayCard



