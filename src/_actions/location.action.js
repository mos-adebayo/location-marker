import {appConstants} from '../_constant';
import { commonService } from '../_service';
import {requestingActions} from "./requesting.action";

function getLocations() {
    return dispatch => {
        dispatch(requestingActions.start());
        return commonService.getLocations()
            .then (response => {
                    dispatch(success(response));
                    dispatch(requestingActions.stop());
                },
                error => {
                    let errorMessage = (error.response.data) ? error.response.data : 'Unable to handle request';
                    dispatch(failure(errorMessage));
                    dispatch(requestingActions.stop());
                })
    };

    function success(locations) { return { type: appConstants.ALL_LOCATIONS, locations } }
    function failure(message) { return { type: appConstants.APP_ERROR, message } }

}

export const locationActions = {
    getLocations
}
