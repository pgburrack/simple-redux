import {
  API_REQUEST,
  FETCH_PUBLISHERS,
  UPDATE_PUBLISHER,
  DELETE_PUBLISHER,
  SET_PUBLISHERS
} from './actionTypes';

import { api as PUBLISHERS_API } from './paths';

const setPublishers = data => ({
  type: SET_PUBLISHERS,
  payload: data
});

const fetchPublishers = () => ({
  type: API_REQUEST,
  payload: Object.assign(
    {
      url: PUBLISHERS_API.getAll,
      method: 'GET',
      next: data => [
        setPublishers(data)
      ]
    },
    FETCH_PUBLISHERS
  )
});

// TODO: maybe move this from here to a common folder
// Maybe the follow is different for edit publishers
const updatePublisher = (id, publisher) => ({
  type: API_REQUEST,
  payload: Object.assign(
    {
      url: PUBLISHERS_API.update.replace(':id', id),
      method: 'PUT',
      body: publisher,
      next: () => [
        fetchPublishers()
      ]
    },
    UPDATE_PUBLISHER
  )
});

const deletePublisher = id => ({
  type: API_REQUEST,
  payload: Object.assign(
    {
      url: PUBLISHERS_API.delete.replace(':id', id),
      method: 'DELETE'
    },
    DELETE_PUBLISHER
  )
});

const createPublisher = publisher => ({
  type: API_REQUEST,
  payload: Object.assign({
    url: PUBLISHERS_API.create,
    body: publisher,
    method: 'POST'
  },
   CREATE_PUBLISHER
  )
});

export {
  setPublishers,
  fetchPublishers,
  updatePublisher,
  deletePublisher,
  createPublisher
};
