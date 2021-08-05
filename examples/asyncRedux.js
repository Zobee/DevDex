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

//Async Action Creators (thunks)
const fetchUsers = () => {
  return function(dispatch){
    dispatch(fetchUsersReq())
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => dispatch(fetchUsersSuccess(res.data)))
    .catch(err => dispatch(fetchUsersError(err.message)))
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())
