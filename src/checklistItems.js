import React, { Component } from 'react';

class TrelloChecklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkItemValue:'',
            checkItems:[],
            checkListId:this.props.checkListId
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
              checkItems:[...this.state.checkItems,item]
            })
          });
    }
    updateCheckItem=(CheckItemId,value)=>{
        let bodyData =''
        if(value){
            bodyData = {
                state:'complete'
            };
        }else{
            bodyData = {
                state:'incomplete'
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
              let cardItemData = this.state.checkItems.filter(checkItem => checkItem.id !== item.id)
              this.setState({
                  checkItems:[...cardItemData,item]
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
        return(
            <div>
                {
                    this.state.checkItems.map(checkListItem =>{
                        return(
                            <div className='trello-checklist-item'>
                            {
                                (checkListItem.state === 'complete')
                                ?   <input type="checkbox" onClick={(e) => this.updateCheckItem(checkListItem.id,e.target.checked)} checked></input>
                                :   <input type="checkbox" onClick={(e) => this.updateCheckItem(checkListItem.id,e.target.checked)}></input>
                            }
                                <span>{checkListItem.name}</span>
                                <button onClick={()=>this.deleteCheckItem(checkListItem.id)}>&times;</button>
                            </div>
                        )
                    })
                }
                <form className='trello-board-checkitem-form' onSubmit={(e)=>this.createItemInList(e,this.state.checkListId)}>
                    <input onChange={this.checkItemValue} type='text' placeholder='Add New Item'></input>
                    <button>Submit</button>
                </form>
            </div>
        )


    }
}

export default TrelloChecklist



