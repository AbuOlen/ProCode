import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducerGet from './reducers/getPassword';
import reducerSet from './reducers/setPassword';
import reducerGetUser from './reducers/getUser';
import reducerSetUser from './reducers/setUser';

const rootReducer = combineReducers({
    urlPassword: reducerGet,
    localPassword: reducerSet,
    userName: reducerGetUser,
    setLogin: reducerSetUser
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;