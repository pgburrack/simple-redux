export const setRecipe = (id, data) => ({
  type: 'SET_PUBLISHER'
  payload: { id, data }
});

export const fetchPublisher = id => dispatch => { return fetch('publisher/' + id)
    .then(response => response.json())
    .then(json => dispatch(setRecipe(id, json)))
};