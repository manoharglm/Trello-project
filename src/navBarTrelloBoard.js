import React from 'react';
import AppBar from "@material-ui/core/AppBar";
const NavBarTrelloBoard=(props) => {
    return (
        // <AppBar title='Trello'/>

        <div className='trello-board-nav-bar'>
            <i onClick={()=> props.goToHomePage()} className="fas fa-home"></i>
            <span>Trello</span>
            <i className="fas fa-user"></i>
        </div> 
    );
}
export default NavBarTrelloBoard