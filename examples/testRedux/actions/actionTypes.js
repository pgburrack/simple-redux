const asyncActionType = type => ({
  PENDING: `${type}_PENDING`,
  ERROR: `${type}_ERROR`,
  SUCCESS: `${type}_SUCCESS`
});

// API
export const API_REQUEST = 'API_REQUEST';

// PUBLISHER
export const FETCH_PUBLISHERS = asyncActionType('FETCH_PUBLISHERS');
export const UPDATE_PUBLISHER = asyncActionType('UPDATE_PUBLISHER');
export const DELETE_PUBLISHER = asyncActionType('DELETE_PUBLISHER');
export const CREATE_PUBLISHER = asyncActionType('CREATE_PUBLISHER');

export const SET_PUBLISHERS = 'SET_PUBLISHERS';
