import React from 'react';
import {connect} from "react-redux";
import { commonService } from "../../_service";
import Loader from "../shared/Loader";
import {requestingActions} from "../../_actions/requesting.action";
import {appConstants} from "../../_constant";
import LocationItemsComponent from "./locations.items";
import EmptyRecord from "../shared/EmptyRecord";
import { AppErrorMessage, ComponentErrorMessage } from "../shared/PageError";
import {errorActions} from "../../_actions/error.action";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            locations: [],
            map : null,
            markerOptions : null,
            markersLayer: null,
            addMarkerManually: true,
            componentError: false,
        }
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
        document.body.appendChild(script);
        script.async = true;
        script.onload =  () => {
            this.initiateMap()
        }
    }
    initiateMap = () => {
        const { dispatch } = this.props;

        dispatch(requestingActions.start());

        commonService.getLocations()
            .then(locations => {
                dispatch(requestingActions.stop());
                if(locations.status === appConstants.REQUEST_SUCCESS){
                    this.setState({locations : locations.data});
                    this.addMarkersOnMap(locations.data);
                }else if (locations.status === appConstants.REQUEST_ERROR){
                    this.setState({componentError: locations.error})
                }
            });

        const map = window.tomtom.L.map('map', {
            source: 'vector',
            key: 'oxmt4h5p1PFToAykPhSSHQtoOfM35VVx',
            basePath: '/sdk',
            zoom: 15
        });
        //todo set map to current location
        map.setView([10, 10], appConstants.MAP_ZOOM_LEVEL);

        // SearchBox with location button and Polish language
        let searchBoxInstance = new window.tomtom.L.SearchBox({
            location: true,
            language: 'pl-PL',
            view: 'IN',
            position: 'topright',
            serviceOptions: {unwrapBbox: true}

        });
        searchBoxInstance.addTo(map);

        // Add a marker to indicate the position of the result selected by the user
        searchBoxInstance.on(searchBoxInstance.Events.ResultClicked, (result) => {
            this.createMarker(result.data);
        });

        this.setState({map})
    };

    addMarkersOnMap = (location) =>{
        location.map((item) => {
            return this.addMarkerToMap(item)
        });
    };

    fetchLocations = () => {
        const { dispatch } = this.props;
        dispatch(requestingActions.start());
        return commonService.getLocations()
            .then(response => {
                dispatch(requestingActions.stop());
                if(response.status === appConstants.REQUEST_SUCCESS) {
                    const locations = response.data;
                    this.setState({locations});
                }else if (response.status === appConstants.REQUEST_ERROR){
                    dispatch(errorActions.setError(response.error));
                }
            });
    }
    createMarker = (location) => {
        const { dispatch } = this.props;
        dispatch(requestingActions.start());
        dispatch(errorActions.clearError());
        commonService.createLocation({
            address: location.address.freeformAddress,
            latitude: location.position.lat,
            longitude: location.position.lon,
            country: location.address.country,
            countryCode: location.address.countryCode,
        }).then(response => {
            dispatch(requestingActions.stop());
            if(response.status === appConstants.REQUEST_SUCCESS){
                const { locations } = this.state;
                const location = response.data;
                locations.push(location);
                this.setState({locations});
                this.addMarkerToMap(location);
            }else if (response.status === appConstants.REQUEST_ERROR){
                dispatch(errorActions.setError(response.error));
            }

        }).catch(err =>{
            dispatch(requestingActions.stop());
        })

    };

    addMarkerToMap = (location) => {
        const { map } = this.state;
        const marker = window.tomtom.L.marker([location.latitude, location.longitude], {
            draggable: true
        }).bindPopup(location.address)
            .addTo(map);

        marker.on('dragend',  (e) => {
            this.editMarker(e, marker, location.id);
        });

        map.setView([location.latitude, location.longitude], appConstants.MAP_ZOOM_LEVEL);

    };

    editMarker = (mark, marker, id) => {
        this.setState({allowAddMarker: false});
        const { dispatch } = this.props;
        dispatch(requestingActions.start());
        dispatch(errorActions.clearError());

        window.tomtom.reverseGeocode({position: mark.target.getLatLng()})
            .go( (response) => {
                const position = response.position.split(",");
                if (response && response.address && response.address.freeformAddress) {
                    marker.setPopupContent(response.address.freeformAddress);
                } else {
                    marker.setPopupContent('No results found');
                }
                commonService.updateLocation({
                    address: response.address.freeformAddress,
                    latitude: position[0],
                    longitude: position[1],
                    country: response.address.country,
                    countryCode: response.address.countryCode,
                    id
                }).then(response =>{
                    marker.openPopup();
                    dispatch(requestingActions.stop());
                    if(response.status === appConstants.REQUEST_SUCCESS) {
                        this.fetchLocations();
                    }else if (response.status === appConstants.REQUEST_ERROR) {
                        dispatch(errorActions.setError(response.error));
                    }
                });
            })
    }

    removeMarker = (e, target) => {
        const { dispatch } = this.props;
        e.preventDefault();
        if(window.confirm("Are you sure you want to remove this marker?")){
            dispatch(requestingActions.start());
            commonService.removeLocation({
                id: target.id
            }).then(response =>{
                if(response.status === appConstants.REQUEST_SUCCESS) {
                    window.location.reload();
                }else if (response.status === appConstants.REQUEST_ERROR) {
                    dispatch(errorActions.setError(response.error));
                }
            })
        }
    }

    locateMarker = (e, target) => {
        const { map } = this.state;
        e.preventDefault();
        map.setView([target.latitude, target.longitude], appConstants.MAP_EXTRA_ZOOM_LEVEL);
    }

    render() {
        const { locations, componentError } = this.state;
        const {  requesting, error } = this.props;
        return (
            <div>
                {
                    requesting &&
                    <Loader/>
                }
                <div className={'row'}>
                    <div className="col s6">
                        <div id = 'map'>&nbsp;</div>
                    </div>
                    <div className="col s6">

                        {
                            error &&
                            <AppErrorMessage message={error}/>
                        }

                        {componentError && !requesting &&
                            <ComponentErrorMessage message={componentError}/>
                        }
                        {((!componentError && !requesting) || (locations.length !== 0)) &&
                             (
                                 <div>
                                     <div className="section">
                                         <h5 className={'col s12 records-header'}>
                                             My Locations
                                         </h5>
                                     </div>
                                     <div>
                                         {
                                             locations.map((item, key) => {
                                                 return (<div key={key} className={'col s6'}>
                                                     <LocationItemsComponent location={item} locateMarker={this.locateMarker} removeMarker={this.removeMarker}/>
                                                 </div>)
                                             })
                                         }
                                     </div>
                                 </div>

                             )
                        }

                        {
                            (!requesting && locations.length === 0 && !componentError)  &&
                                <EmptyRecord message={'No record yet!'}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { requesting, error } = state;
    return {
        requesting,
        error
    };
}
export default connect(mapStateToProps)(App);
