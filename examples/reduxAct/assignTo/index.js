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
/// Action Creator
///////////////////////////////////////////////////////
const multiplyCustomPayload = (num) => num;

const multiply = ReduxAct.createAction(MULTIPLY, multiplyCustomPayload);
const increment = ReduxAct.createAction(INC);
const decrement = ReduxAct.createAction(DEC);
const setError = ReduxAct.createAction(SET_ERROR);

///////////////////////////////////////////////////////
/// Reducer
///////////////////////////////////////////////////////
var reducer = ReduxAct.createReducer({
  [increment]: (state) => Object.assign({}, state, {
        counter: state.counter + 1
      }),
  [decrement]: (state) => Object.assign({}, state, {counter: state.counter - 1}),
  [multiply]: (state, action) => {
    console.log(state, action);
    return Object.assign({}, state, {counter: state.counter * action})
  },
  [setError]: (state, action) => Object.assign({}, state, {error: action})
}, initialState);


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
/// Assigning action to store
///////////////////////////////////////////////////////
multiply.assignTo(store);
increment.assignTo(store);
decrement.assignTo(store);
setError.assignTo(store);

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
  increment();
}
document.getElementById('dec').onclick = function() {
  decrement();
}

document.getElementById('multiply').onclick = function() {
  multiply(Math.floor(Math.random() * 100));
}

document.getElementById('errorBtn').onclick = function() {
  setError(new Error('new Error message'));
}

///////////////////////////////////////////////////////
/// render
///////////////////////////////////////////////////////
updateView();
