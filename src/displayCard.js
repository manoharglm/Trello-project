import React, { Component } from 'react';
import CheckListItems from './checklistItems'

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
        fetch(
            `https://api.trello.com/1/checklists/${id}?fields=name&cards=all&card_fields=name&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(res => res.json())
        .then(checkListData=>{
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
            let bodyData = {
                name: this.state.checklistVal,
                idCard: this.props.cardId
            };
            fetch(
              `https://api.trello.com/1/checklists?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b
              `,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData)
              }
            )
              .then(res => res.json())
              .then(checklist => {
                this.props.updatChecklistIdState(checklist.id)
                this.setState({
                    checklists:[...this.state.checklists,checklist],
                    // checkListIds:[...this.props.checkListIds,checklist.id]
                })
              });
    }
    deleteChecklist= id =>{
        fetch(
            `https://api.trello.com/1/checklists/${id}?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
            }
        )
        .then(_ => {
            let cardData = this.state.checklists.filter(checkList => checkList.id !== id)
            this.setState({
                checklists:cardData
            })
        });
    }
    render() {
        console.log(this.state.checklists)
        return (
        <div className='trello-card-window'>
            <div className="trello-card-window-content">
                <span className="trello-card-window-content-close" onClick={() =>this.props.closeWindow()}>&times;</span>
                <p>{this.props.cardName}</p>
                {
                    this.state.checklists.map(checkList=>{
                    return(
                        <div>
                            <div className='trello-card-checklist-title'>
                                <label>{checkList.name}</label>
                                <button onClick={()=>this.deleteChecklist(checkList.id)}>&times;</button>
                            </div>
                            <CheckListItems
                                checkItems={checkList.checkItems}
                                checkListId={checkList.id}
                                cardId={this.props.cardId}
                            />
                        </div>
                    )
                    }) 
                }
                <form onSubmit={this.createNewChecklist}>
                    <input onChange={this.checklistValue} type='text' placeholder='Add New Checklist'></input>
                    <button>Submit</button>
                </form>
            </div>            
        </div>
        );
    }
}

export default TrelloDisplayCard



