import React from 'react';
const NavBarTrelloBoard=(props) => {
    return (
        <div className='trello-board-nav-bar'>
            <i onClick={()=> props.goToHomePage()} className="fas fa-home"></i>
            <span>Trello</span>
            <i className="fas fa-user"></i>
        </div> 
    );
}
export default NavBarTrelloBoard