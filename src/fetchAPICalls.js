let key = 'b6e6c194159d7563747cdc5642408d98'
let token = 'af7ec08178723de23d448b31e4a424716376da3724aaa797d23aad6782bf3f7b'
let getBoardsFetch = () => {
    return fetch(
      `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(res => res.json())
}
let getBoardOnSelectFetch = id => {
    return fetch(
      `https://api.trello.com/1/boards/${id}?cards=all&checklists=none&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&key=${key}&token=${token}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(res => res.json())
}
let GetListsOnSelectFetch = (boardId) =>{
    return fetch(
    `https://api.trello.com/1/boards/${boardId}?lists=open&key=${key}&token=${token}`,
    {
        headers: {
        "Content-Type": "application/json"
        }
    }
    )
    .then(res => res.json())
}
let archiveListFetch=(id) =>{
    return fetch(
        `https://api.trello.com/1/lists/${id}/closed?value=true&key=${key}&token=${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(res => res.json())
}
let createNewListFetch =(value,boardId) =>{
    if(value!== ''){
        let bodyData = {
            name: value,
            idBoard: boardId,
            pos:'bottom'
        };
    
        return fetch(
            `https://api.trello.com/1/lists?key=${key}&token=${token}`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        }
        ).then(res => res.json())
    }
}
let getAllCardsInListFetch = id => {
    return fetch(
      `https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(res => res.json())
}
let createNewCardFetch = (value, listId) => {
      let bodyData = {
        name: value,
        idList: listId
      };
      return fetch(
        `https://api.trello.com/1/cards?keepFromSource=all&key=${key}&token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyData)
        }
      ).then(res => res.json())
};
let DeleteCardFetch =id =>{
    return fetch(
        `https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        }
    ).then(res => res.json())
}
let getChecklistsFetch = id =>{
    return fetch(
        `https://api.trello.com/1/checklists/${id}?fields=name&cards=all&card_fields=name&key=${key}&token=${token}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    .then(res => res.json())
}
let createNewChecklistFetch =(listName,cardId)=>{
    let bodyData = {
        name: listName,
        idCard: cardId
    };
    return fetch(
        `https://api.trello.com/1/checklists?key=${key}&token=${token}
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
}
let deleteChecklistFetch= id =>{
    return fetch(
        `https://api.trello.com/1/checklists/${id}?key=${key}&token=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        }
    ).then(res => res.json())
}
let createItemInListFetch =(id,itemName)=>{
    let bodyData = {
        name: itemName,
        pos:'bottom'
    };
    return fetch(
      `https://api.trello.com/1/checklists/${id}/checkItems?key=${key}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      }
    ).then(res => res.json())
}
let updateCheckItemFetch=(CheckItemId,cardId,bodyData)=>{
    return fetch(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${CheckItemId}?key=${key}&token=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      }
    ).then(res => res.json())
}
let deleteCheckItemFetch=(checkListId,id)=>{
    return fetch(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${id}?key=${key}&token=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        }
    )
    .then(_ => null)
}
module.exports={
    getBoardsFetch,
    getBoardOnSelectFetch,
    GetListsOnSelectFetch,
    archiveListFetch,
    createNewListFetch,
    getAllCardsInListFetch,
    createNewCardFetch,
    DeleteCardFetch,
    getChecklistsFetch,
    createNewChecklistFetch,
    deleteChecklistFetch,
    createItemInListFetch,
    updateCheckItemFetch,
    deleteCheckItemFetch,
}