import { combineReducers } from 'redux';

import { requesting } from './requesting.reducer';
import { error } from './error.reducer';

const rootReducer = combineReducers({
    error,
    requesting,
});

export default rootReducer;
