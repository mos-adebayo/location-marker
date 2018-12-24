import configureStore from 'redux-mock-store';
import { requestingActions } from "../../_actions/requesting.action";
import {appConstants} from "../../_constant";

const mockStore = configureStore();
const store = mockStore();

describe('select_actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
});

describe('Requesting Action', () => {
    test('Dispatches `START_REQUEST` action and payload', () => {
        const setExpectedActionPayload = [
            {
                'requesting': false,
                'type': appConstants.STOP_REQUEST,
            },
        ];

       store.dispatch(requestingActions.stop());
       expect(store.getActions()).toEqual(setExpectedActionPayload);
    });
});

describe('Requesting Action Snapshot', () => {
    test('Dispatches the correct action and payload', () => {
        store.dispatch(requestingActions.stop());
        expect(store.getActions()).toMatchSnapshot();
    });
});
