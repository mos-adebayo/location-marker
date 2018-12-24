import React from "react";
import { configure, shallow } from "enzyme";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import EmptyRecord from "../../components/shared/EmptyRecord";


//Enzyme Configurations
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const message = 'No data yet!';

test('EmptyRecord components snapshot', () => {
    const component = renderer.create(
        <EmptyRecord message={message} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('EmptyRecord component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmptyRecord message={message} />, div);
    ReactDOM.unmountComponentAtNode(div);
});


test("EmptyRecord component receives props and then renders text", () => {
    const ComponentErrorMessageRender = shallow(<EmptyRecord message={message} />);
    expect(ComponentErrorMessageRender.contains((
        <h1 className={'center-align'}>
            <i className="large material-icons">info</i>
        </h1>
    ))).toBeTruthy();
    expect(ComponentErrorMessageRender.contains((<p className={'center-align'}>{message}</p>))).toBeTruthy()
});
