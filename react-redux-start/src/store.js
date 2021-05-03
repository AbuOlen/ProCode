import { createStore, combineReducers } from 'redux';
import reducerCount from './reducers/count';
import reducerStatus from './reducers/status';

const rootReducer = combineReducers({
    count: reducerCount,
    status: reducerStatus,
})

const store = createStore(rootReducer);

export default store;