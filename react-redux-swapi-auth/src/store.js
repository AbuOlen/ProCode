import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducerGet from './reducers/getPassword';
import reducerSet from './reducers/setPassword';

const rootReducer = combineReducers({
    urlPassword: reducerGet,
    localPassword: reducerSet,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;