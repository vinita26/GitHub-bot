import {createStore} from 'redux';
// const {createStore} = require('redux');

const states = [];
let localvalue ="";

function RunQuery(state={items:[]}, action) {
    switch(action.type) {
      case 'SEARCHED_ITEM_CLICKED':
        const searchButtonState = {items: [...state.items, action.item]}
        states.push(searchButtonState);
        localStorage.setItem('States',JSON.stringify(searchButtonState));
        return searchButtonState;
      case 'CREATE_REPO_CLICKED':
        const createRepoState = {items: [...state.items, action.item]}
        states.push(createRepoState);
        localStorage.setItem('States',JSON.stringify(createRepoState));
        return createRepoState;
      case 'CREATE_ISSUE_CLICKED':
        const createIssueState = {items: [...state.items, action.item]}
        states.push(createIssueState);
        localStorage.setItem('States',JSON.stringify(createIssueState));
        return createIssueState;   
      case 'EDIT_ISSUE_CLICKED':
        const editIssueState = {items: [...state.items, action.item]}
        states.push(editIssueState);
        localStorage.setItem('States',JSON.stringify(editIssueState));
        return editIssueState;   
      case 'ADD_COLLABORATOR_CLICKED':
        const addCollaboratorState = {items: [...state.items, action.item]}
        states.push(addCollaboratorState);
        localStorage.setItem('States',JSON.stringify(addCollaboratorState));
        return addCollaboratorState;    
      default:
        return state;
    }
  }

// Instantiating the store
export const store = createStore(RunQuery, {
    items:[  ]
  });

// Listen for changes
store.subscribe(() => {
    console.log('Store Value:', store.getState().items);
});

store.subscribe(render);

function render(){
  localvalue = JSON.parse(window.localStorage.getItem('States'));
  console.log("local value:", localvalue);

}

