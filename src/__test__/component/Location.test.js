
import React from "react";
import { configure, shallow } from "enzyme";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import { Location } from "../../components/Location";
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import {appHelpers} from "../../_util";
import {ComponentErrorMessage} from "../../components/shared/PageError";

const mockStore = configureStore();
const store = mockStore();


//Enzyme Configurations
configure({ adapter: new Adapter() });

function setup() {
    const props = {
        addTodo: jest.fn()
    }

    const enzymeWrapper = shallow(
        <Provider store={store}>
            <Location />
        </Provider>
    )

    return {
        props,
        enzymeWrapper
    }
}

test('LocationItem components snapshot', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <Location />
        </Provider>
        ,
        div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Initial state of Location component', () => {
    const AppRender = shallow(
        <Provider store={store}>
            <Location />
        </Provider>
    );
    const AppRenderInstance = AppRender.instance();
    expect(AppRender.state('componentError')).toBeFalsy(); //default state of modal
    // AppRenderInstance.fetchCoinItem({}); //trigger function to show modal

});
