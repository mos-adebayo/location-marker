import React from 'react';
import './App.css';
import {connect} from "react-redux";
import { commonService } from "./_service";
import Loader from "./Loader";
import {requestingActions} from "./_actions/requesting.action";
import {appConstants} from "./_constant";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            locations: [],
            map : null,
            markerOptions : null,
            markersLayer: null,
            addMarkerManually: true
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
                this.setState({locations});
                this.addMarkersOnMap(locations);
                console.log('loc', locations);
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
            .then(locations => {
                dispatch(requestingActions.stop());
                this.setState({locations});
            });
    }
    createMarker = (location) => {
        commonService.createLocation({
            address: location.address.freeformAddress,
            latitude: location.position.lat,
            longitude: location.position.lon,
            country: location.address.country,
            countryCode: location.address.countryCode,
        }).then(location => {
            const { locations } = this.state;
            locations.push(location);
            this.setState({locations});
            this.addMarkerToMap(location);
        }).catch(err =>{

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

       window.tomtom.reverseGeocode({position: mark.target.getLatLng()})
            .go( (response) => {
                const position = response.position.split(",");
                commonService.updateLocation({
                    address: response.address.freeformAddress,
                    latitude: position[0],
                    longitude: position[1],
                    country: response.address.country,
                    countryCode: response.address.countryCode,
                    id
                }).then(res =>{
                    if (response && response.address && response.address.freeformAddress) {
                        marker.setPopupContent(response.address.freeformAddress);
                    } else {
                        marker.setPopupContent('No results found');
                    }
                    marker.openPopup();
                    dispatch(requestingActions.stop());
                    this.fetchLocations();
                });
            })
    }

    removeMarker = (e, target) => {
        const { dispatch } = this.props;
        e.preventDefault();

        if(window.confirm("Are you sure you want to remove this marker?")){
            dispatch(requestingActions.start());
            //delete marker
            commonService.removeLocation({
                id: target.id
            }).then(res =>{
                this.fetchLocations();
                window.location.reload();
            }).catch(err =>{
                dispatch(requestingActions.stop());
                window.alert('Currently unable to remove data')
            });

        }

    }

    locateMarker = (e, target) => {
        e.preventDefault();
        this.positionMap(target.viewport)

    }

    positionMap = (viewport) => {
        const { map , markersLayer } = this.state;
        if (viewport) {
            map.fitBounds([viewport.topLeftPoint, viewport.btmRightPoint]);
        } else {
            map.fitBounds(markersLayer.getBounds());
        }
    }

    render() {
        const { locations } = this.state;
        const {  requesting } = this.props;
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
                    <h4>Address</h4>
                    {
                        locations.map((item, key) => {
                            return (<div key={key} className={'col s6'}>
                                <div className="card">
                                    <div className="card-content">
                                        <p>{item.address}</p>
                                        <p>
                                            Lat: {item.latitude}
                                        </p>
                                        <p>
                                            Lng: {item.longitude}
                                        </p>
                                    </div>
                                    <div className="card-content grey lighten-4">
                                        <a onClick={(e) => this.locateMarker(e, item)} href={'/'} className={''}>
                                            <i className="material-icons">create</i>
                                        </a>
                                        &nbsp;<a onClick={(e) =>this.removeMarker(e, item)} href={'/'} className={'text-red'}>
                                        <i className="material-icons red-text">delete</i>
                                    </a>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { locations, requesting } = state;
    return {
        locations,
        requesting
    };
}
export default connect(mapStateToProps)(App);
