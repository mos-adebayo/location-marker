import {appConstants} from "../_constant";

function setError(error) {
    return { type: appConstants.SET_ERROR, error };
}
function clearError() {
    return { type: appConstants.CLEAR_ERROR, error: null };
}

export const errorActions = {
    setError,
    clearError
};
