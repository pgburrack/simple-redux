/**
 * [combineReducers Turns an object whose values are different reducer functions, into a single
 * reducer function]
 * @param  {[type]} reducers [description]
 * @return {[type]}          [description]
 */
function combineReducers(reducers) {
  var finalReducers = reducers;

  return function combination(state = {}, action) {
     var hasChanged = false;
      var nextState = {}
      for (var i = 0; i < finalReducerKeys.length; i++) {
        var key = finalReducerKeys[i]
        var reducer = finalReducers[key]
        var previousStateForKey = state[key]
        // passing old state and action to this reducer
        var nextStateForKey = reducer(previousStateForKey, action)
        if (typeof nextStateForKey === 'undefined') {
          var errorMessage = getUndefinedStateErrorMessage(key, action)
          throw new Error(errorMessage)
        }
        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      return hasChanged ? nextState : state
    }
  }
}