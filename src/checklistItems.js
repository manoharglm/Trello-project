import React, { Component } from 'react';

class TrelloChecklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkItemValue:'',
            checkItems:this.props.checkItems
        }
    }
    checkItemValue = e =>{
        this.setState({
            checkItemValue:e.target.value
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
                pos:'bottom',
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



