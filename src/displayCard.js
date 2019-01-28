import React, { Component } from 'react';

class TrelloDisplayCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card:'',
            checklists:[],
            checklistVal:'',
            checkItemValue:'',
            checkItems:[]
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
                checklists:[...this.state.checklists,checkListData],
                checkItems:[...this.state.checkItems,checkListData.checkItems]
            })
        })
    }
    checklistValue = e =>{
        this.setState({
            checklistVal:e.target.value
        })
    }
    checkItemValue = e =>{
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
                this.setState({
                    checklists:[...this.state.checklists,checklist]
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
            .then(res => res.json())
            .then(_ => {
                let cardData = this.state.checklists.filter(checkList => checkList.id !== id)
                this.setState({
                    checklists:cardData
                })
            });
    }

    createItemInList =(e,id)=>{
        e.preventDefault()
        let bodyData = {
            name: this.state.checklistVal,
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
            this.setState({
              checkItems:[...this.state.checkItems,item]
            })
          });
}

    render() {
        return (
        <div className='trello-card-window'>
            <div className="trello-card-window-content">
                <span className="trello-card-window-content-close" onClick={() =>this.props.closeWindow()}>&times;</span>
                <div className='trello-card-window-data'>
                    <p>{this.props.cardName}</p>
                    {/* <div className='trello-board-card-description'>
                        <span>Description:</span>
                        {
                            (this.props.cardData.desc !== '')
                            ?<span>{this.props.cardData.desc}</span>
                            :<input type='text' placeholder='Enter Description'></input>
                        }
                    </div> */}
                    {
                            <div>
                            {
                                this.state.checklists.map(checkList=>{
                                return(
                                    <div>
                                    <div className='trello-card-checklist-title'>
                                        <label>{checkList.name}</label>
                                        <button onClick={()=>this.deleteChecklist(checkList.id)}>&times;</button>
                                    </div>
                                    {
                                        checkList.checkItems.map(checkListItem =>{
                                        return(
                                            <div>
                                            {
                                                (checkListItem.state === 'complete')
                                                ?   <input type="checkbox" checked></input>
                                                :   <input type="checkbox"></input>
                                            }
                                                <span>{checkListItem.name}</span>
                                            </div>
                                        )
                                        }) 
                                    }
                                    <form onSubmit={(e)=>this.createItemInList(e,checkList.id)}>
                                        <input onChange={this.checkItemValue} type='text' placeholder='Add New Item'></input>
                                        <button>Submit</button>
                                    </form>
                                    </div>
                                )
                                }) 
                            }
                            {   
                                <form onSubmit={this.createNewChecklist}>
                                    <input onChange={this.checklistValue} type='text' placeholder='Add New Checklist'></input>
                                    <button>Submit</button>
                                </form>
                            }
                            </div>
                        // :  null
                    }
                </div>
            </div>            
        </div>
    );
    }
}

export default TrelloDisplayCard



