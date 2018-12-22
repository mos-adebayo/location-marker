import { appConstants } from '../_constant';
import {initialState} from "../_store";

export function requesting(state=initialState.requesting, action) {
    switch (action.type) {
        case appConstants.START_REQUEST:
            return action.requesting;
        case appConstants.STOP_REQUEST:
            return action.requesting;
        default:
          return state
      }
}
