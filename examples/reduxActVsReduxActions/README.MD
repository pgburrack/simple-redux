# redux-actions vs redux-act

## popularity

## createAction function

### Redux-actions
// createAction(type, payloadCreator = Identity, ?metaCreator)
var liron = ReduxActions.createAction('HELLO', () => ({payload: 'payload'}), () => {meta: 'data'})

 FSA-compliant libraries
?? error handling
?? create meta
?? compatible with FSA