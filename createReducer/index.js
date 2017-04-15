//// Switch reducer vs createReducer

///////////////////////////////////////////////////////
/// creatReducer function
///////////////////////////////////////////////////////

function createReducer(initialState, handlers) {
  return function reducer(state, action) {
    if (state === undefined) state = initialState;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
};

var initialState = {
  counter: 0,
  users: []
};

///////////////////////////////////////////////////////
/// Switch Reducers
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
/// new syntax Reducers
///////////////////////////////////////////////////////

var counterReducer = createReducer(initialState.counter, {
    ['INC']: (state, action) => state + 1,
    ['DEC']: (state, action) => state -1
});

var usersReducer = createReducer(initialState.users, {
    ['ADD_USER']: (state, action) => [...state].concat(action.payload)
})