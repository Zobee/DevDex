const redux = require('redux')

const BUY_CAKE = "BUY_CAKE";
const RETURN_CAKE = 'RETURN_CAKE';
const initState = {
  numCakes: 10
}

function buyCake(){
  return {
    type: BUY_CAKE
  }
}

const returnCake = () => ({type: RETURN_CAKE})


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

const store = redux.createStore(cakeReducer)
console.log("initial state: ", store.getState())
store.subscribe(() => console.log("updated state: ", store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(returnCake())