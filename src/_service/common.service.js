import { appConstants } from '../_constant';
import { appHelpers } from '../_util';


export const commonService = {
    getLocations,
    createLocation,
    updateLocation,
    removeLocation,
};
function getLocations() {
    return appHelpers.getRequest(`${appConstants.BASE_URL }/location`)
        .then(res => {
            return res;
        }).catch(
            error => {
                return appHelpers.interpretErrorResponse(error);
            }
        );
}
function createLocation(payload) {
    return appHelpers.postRequest(`${appConstants.BASE_URL }/location`, payload)
        .then(res => {
            return res;
        }).catch(
            error => {
                return appHelpers.interpretErrorResponse(error);
            }
        );
}
function updateLocation(payload) {
    return appHelpers.putRequest(`${appConstants.BASE_URL }/location/${payload.id}`, payload)
        .then(res => {
            return res;
        }).catch(
            error => {
                return appHelpers.interpretErrorResponse(error);
            }
        );
}
function removeLocation(payload) {
    return appHelpers.deleteRequest(`${appConstants.BASE_URL }/location/${payload.id}`)
        .then(res => {
            return res;
        }).catch(
            error => {
                return appHelpers.interpretErrorResponse(error);
            }
        );
}
