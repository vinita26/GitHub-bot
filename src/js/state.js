import {createStore} from 'redux';
// const {createStore} = require('redux');

const states = [];
let localvalue ="";

function RunQuery(state={items:[]}, action) {
    switch(action.type) {
      case 'CREATE_REPO':
        const createRepoState = {items: [...state.items, action.item]}
        states.push(createRepoState);
        localStorage.setItem('States',JSON.stringify(createRepoState));
        return createRepoState;
      case 'CREATE_ISSUE':
        const createIssueState = {items: [...state.items, action.item]}
        states.push(createIssueState);
        localStorage.setItem('States',JSON.stringify(createIssueState));
        return createIssueState;   
      case 'EDIT_ISSUE':
        const editIssueState = {items: [...state.items, action.item]}
        states.push(editIssueState);
        localStorage.setItem('States',JSON.stringify(editIssueState));
        return editIssueState;   
      case 'ADD_COLLABORATOR':
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
    items:[]
});

// Listen for changes
store.subscribe(() => {
    console.log('Store Value:', store.getState().items);
});

store.subscribe(render);

function render(){
  localvalue = JSON.parse(window.localStorage.getItem('States'));
}

