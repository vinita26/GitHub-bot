import {createStore} from 'redux';

const states = [];

function RunQuery(state={items:[]}, action) {
    switch(action.type) {
      case 'CREATE_REPO':
        const s = {items: [...state.items, action.item]}
        states.push(s);
        return s;
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
    console.log(store.getState().items);
});