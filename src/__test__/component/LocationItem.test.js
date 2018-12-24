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
test('LocationItem components snapshot', () => {
    const component = renderer.create(
        <LocationItem location={location} locateMarket={()=>{}} removeMarker={()=>{}} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('LocationItem component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <LocationItem location={location} locateMarket={()=>{}} removeMarker={()=>{}} />,
         div);
    ReactDOM.unmountComponentAtNode(div);
});


test("LocationItem component receives props and then renders successfully", () => {
    const LocationItemRender = shallow(<LocationItem location={location} locateMarket={()=>{}} removeMarker={()=>{}} />);
    // confirm address is rendered
    expect(LocationItemRender.contains((
        <p className={'truncate'}>{location.address}</p>
    ))).toBeTruthy();
    //confirm location latitude and longitude is rendered
    expect(LocationItemRender.contains((
        <p>
            {location.latitude}, {location.longitude}
        </p>
    ))).toBeTruthy();
    //confirm date is rendered
    expect(LocationItemRender.contains((
        <p className={'grey-text'}>
            <small>{appHelpers.formatDate(location.createdAt)}</small>
        </p>
    ))).toBeTruthy();
});
