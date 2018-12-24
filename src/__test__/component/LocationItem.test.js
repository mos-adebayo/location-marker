import React from "react";
import { configure, shallow } from "enzyme";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import LocationItem from "../../components/Location/locations.items";

//Enzyme Configurations
import Adapter from 'enzyme-adapter-react-16';
import {appHelpers} from "../../_util";
configure({ adapter: new Adapter() });


const location = {
    "createdAt": 1545500440790,
    "updatedAt": 1545638365904,
    "id": "5c1e77186455a4178b6d771d",
    "address": "Ahmadu Bello Way, Lagos, Lagos",
    "latitude": 6.440976,
    "longitude": 3.402617,
    "country": "Nigeria",
    "countryCode": "NG"
};

function setup() {
    const props = {
        location: location,
        locateMarker: jest.fn(),
        removeMarker: jest.fn()
    };

    const enzymeWrapper = shallow(
        <LocationItem {...props} />
    );

    return {
        props,
        enzymeWrapper
    }
}

describe('Location Item component', () => {
    describe('Location Item', () => {
        test('component snapshot', () => {
            const component = renderer.create(
                <LocationItem location={location} locateMarker={jest.fn()} removeMarker={jest.fn()}/>,
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        test('component receives props and then renders successfully', () => {
            const { enzymeWrapper } = setup();
            //confirm location latitude and longitude is rendered
            expect(enzymeWrapper.contains((
                <p className={'truncate'}>{location.address}</p>
            ))).toBeTruthy();
            //confirm date is rendered
            expect(enzymeWrapper.contains((
                <p className={'grey-text'}>
                    <small>{appHelpers.formatDate(location.createdAt)}</small>
                </p>
            ))).toBeTruthy();
        });

        test('should call remove marker callback when the remove icon is clicked ', () => {
            const { enzymeWrapper, props } = setup();
            const target = enzymeWrapper.find('.remove-icon');
            target.simulate('click');
            expect(props.removeMarker.mock.calls.length).toBe(1)
        });

        test('should call locate callback when the locate icon is triggered ', () => {
            const { enzymeWrapper, props } = setup();
            const target = enzymeWrapper.find('.locate-icon');
            target.simulate('click');
            expect(props.locateMarker.mock.calls.length).toBe(1)
        });
    })
})
