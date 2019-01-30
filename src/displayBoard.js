import React, { Component } from 'react';
import GetList from './getLists'
import NavBarTrelloBoard from "./navBarTrelloBoard";
import Fetch from "./fetchAPICalls";

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
    getList = (e) => {
        this.setState({
            list:e.target.value
        })
    }
    GetListsOnSelect = () =>{
        Fetch.GetListsOnSelectFetch(this.props.boardId).then(listsData =>{
            this.setState({
                lists: listsData.lists
            })        
        })
    }
    archiveList=(id) =>{
        Fetch.archiveListFetch(id).then(_ =>{
            let listsData = this.state.lists.filter(list => list.id !== id)
            this.setState({
                lists:listsData
            })
        })
    }
    createNewList =(value,boardId) =>{
        Fetch.createNewListFetch(value,boardId).then(list => {
            this.setState({
                lists:[...this.state.lists,list]
            })
        })
    }
    onSubmit=(e)=>{
        e.preventDefault()
        this.createNewList(this.state.list,this.props.boardId)
        this.setState({list:''})
    }
    render() {
        return (
            <div 
                className='trello-board' 
                style={{ 
                        backgroundImage: `url(${this.props.background.backgroundImage})`, 
                        backgroundColor: `${this.props.background.backgroundColor}`,
                        backgroundSize: 'cover'
                    }}
            >
                <NavBarTrelloBoard goToHomePage={this.props.goToHomePage} />
                <h2 className='trello-board-name'>{this.props.boardName}</h2>
                <div className='trello-board-lists'>
                    {   (this.state.lists.length !== 0)
                        ? this.state.lists.map(list =>{
                            return  <GetList
                                        lists={this.state.lists}
                                        listData={list}
                                        archiveList={this.archiveList}
                                        key={list.id}
                                    />
                          })
                        : null
                    }
                    <form className='trello-board-lists-form' onSubmit={this.onSubmit}>
                        <input  placeholder='Create new List'
                                value={this.state.list}  
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
