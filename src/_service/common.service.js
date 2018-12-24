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
        });
}
function createLocation(payload) {
    return appHelpers.postRequest(`${appConstants.BASE_URL }/location`, payload)
        .then(res => {
            return res;
        })
}
function updateLocation(payload) {
    return appHelpers.putRequest(`${appConstants.BASE_URL }/location/${payload.id}`, payload)
        .then(res => {
            return res;
        })
}
function removeLocation(payload) {
    return appHelpers.deleteRequest(`${appConstants.BASE_URL }/location/${payload.id}`)
        .then(res => {
            return res;
        })
}
