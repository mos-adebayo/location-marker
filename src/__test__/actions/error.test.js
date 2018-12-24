import configureStore from 'redux-mock-store';
import {errorActions} from "../../_actions/error.action";
import {appConstants} from "../../_constant";

const mockStore = configureStore();
const store = mockStore();

describe('select_actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
});

describe('Error Action', () => {
    test('Dispatches `SET_ERROR` action and payload', () => {
        const setExpectedActionPayload = [
            {
                'error': 'error',
                'type': appConstants.SET_ERROR,
            },
        ];

       store.dispatch(errorActions.setError('error'));
       expect(store.getActions()).toEqual(setExpectedActionPayload);
    });
});

describe('Error Action Snapshot', () => {
    test('Dispatches the correct action and payload', () => {
        store.dispatch(errorActions.setError('error'));
        expect(store.getActions()).toMatchSnapshot();
    });
});
