# Redux Notes

Redux is predictable state container for JS apps. That means Redux isn't tied to React. You can use Redux independently of React. Redux stores the 'state' of an application. Redux is predictable. All state transitions are explicit, and it's possible to keep track of them.

## The Redux Library

There are three core concepts in Redux—Actions, Reducer, and the Store.

The **store** holds the state of your application.

The **action** is like the order to change a state. It's a direction that can be passed into a **reducer** in order to change an application's state.

The **reducer** is what ties the store and actions together. It will take an action, and modify state based on the action

There are also three core principles in Redux:

- The state of your whole application is stored within an object tree within a single store. Basically, our entire state exists within a single object
- The only way to change state is to emit an action—an object describing the change. Basically, if you want to change state, you let redux know using an action
- To specify how the state tree is transformed, you write pure reducers. (Reducer - (prevState, action) ⇒ newState)

### Actions

The only way that your app can interact with the store. It carries info from your app to the store. Actions are just POJOs, they must consist of a type property, whose value is typically a string constant describing the state change.

```jsx
const BUY_CAKE = "BUY_CAKE";

{
  type: BUY_CAKE
}
```

At it's simplest, this is an action. It really is just an object describing the state change you want to occur. For the most part, you'll see actions as 'action creators' functions that return an action object. This makes actions reusable across your codebase.
```jsx
const BUY_CAKE = "BUY_CAKE";
const buyCake = () => ({type: BUY_CAKE})

//OR

function buyCake(){
  return {
    type: BUY_CAKE
  }
}
```

### Reducers

A reducer is a function that takes in the previous state, and an action as arguments, and returns a new state based off of those params.

```jsx
const cakeReducer = (state = initState, action) => {
  switch(action.type){
    case BUY_CAKE:
      return {...state, numCakes: state.numCakes - 1}
    case RETURN_CAKE:
      return {...state, numCakes: state.numCakes + 1}
    default:
      return state;
  }
}
```

Note that the reducer doesn't directly modify the state, it returns a brand new state object that then becomes the new state.

### The Store

There's one store for the entire application. It has several main responsibilities:

- It holds the application's state
- It allows access to the state using the .**getState()** method
- It allows the state to be updated using the .**dispatch()** method
- It registers listeners using the .**subscribe()** method
- It handles unregistering via the function returned by the .**subscribe()** method

You create a store using `redux.createStore(reducer)` . The store gets the initial state via the passed-in reducer function

```jsx
const store = redux.createStore(cakeReducer)

console.log("initial state: ", store.getState()) //initial state:  { numCakes: 10 }

const unsub = store.subscribe(() => console.log("updated state: ", store.getState()))
store.dispatch(buyCake()) // updated state:  { numCakes: 9 }
unsub() //Stops listeners from modifying state

```

This is essentially the Redux pattern.

### Multiple Reducers

Helps with decoupling code. You should only have a reducer work for a particular type of action. I.e. have a reducer for cake actions, and have a reducer for cookie actions. You should also have two different state objects:

```jsx
const initCakeState = {
	numCakes: 10
}

const initCookieState = {
	numCookies: 10
}

const cakeReducer = (state = initCakeState, action) => {
  switch(action.type){
    case BUY_CAKE:
      return {...state, numCakes: state.numCakes - 1}
    case RETURN_CAKE:
      return {...state, numCakes: state.numCakes + 1}
    default:
      return state;
  }
}

const cookieReducer = (state = initCookieState, action) => {
  switch(action.type){
    case BUY_COOKIE:
      return {...state, numCookies: state.numCookies - 1}
    case RETURN_COOKIE:
      return {...state, numCookies: state.numCookies + 1}
    default:
      return state;
  }
}
```

Cool. But our store only accepts a single reducer. How do we pass in our now decoupled states and reducers? Remember, that there's only one store per application, so we can't have multiple stores.

Luckily, Redux has a combineReducers() method just for that!

```jsx
const rootReducer = redux.combineReducers(
	{cake: cakeReducer, cookie: cookieReducer}
)
```

This will change the shape of the state object in store: 

```jsx
store.getState() => 
/*
	{ 
		cake: { numCakes: 10 }, 
		cookie: { numCookies: 20 } 
	}
*/
```
### Middleware

Like middleware for Express, you can add additional, or custom functionality to Redux

### Redux Logger

Redux logger is middleware that provides a detailed log of state changes to the store, when a state is updated. 

**Adding middleware**
```jsx
const logger = require('redux-logger').createLogger()
const {applyMiddleware, createStore} = require('redux')
const applyMiddleWare = applyMiddleware

const store = createStore(rootReducer, applyMiddleWare(logger))
```

It's as easy as using the applyMiddleware function as the second arg when creating a store and passing in the middleware you want the store to utilize.

### Async Actions

All of our above examples have been of synchronous state updates. But we won't always be so lucky. There will definitely be times where we will need to update our state asynchronously, like when pulling data from an API, or waiting for user input.

In order to make async state changes we'll need a request library (axios in this case), and redux-thunk, which is redux middleware that allows us to define async action creators

```jsx
const {applyMiddleware, createStore} = require('redux')
const thunk = require('redux-thunk').default
const axios = require('axios')

const initState = {
  loading: false,
  users: [],
  error: ""
}

//ACTIONS
const FETCH_USERS_REQ = "FETCH_USERS_REQ";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

const fetchUsersReq = () => ({type: FETCH_USERS_REQ})
const fetchUsersSuccess = users => ({type: FETCH_USERS_SUCCESS, payload: users})
const fetchUsersError = error => ({type: FETCH_USERS_ERROR, payload: error})

//REDUCER
const reducer = (state = initState, action) => {
  switch(action.type){
    case FETCH_USERS_REQ:
      return {...state, loading: true}
    case FETCH_USERS_SUCCESS:
      return {...state, loading: false, users: action.payload, error: ""}
    case FETCH_USERS_ERROR:
      return {...state, loading: false, users: [], error: action.payload}
    default:
      return state;
  }
}

//Async Action Creator (thunk)
const fetchUsers = () => {
  return function(dispatch){
    dispatch(fetchUsersReq()) //sets loading to true
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => dispatch(fetchUsersSuccess(res.data)))
    .catch(err => dispatch(fetchUsersError(err.message)))
  }
}

//Create the store and dispatch actions
const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())
```