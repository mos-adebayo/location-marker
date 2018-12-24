import React from "react";
import { configure, shallow } from "enzyme";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import { ComponentErrorMessage, AppErrorMessage } from "../../components/shared/PageError";


//Enzyme Configurations
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const errorMessage = 'Error message';

test('AppErrorMessage components snapshot', () => {
    const component = renderer.create(
        <AppErrorMessage message={errorMessage} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('AppErrorMessage component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppErrorMessage message={errorMessage} />, div);
    ReactDOM.unmountComponentAtNode(div);
});



test("AppErrorMessage component receives props and then renders text", () => {
    // Renders AppErrorMessage component with some text prop.
    const AppErrorMessageRender = shallow(<AppErrorMessage message={errorMessage} />);
    expect(AppErrorMessageRender.text()).toEqual(errorMessage)
});

test('ComponentErrorMessage components snapshot', () => {
    const component = renderer.create(
        <ComponentErrorMessage message={errorMessage} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('ComponentErrorMessage component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ComponentErrorMessage message={errorMessage} />, div);
    ReactDOM.unmountComponentAtNode(div);
});



test("ComponentErrorMessage component receives props and then renders text", () => {
    const ComponentErrorMessageRender = shallow(<ComponentErrorMessage message={errorMessage} />);
    expect(ComponentErrorMessageRender.contains((
        <h1 className={'center-align'}>
            <i className="large material-icons red-text">error</i>
        </h1>
    ))).toBeTruthy();
    expect(ComponentErrorMessageRender.contains((<p className={'center-align'}>{errorMessage}</p>))).toBeTruthy()
});
