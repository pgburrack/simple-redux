//////////////////////////////////////////////////////////////////////////////////
/// Example using createAction
//////////////////////////////////////////////////////////////////////////////////

console.log('%cPlease play with these functions multiply, increment, decrement and setError in the console', 'font-size: 30px; color: red');
/* eslint-disable */

///////////////////////////////////////////////////////
/// Action Types
///////////////////////////////////////////////////////
const INC = 'INC';
const DEC = 'DEC';
const MULTIPLY = 'MULTIPLY';
const SET_ERROR = 'SET_ERROR';

///////////////////////////////////
/// counter.js copy past
///////////////////////////////////

var initialState = {
  counter: 0,
  error: null
};

///////////////////////////////////////////////////////
/// Reducer
///////////////////////////////////////////////////////
var reducer = function(state, action) {
  switch(action.type) {
    case INC:
      return Object.assign({}, state, {
        counter: state.counter + 1
      });
    case DEC:
      return Object.assign({}, state, {counter: state.counter - 1});
    case MULTIPLY:
      return Object.assign({}, state, {counter: state.counter * action.payload});
    case SET_ERROR:
      return Object.assign({}, state, {error: action.payload})
    default:
      return state;
  }
};


///////////////////////////////////////////////////////
/// Action Creator
///////////////////////////////////////////////////////

const multiplyCustomPayload = (num) => num;
const multiply = ReduxActions.createAction(MULTIPLY, multiplyCustomPayload);
const increment = ReduxActions.createAction(INC);
const decrement = ReduxActions.createAction(DEC);
const setError = ReduxActions.createAction(SET_ERROR);
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
var store = Redux.createStore(reducer, initialState, enhancer);

///////////////////////////////////////////////////////
/// UI view framework
///////////////////////////////////////////////////////
function updateView() {
  document.getElementById('counter').innerText = store.getState().counter;
  document.getElementById('error').innerText = store.getState().error;
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

document.getElementById('multiply').onclick = function() {
  store.dispatch(multiply(Math.floor(Math.random() * 100)));
}

document.getElementById('errorBtn').onclick = function() {
  store.dispatch(setError(new Error('new Error message')));
}

///////////////////////////////////////////////////////
/// render
///////////////////////////////////////////////////////
updateView();
