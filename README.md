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