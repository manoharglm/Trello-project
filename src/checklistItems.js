import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider } from '@material-ui/core/styles';
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
            // checkItemState:'false'
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
    // handleCheckItem=(state)=>{
    //         this.setState((prevState)=>({
    //             checkItemState: state 
    //         }))
    // }
    getChecklistItems = _ =>{
        fetch(
            `https://api.trello.com/1/checklists/${this.state.checkListId}?fields=name&cards=all&card_fields=name&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(res => res.json())
        .then(checkListData=>{
            this.setState({
                checkItems:checkListData.checkItems
            })
        })
    }
    createItemInList =(e,id)=>{
        e.preventDefault()
        let bodyData = {
            name: this.state.checkItemValue,
            pos:'bottom'
        };
        fetch(
          `https://api.trello.com/1/checklists/${id}/checkItems?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
          }
        )
          .then(res => res.json())
          .then(item => {
              console.log('list Id'+id)
              console.log('list Item'+item.id)

            this.setState({
              checkItems:[...this.state.checkItems,item],
              checkItemValue:''
            })
          });
    }
    updateCheckItem=(CheckItemId,value)=>{
        let bodyData =''
        if(value){
            bodyData = {
                state:'complete',
            };
        }else{
            bodyData = {
                state:'incomplete',
            };
        }
        fetch(
          `https://api.trello.com/1/cards/${this.props.cardId}/checkItem/${CheckItemId}?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
          }
        )
          .then(res => res.json())
          .then(item => {
              console.log(item)
              let cardItemData = this.state.checkItems.map(checkItem => (checkItem.id === item.id) ? item: checkItem)
              this.setState({
                  checkItems:cardItemData
              })
          });
    }
    deleteCheckItem=(id)=>{
        fetch(
            `https://api.trello.com/1/checklists/${this.state.checkListId}/checkItems/${id}?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
            }
        )
        .then(_ => {
            let listData = this.state.checkItems.filter(checkItem => checkItem.id !== id)
            this.setState({
                checkItems:listData
            })
        });
    }

    render() {
        console.log('rendered')
        return(
            <div>
                {
                    this.state.checkItems.map(checkListItem =>{
                        return(
                            <div className='trello-checklist-item'>
                            <MuiThemeProvider>
                                    {
                                        (checkListItem.state === 'complete')
                                        ?  <FormControlLabel
                                                control={
                                                <Checkbox
                                                    onChange={(e) => {
                                                        this.updateCheckItem(checkListItem.id,e.target.checked)
                                                    }}
                                                    value = 'true'
                                                    // classes={{
                                                    //     checked: {'true'}
                                                    // }}
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
                                                    value = 'false'

                                                    // classes={{
                                                    //     checked: {}
                                                    // }}
                                                />
                                                }
                                                label={checkListItem.name}
                                            />
                                    }

                                <IconButton 
                                    aria-label="Delete" 
                                    onClick={()=>this.deleteCheckItem(checkListItem.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </MuiThemeProvider>
                            </div>
                        )
                    })
                }
                <form className='trello-board-checkitem-form' onSubmit={(e)=>this.createItemInList(e,this.state.checkListId)}>
                    <MuiThemeProvider>
                        <React.Fragment>
                        <TextField
                            value={this.state.checkItemValue}
                            placeholder="Add New Item"
                            floatingLabelText='Checklist Item'
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
                    </MuiThemeProvider>
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



