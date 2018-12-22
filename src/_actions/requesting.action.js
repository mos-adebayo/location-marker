import {appConstants} from "../_constant";

function start() {
    return { type: appConstants.START_REQUEST, requesting: true };
}
function stop() {
    return { type: appConstants.STOP_REQUEST, requesting: false };
}

export const requestingActions = {
    start,
    stop
};
