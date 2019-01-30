import React, { Component } from 'react';
import Fetch from "./fetchAPICalls";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class TrelloChecklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkItemValue:'',
            checkItems:[],
            checkListId:this.props.checkListId,
        }
    }
    componentDidMount(){
        this.getChecklistItems()
    }
    checkItemValue = e =>{
        this.setState({
            checkItemValue:e.target.value
        })
    }
    getChecklistItems = _ =>{
        Fetch.getChecklistsFetch(this.state.checkListId).then(checkListData=>{
            this.setState({
                checkItems:checkListData.checkItems
            })
        })
    }
    createItemInList =(e,id)=>{
        e.preventDefault()
        Fetch.createItemInListFetch(id,this.state.checkItemValue).then(item => {
            this.setState({
              checkItems:[...this.state.checkItems,item],
              checkItemValue:''
            })
        })
    }
    updateCheckItem=(CheckItemId,value)=>{
        let bodyData =''
        if(value){
            bodyData = {
                state:'complete',
            };
        }
        else{
            bodyData = {
                state:'incomplete',
            };
        }
        Fetch.updateCheckItemFetch(CheckItemId,this.props.cardId,bodyData).then(item => {
              let cardItemData = this.state.checkItems.map(checkItem => (checkItem.id === item.id) ? item: checkItem)
              this.setState({
                  checkItems:cardItemData
              })
        });
    }
    deleteCheckItem=(id)=>{
        Fetch.deleteCheckItemFetch(this.state.checkListId,id).then(_ => {
            let listData = this.state.checkItems.filter(checkItem => checkItem.id !== id)
            this.setState({
                checkItems:listData
            })
        });
    }
    render() {
        return(
            <div>
            {
            this.state.checkItems.map(checkListItem =>{
                return(
                    <div className='trello-checklist-item' key={checkListItem.id}>
                    {
                        (checkListItem.state === 'complete')
                        ?  <FormControlLabel
                                control={
                                <Checkbox
                                    onChange={(e) => {
                                        this.updateCheckItem(checkListItem.id,e.target.checked)
                                    }}
                                    checked={true}
                                />
                                }
                                label={checkListItem.name}
                            />
                        :   <FormControlLabel
                                control={
                                <Checkbox
                                    onChange={(e) => {
                                        this.updateCheckItem(checkListItem.id,e.target.checked)
                                    }}
                                />
                                }
                                label={checkListItem.name}
                            />
                    }
                        <IconButton 
                            aria-label="Delete" 
                            onClick={()=>this.deleteCheckItem(checkListItem.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )
            })
            }
                <form className='trello-board-checkitem-form' onSubmit={(e)=>this.createItemInList(e,this.state.checkListId)}>
                        <React.Fragment>
                        <TextField
                            value={this.state.checkItemValue}
                            placeholder="Add New Item"
                            onChange={this.checkItemValue}
                            style={styles.TextField}
                        />
                        <Button 
                            size='small' variant='contained'
                            style={styles.button}
                            onClick={(e)=>this.createItemInList(e,this.state.checkListId)}
                        >
                            Submit
                        </Button>
                        </React.Fragment>
                </form>
            </div>
        )
    }
}
const styles ={
    button:{
        height:20,
        padding:0,
    },
    TextField:{
        height:20
    },
}
export default TrelloChecklist



