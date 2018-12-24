import { appConstants } from '../_constant';
import {initialState} from "../_store";

const initialState2 = [
    {
        error: null,
        requesting: false,
    }
];

export function error(state = initialState.error, action) {
    switch (action.type) {
        case appConstants.SET_ERROR:
            return action.error;
        case appConstants.CLEAR_ERROR:
            return null;
        default:
          return state
      }
}
