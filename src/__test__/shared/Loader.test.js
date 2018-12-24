import React from "react";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import Loader from "../../components/shared/Loader";

test('Loader components snapshot', () => {
    const component = renderer.create(
        <Loader />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Loader component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
