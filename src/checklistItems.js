import React, { Component } from 'react';

class TrelloChecklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkItemValue:'',
            checkItems:[]
        }
    }
    componentDidMount(){
        this.getChecklists()
    }
    checkItemValue = e =>{
        this.setState({
            checkItemValue:e.target.value
        })
    }
    getChecklists = _ =>{
        fetch(
            `https://api.trello.com/1/checklists/${this.props.checkListId}?fields=name&cards=all&card_fields=name&key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
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
            `https://api.trello.com/1/checklists/${this.props.checkListId}/checkItems/${id}?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b`,
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
    //https://api.trello.com/1/checklists/5c4ec0fa3b68f4736114b2e5/checkItems/5c4ec3b33e446a2f223fdacc?key=b6e6c194159d7563747cdc5642408d98&token=af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b

    render() {
        console.log(this.state.checkItems)
        return(
            <div>
                {
                    this.state.checkItems.map(checkListItem =>{
                        return(
                            <div>
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
                <form className='trello-board-checkitem-form' onSubmit={(e)=>this.createItemInList(e,this.props.checkListId)}>
                    <input onChange={this.checkItemValue} type='text' placeholder='Add New Item'></input>
                    <button>Submit</button>
                </form>
            </div>
        )


    }
}

export default TrelloChecklist



