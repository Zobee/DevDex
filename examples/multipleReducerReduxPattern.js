const redux = require('redux')

const BUY_CAKE = "BUY_CAKE";
const RETURN_CAKE = 'RETURN_CAKE';
const BUY_COOKIE = 'BUY_COOKIE';
const RETURN_COOKIE = 'RETURN_COOKIE';

const initCakeState = {
  numCakes: 10
}

const initCookieState = {
  numCookies: 20
}

const buyCake = () => ({type: BUY_CAKE})
const returnCake = () => ({type: RETURN_CAKE})
const buyCookie = () => ({type: BUY_COOKIE})
const returnCookie = () => ({type: RETURN_COOKIE})


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

const rootReducer = redux.combineReducers({cake: cakeReducer, cookie: cookieReducer})
const store = redux.createStore(rootReducer)
console.log("initial state: ", store.getState())
const unsubscribe = store.subscribe(() => console.log("updated state: ", store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCookie())
store.dispatch(buyCookie())
store.dispatch(returnCake())
store.dispatch(returnCookie())
unsubscribe()