import { combineReducers } from 'redux';

import { locations } from './location.reducer';
import { requesting } from './requesting.reducer';

const rootReducer = combineReducers({
    locations,
    requesting,
});

export default rootReducer;
