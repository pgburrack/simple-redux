var Redux = (function() {
  var listeners = [];
  var state = null;
  var reducer = null;

  var getState = function() {
    return state;
  }

  var disptach = function(action) {
    var newState = reducer(state, action);

    if(newState !== state) {
      state = newState;

      listeners.forEach(listener => listener());
    }
  }

  var subscribe = function(callback) {
    if(typeof callback !== 'function') {
      throw new TypeError('subscriber should get a function');
    }

    listeners.push(callback);
  }

  //Replaces the reducer currently used by the store to calculate the state.
  //load some of the reducers dynamically
  var replaceReducer = function() {

  }

  var createStore = function(reducer, initialState) {

  };


  return {
    createStore: createStore
  }
})();
