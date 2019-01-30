import React, { Component } from 'react';
import GetList from './getLists'
import NavBarTrelloBoard from "./navBarTrelloBoard";

class TrelloDisplayBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:'',
            lists:[]
        }
    }
    componentDidMount() {
        this.GetListsOnSelect()
    }
    // setBackground= ()=>{
    //   return (this.props.background.backgroundImage)
    //   ? { backgroundImage: `url(${this.props.background.backgroundImage})` }
    //   : { backgroundColor: `${this.props.background.backgroundColor}`}
    // }

    getList = (e) => {
        this.setState({
            list:e.target.value
        })
    }
    GetListsOnSelect = () =>{
        fetch(
        `https://api.trello.com/1/boards/${this.props.boardId}?lists=open&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
        {
            headers: {
            "Content-Type": "application/json"
            }
        }
        )
        .then(res => res.json())
        .then(listsData =>
            this.setState({
                lists: listsData.lists
            })
        )
    }
    archiveList=(id) =>{
        fetch(
            `https://api.trello.com/1/lists/${id}/closed?value=true&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
            .then(res => res.json())
            .then(_ => {
                let listsData = this.state.lists.filter(list => list.id !== id)
                this.setState({
                    lists:listsData
                })
            });
    }
    createNewList =(value,boardId) =>{
        if(value!== ''){
            let bodyData = {
                name: value,
                idBoard: boardId,
                pos:'bottom'
            };
        
            fetch(`https://api.trello.com/1/lists?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData)
            }
            )
            .then(res => res.json())
            .then(list => {
                this.setState({
                    lists:[...this.state.lists,list]
                })
            });
        }
    }
    onSubmit=(e)=>{
        e.preventDefault()
        this.createNewList(this.state.list,this.props.boardId)
        this.setState({list:''})
    }
    render() {
        return (
            <div className='trello-board' style={{ backgroundImage: `url(${this.props.background.backgroundImage})`, backgroundColor: `${this.props.background.backgroundColor}`}}>
                <NavBarTrelloBoard goToHomePage={this.props.goToHomePage} />
                <h2 className='trello-board-name'>{this.props.boardName}</h2>
                <div className='trello-board-lists'>
                    {   (this.state.lists.length !== 0)
                        ? this.state.lists.map(list =>{
                            return  <GetList
                                        lists={this.state.lists}
                                        listData={list}
                                        archiveList={this.archiveList}
                                    />
                          })
                        : null
                    }
                    <form className='trello-board-lists-form' onSubmit={this.onSubmit}>
                        <input  placeholder='Create new List'
                                value={this.state.card}  
                                type='text'
                                onChange={this.getList} 
                        ></input>
                        <button>Submit</button>
                    </form>        
                </div>
            </div>
        );
    }
}
export default TrelloDisplayBoard
