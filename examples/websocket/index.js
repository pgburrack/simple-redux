const Redux = require('redux');
const applyMiddleware = Redux.applyMiddleware;
const compose = Redux.compose;
const DATA = require('./data');

var initialState = {
  messages: [],
  isConnected: false
};

///////////////////////////////////////////////////////
/// Action Type
///////////////////////////////////////////////////////
const WS_CONNECTED = 'WS_CONNECTED';
const WS_DISCONNECTED = 'WS_DISCONNECTED';
const ADD_MESSAGE = 'ADD_MESSAGE';
const SEND_MESSAGE = 'SEND_MESSAGE';

///////////////////////////////////////////////////////
/// Reducer
///////////////////////////////////////////////////////
var reducer = function(state, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages].concat(action.payload)
      });
    case WS_CONNECTED:
      return Object.assign({}, state, {
        isConnected: true
      });
    case WS_DISCONNECTED:
      return Object.assign({}, state, {
        isConnected: false
      });
    default:
      return state;
  }
};

///////////////////////////////////////////////////////
/// Action Creator
///////////////////////////////////////////////////////
var wsConnected = function() {
  return {
    type: WS_CONNECTED
  }
};
var wsDisconnected = function() {
  return {
    type: WS_DISCONNECTED
  }
};
var sendMessage = function() {
  return {
    type: SEND_MESSAGE,
    meta: { websocket: true }
  };
};

///////////////////////////////////////////////////////
/// middleware
///////////////////////////////////////////////////////
const SOCKET_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};

const wsMiddleware = ({ dispatch, getState }) => next => {
  // Initialization
  const WS_ROOT = "ws://localhost:1337/";
  const websocket = new WebSocket(WS_ROOT);

   websocket.onopen = () => { dispatch(wsConnected()) };
   websocket.onclose = () => { dispatch(wsDisconnected())};
   websocket.onerror = event => { console.log("WS Error", error.data); };
   websocket.onmessage = event => { dispatch(JSON.parse(event.data));};

  return action => { // Initialization not allowed
    // TODO: Pass action to server
    if (websocket.readyState === SOCKET_STATES.OPEN &&
        action.meta &&
        action.meta.websocket
    ) { // Send
      // Remove action metadata before sending
      const cleanAction = Object.assign({}, action, { meta: undefined });
      websocket.send(JSON.stringify(cleanAction));
    }
    next(action);
  }
};

///////////////////////////////////////////////////////
/// Creating store
///////////////////////////////////////////////////////
  let composeEnhancers = compose;

/**
* [enable debugging redux with redux devtool extension]
* @param  {[bool]} __DEV__ [global var]
*/

const composeWithDevToolsExtension = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : null;

if (typeof composeWithDevToolsExtension === 'function') {
  composeEnhancers = composeWithDevToolsExtension;
}

var store = Redux.createStore(reducer, initialState, composeEnhancers(applyMiddleware(wsMiddleware)));

///////////////////////////////////////////////////////
/// UI view framework
///////////////////////////////////////////////////////
function updateView() {
  document.getElementById('container').innerText = JSON.stringify(store.getState().messages);
}
///////////////////////////////////////////////////////
/// subscribe = every time the store will update it will update updateView function
///////////////////////////////////////////////////////
store.subscribe(updateView);

///////////////////////////////////////////////////////
/// dispatch = send action using action creator
///////////////////////////////////////////////////////
document.getElementById('message').onclick = function() {
  store.dispatch(sendMessage());
}

///////////////////////////////////////////////////////
/// render
///////////////////////////////////////////////////////
updateView();
