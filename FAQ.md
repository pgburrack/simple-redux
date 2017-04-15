## FAQ

1. What are redux enhancers ?
2. How do I add multiple reducers to redux store ?
3. How combineReducers work ?
4. What is the advantage of root reducer
5. Why we are using payload as attribute for actions?
6. Is there a convention for action attribute?
7. Why do we use createReducer function?
8. what is applyMiddleware function in redux?
9. why do we have 3 root reducers db, local, vendor?
10. why we are using Provider
11. what is connect function job
12. what is bindActionCreators?


## Answers
1.  enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 list
 redux-batched-subscribe — Customize batching and debouncing calls to the store subscribers
redux-history-transitions — History transitions based on arbitrary actions
redux-optimist — Optimistically apply actions that can be later committed or reverted
redux-optimistic-ui — A reducer enhancer to enable type-agnostic optimistic updates
redux-undo — Effortless undo/redo and action history for your reducers
redux-ignore — Ignore redux actions by array or filter function
redux-recycle — Reset the redux state on certain actions
redux-batched-actions — Dispatch several actions with a single subscriber notification
redux-search — Automatically index resources in a web worker and search them without blocking
redux-electron-store — Store enhancers that synchronize Redux stores across Electron processes
redux-loop — Sequence effects purely and naturally by returning them from your reducers
redux-side-effects — Utilize Generators for declarative yielding of side effects from your pure

2. using helper function from redux module called "combineReducers"
3. loop through all reducers call each function and pass old state and action. and build new state,
 if this new state is the same as the old one it is return the old state.
4. 3 main benefits:
  1. root reducer is very simple it is just combine all other reducers (sub trees)
  2. now each reducer need to handle just his state and not others
  3. each reducers don't need to know about other data
5. convention between developers
6. The only thing that is a must is action.type.
7. After a while, it becomes apparent that most reducers are just switch statements over action.type. Since the switch syntax can be hard to read and prone to errors, there are a few libraries that try to make writing reducers easier and cleaner
8.
9. This allows for easier management of the different parts when deciding what needs to be synced to local storage, or when clearing stale data.
10.
11.
12. Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.
The only use case for bindActionCreators is when you want to pass some action creators down to a component that isn't aware of Redux, and you don't want to pass dispatch or the Redux store to it.