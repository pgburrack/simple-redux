var initialState = {
  counter: 0,
  users: []
};

///////////////////////////////////////////////////////
/// Reducer
///////////////////////////////////////////////////////
var counterReducer = function(state = initialState.counter, action) {
  switch(action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
};

var usersReducer = function(state = initialState.users, action) {
  switch(action.type) {
    case 'ADD_USER':
      return [...state].concat(action.payload);
    default:
      return state;
  }
}

///////////////////////////////////////////////////////
/// Action Creator
///////////////////////////////////////////////////////
var increment = function() {
  return {
    type: 'INC'
  }
};

var decrement = function() {
  return {
    type: 'DEC'
  };
};

var addUser = function(user) {
  return {
    type: 'ADD_USER',
    payload: user
  }
}

///////////////////////////////////////////////////////
/// IGNORE THIS PART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////////////////////////
const composeEnhancers = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;

const enhancer = composeEnhancers(
  // other store enhancers if any
);
///////////////////////////////////////////////////////
/// END IGNORE THIS PART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
/// Creating store
///////////////////////////////////////////////////////

var reducer = Redux.combineReducers({
  counter: counterReducer,
  users: usersReducer
});

var store = Redux.createStore(reducer, initialState, enhancer);

///////////////////////////////////////////////////////
/// UI view framework
///////////////////////////////////////////////////////
function updateView() {
  document.getElementById('counter').innerText = store.getState().counter;

  var users = store.getState().users;

  if(!users.length) {
    return;
  }

  var dom = document.createDocumentFragment();

  users.forEach(function(user) {
    var div = document.createElement('div');
    div.textContent = user.name;
    dom.appendChild(div);
  })
  var usersDom = document.getElementById('users');
  usersDom.innerHTML= '';
  usersDom.appendChild(dom);
}

///////////////////////////////////////////////////////
/// subscribe = every time the store will update it will update updateView function
///////////////////////////////////////////////////////
store.subscribe(updateView);

///////////////////////////////////////////////////////
/// dispatch = send action using action creator
///////////////////////////////////////////////////////
document.getElementById('inc').onclick = function() {
  store.dispatch(increment());
}
document.getElementById('dec').onclick = function() {
  store.dispatch(decrement());
}
document.getElementById('addUser').onclick = function() {
  store.dispatch(addUser({name: 'liron' + Math.floor((Math.random() + 1) * 100)}));
}


///////////////////////////////////////////////////////
/// render
///////////////////////////////////////////////////////
updateView();
