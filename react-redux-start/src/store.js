import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducerCount from './reducers/count';
import reducerStatus from './reducers/status';
import dogState from './reducers/newDog';

const rootReducer = combineReducers({
    count: reducerCount,
    status: reducerStatus,
    urlDog: dogState,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;