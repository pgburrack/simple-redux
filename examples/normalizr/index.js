const Redux = require('redux');
const Normalizr = require('normalizr');
const schema = require('./schema');

const DATA = require('./data');
const normalize = Normalizr.normalize;
const denormalize = Normalizr.denormalize;

var initialState = {
  publisher: {
  }
};

var nor = normalize(DATA, schema);
var de = denormalize(nor.result, schema, nor.entities);

///////////////////////////////////////////////////////
/// Reducer
///////////////////////////////////////////////////////
var reducer = function(state, action) {
  switch(action.type) {
    case 'FETCH_PUBLISHER':
      return Object.assign({}, state, {
        publisher: normalize(action.payload, schema)
      });
    case 'UPDATE_PUBLISHER':
      return Object.assign({}, state, {
        publisher: action.payload
      });
    case 'CLEAR':
      return {publisher: {}};
    default:
      return state;
  }
};

///////////////////////////////////////////////////////
/// Action Creator
///////////////////////////////////////////////////////
var fetchPublisher = function() {
  return {
    type: 'FETCH_PUBLISHER',
    payload: DATA
  }
};

var updatePublisher = function(data) {
  return {
    type: 'UPDATE_PUBLISHER',
    payload: DATA
  }
}

var clear = function() {
  return {
    type: 'CLEAR'
  }
};


///////////////////////////////////////////////////////
/// Creating store
///////////////////////////////////////////////////////
var store = Redux.createStore(reducer, initialState);

///////////////////////////////////////////////////////
/// UI view framework
///////////////////////////////////////////////////////
function updateView() {
  document.getElementById('container').innerText = JSON.stringify(store.getState().publisher);
}
///////////////////////////////////////////////////////
/// subscribe = every time the store will update it will update updateView function
///////////////////////////////////////////////////////
store.subscribe(updateView);

///////////////////////////////////////////////////////
/// dispatch = send action using action creator
///////////////////////////////////////////////////////
document.getElementById('fetch').onclick = function() {
  store.dispatch(fetchPublisher());
}
document.getElementById('clear').onclick = function() {
  store.dispatch(clear());
}

///////////////////////////////////////////////////////
/// render
///////////////////////////////////////////////////////
updateView();
