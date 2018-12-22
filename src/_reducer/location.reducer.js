import {appConstants} from '../_constant';
import {initialState} from "../_store";

export function locations(state=initialState.locations, action) {
    switch (action.type) {
        case appConstants.ALL_LOCATIONS:
            return action.locations;
        default:
            return state
    }
}
