import React, { Component } from 'react';
import CheckListItems from './checklistItems'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fetch from "./fetchAPICalls";

class TrelloDisplayCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checklists:[],
            checklistVal:'',
        }
    }
    componentDidMount(){
        if(this.props.checkListIds.length !== 0){
            this.props.checkListIds.map(checklist => this.getChecklists(checklist))
        }
    }
    getChecklists = id =>{
        Fetch.getChecklistsFetch(id).then(checkListData=>{
            this.setState({
                checklists:[...this.state.checklists,checkListData]
            })
        })
    }
    checklistValue = e =>{
        this.setState({
            checklistVal:e.target.value
        })
    }
    createNewChecklist =(e)=>{
        e.preventDefault()
        Fetch.createNewChecklistFetch(this.state.checklistVal,this.props.cardId).then(checklist => {
            this.props.updatChecklistIdState(checklist.id)
            this.setState({
                checklists:[...this.state.checklists,checklist],
                checklistVal:''
            })
        });
    }
    deleteChecklist= id =>{
        Fetch.deleteChecklistFetch(id).then(_ => {
            let cardData = this.state.checklists.filter(checkList => checkList.id !== id)
            this.setState({
                checklists:cardData
            })
        });
    }
    render() {
        return (
        <div className='trello-card-window'>
            <div className="trello-card-window-content">
                <span className="trello-card-window-content-close" onClick={() =>this.props.closeWindow()}>&times;</span>
                <h3>{this.props.cardName}</h3>
                <div className='trello-window-checklist'>
                {
                    this.state.checklists.map(checkList=>{
                    return(
                        <div className='trello-window-checklist-content' key={checkList.id}>
                            <div className='trello-card-checklist-title'>
                                <h5>{checkList.name}</h5>
                                <button onClick={()=>this.deleteChecklist(checkList.id)}>&times;</button>
                            </div>
                            <CheckListItems
                                key={checkList.id}
                                checkItems={checkList.checkItems}
                                checkListId={checkList.id}
                                cardId={this.props.cardId}
                            />
                        </div>
                    )
                    }) 
                }
                <h4>Add New Checklist</h4>
                <form className='trello-window-checlist-form' onSubmit={this.createNewChecklist}>
                    <TextField
                        value={this.state.checklistVal}
                        placeholder="Add New Checklist"
                        onChange={this.checklistValue}
                    />
                    <Button 
                        size='small' variant='contained'
                        style={styles.button}
                        onClick={this.createNewChecklist}
                    >
                        Submit
                    </Button>
                </form>
                </div>
            </div>            
        </div>
        );
    }
}
const styles ={
    button:{
        height:30
    }
}

export default TrelloDisplayCard



