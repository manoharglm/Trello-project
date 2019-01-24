import React from 'react';

const NavBarTrelloBoard=(props) => {
    return (
        <div className='trello-board-nav-bar'>
            <button onClick={()=> props.goToHomePage()}>Home</button>
            <span>Trello</span>
            <button>User</button>
        </div> 
    );
}
export default NavBarTrelloBoard