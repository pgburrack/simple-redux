/* eslint-disable */

///////////////////////////////////
/// counter.js copy past
///////////////////////////////////

var initialState = {
  counter: 0
};

///////////////////////////////////////////////////////
/// Reducer
///////////////////////////////////////////////////////
var reducer = function(state, action) {
  switch(action.type) {
    case 'INC':
      return Object.assign({}, state, {
        counter: state.counter + 1
      });
    case 'DEC':
      return Object.assign({}, state, {counter: state.counter - 1});
    default:
      return state;
  }
};

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
/// React Component
///////////////////////////////////////////////////////

const Counter = (props) => {
  const handleINCClick= () => {
    props.store.dispatch(increment());
  };
  const handleDECClick = () => {
    props.store.dispatch(decrement());
  };

  return (
    <div id="counter">
      <div>{props.counter}</div>
      <button id='inc' onClick={handleINCClick}>+</button>
      <button id='dec' onClick={handleDECClick}>-</button>
    </div>
  );
};

///////////////////////////////////////////////////////
/// Render React
///////////////////////////////////////////////////////

const render = () => {
    ReactDOM.render(
      <Counter
        counter={store.getState().counter}
        store={store} />,
      document.getElementById('container')
  );
}

///////////////////////////////////////////////////////
/// subscribe = every time the store will update it will update updateView function
///////////////////////////////////////////////////////
store.subscribe(render);

///////////////////////////////////////////////////////
/// Render React
///////////////////////////////////////////////////////
render();