import React, { Component } from "react";
import NavBarTrelloBoard from "./navBarTrelloBoard";
import SelectBoard from "./selectBoard";
import DisplayBoardOnSelect from "./displayBoard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      board: [],
      // cards:'',
      lists:[]
    };
  }
  componentDidMount() {
    this.getBoards();
  }
  getBoards = () => {
    fetch(
      "https://api.trello.com/1/members/me/boards?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(trelloData =>
        this.setState({
          boards: trelloData
        })
      );
  };

  DisplayBoardOnSelect = id => {
    fetch(
      `https://api.trello.com/1/boards/${id}?cards=all&checklists=none&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(boardData =>
        this.setState({
          board: boardData,
        })
      );
  };
  goToHomePage = () => {
    this.setState(state => ({
      board: ""
    }));
  };

  render() {
    console.log('home rendered')
    return (
      <div className="App">
        <NavBarTrelloBoard goToHomePage={this.goToHomePage} />{" "}
        {this.state.board.length !== 0 ? (
          <DisplayBoardOnSelect
            updateList={this.updateList}
            DisplayBoardOnSelect={this.DisplayBoardOnSelect}
            boardName={this.state.board.name}
            lists={this.state.board.lists}
            cards={this.state.board.cards}
            createNewCard={this.createNewCard}
            createNewList={this.createNewList}
            boardId={this.state.board.id}
          />
        ) : this.state.boards.length !== 0 ? (
          <div className="trello-home-boards">
            {" "}
            {this.state.boards.map(board => (
              <SelectBoard
                DisplayBoardOnSelect={this.DisplayBoardOnSelect}
                boardId={board.id}
                boardName={board.name}
              />
            ))}{" "}
          </div>
        ) : (
          ""
        )}{" "}
      </div>
    );
  }
}

export default App;
