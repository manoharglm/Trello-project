import React, { Component } from "react";
import NavBarTrelloBoard from "./navBarTrelloBoard";
import SelectBoard from "./selectBoard";
import DisplayBoardOnSelect from "./displayBoard";
import Fetch from "./fetchAPICalls";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      board: [],
    };
  }
  componentDidMount() {
    this.getBoards();
  }
  getBoards = () => {
    Fetch.getBoardsFetch().then((trelloData)=>{
      this.setState({
        boards: trelloData
      })    
    })
  };

  getBoardOnSelect = id => {
    Fetch.getBoardOnSelectFetch(id).then((boardData) =>{
      this.setState({
        board: boardData,
      })
    })
  };

  goToHomePage = () => {
    this.setState(state => ({
      board: ""
    }));
  };

  render() {
    return (
      <div className="App">
        {this.state.board.length !== 0 ? (
          <DisplayBoardOnSelect
            boardName={this.state.board.name}
            boardId={this.state.board.id}
            background={this.state.board.prefs}
            goToHomePage={this.goToHomePage}
          />
        ) : this.state.boards.length !== 0 ? (
          <div>
            <NavBarTrelloBoard goToHomePage={this.goToHomePage} />
            <div className="trello-home-boards">
              <h2>Your Boards</h2>
              {this.state.boards.map(board => (
                <SelectBoard
                  key={board.id}
                  getBoardOnSelect={this.getBoardOnSelect}
                  boardId={board.id}
                  boardName={board.name}
                  background={board.prefs}
                />
              ))}{" "}
            </div>
          </div>

        ) : (
          ""
        )}{" "}
      </div>
    );
  }
}
export default App;
