/* eslint-disable */

///////////////////////////////////
/// counter.js copy past
///////////////////////////////////

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


var reducer = Redux.combineReducers({
  counter: counterReducer,
  users: usersReducer
});
///////////////////////////////////////////////////////
/// Creating store
///////////////////////////////////////////////////////
var store = Redux.createStore(reducer, initialState, enhancer);

///////////////////////////////////////////////////////
/// React Components
///////////////////////////////////////////////////////

const Dummy = (props) => {
  const handleClick = () => {
    props.store.dispatch({
      type: 'INC'
    });
  }

  return <button onClick={handleClick}> dummy button </button>
}

const Counter = (props) => {
  const handleINCClick= () => {
    props.store.dispatch(increment());
  };
  const handleDECClick = () => {
    props.store.dispatch(decrement());
  };

  return (
    <div id="counter">
      <div>{props.store.getState().counter}</div>
      <button id='inc' onClick={handleINCClick}>+</button>
      <button id='dec' onClick={handleDECClick}>-</button>
      <Dummy store={props.store}/>
    </div>
  );
};

class Users extends React.Component {
  handleClick = () => {
    this.props.store.dispatch(addUser({name: 'liron' + (Math.random() + 1) * 100}));
  };

  render() {
    const { store } = this.context;
    return (
      <div>
        <button onClick={this.handleClick}>Add User</button>
        {store.getState().users.map(user => <div key={user.name}>{user.name}</div>)}
      </div>
    );
  }
}
const storeShape = React.PropTypes.shape({
  subscribe: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  getState: React.PropTypes.func.isRequired
})

Users.contextTypes = {
  store: storeShape
};


class App extends React.Component {
  getChildContext() {
    return {store: this.props.store};
  }
  render() {
    return (<div>
      <Users store={this.props.store}/>
      <Counter store={this.props.store} />
    </div>);
  }
}

App.childContextTypes = {
  store: storeShape.isRequired
}
///////////////////////////////////////////////////////
/// Render React
///////////////////////////////////////////////////////

const render = () => {
    ReactDOM.render(
      <App
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