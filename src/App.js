import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            markers: [],
            map : null,
            markerOptions : null,
            markersLayer: null
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
        let { map, markers } = this.state;
        let markerOptions = {
            icon: window.tomtom.L.svgIcon({
                icon: {
                    icon: 'fa fa-camera',
                    iconSize: [32, 37],
                    iconAnchor: [16, 2],
                    style: {
                        color: '#fff'
                    },
                    noPlainSVG: true
                }
            })
        };
         map = window.tomtom.L.map('map', {
            source: 'vector',
            key: 'oxmt4h5p1PFToAykPhSSHQtoOfM35VVx',
            basePath: '/sdk',
            zoom: 15
        });

        markers.map((item) => {
             return window.tomtom.L.marker([item.lat, item.lng], markerOptions).addTo(map);
         });

        //todo set default to location
        map.setView([39, -97.5], 4);

        // SearchBox with location button and Polish language
        let searchBoxInstance = new window.tomtom.L.SearchBox({
            location: true,
            language: 'pl-PL',
            view: 'IN',
            position: 'topright',
            serviceOptions: {unwrapBbox: true}

        });
        searchBoxInstance.addTo(map);

        // Marker layer to display the results over the map
        let markersLayer = window.tomtom.L.tomTomMarkersLayer().addTo(map);

        // Add a marker to indicate the position of the result selected by the user
        searchBoxInstance.on(searchBoxInstance.Events.ResultClicked, (result) => {
            this.populateMap(result.data);
        });

        this.setState({map, markersLayer})
    };

    populateMap = (location) => {
        let { map, markersLayer, markers } = this.state;
        markersLayer.setMarkersData([location])
            .addMarkers();
        const viewport = location.viewport;
        if (viewport) {
            map.fitBounds([viewport.topLeftPoint, viewport.btmRightPoint]);
        } else {
            map.fitBounds(markersLayer.getBounds());
        }

        markers.push(location);
        this.setState({markers})

    };

    removeMarker = (e, target) => {
        const { markers, markersLayer } = this.state;
        target = [target];
        e.preventDefault();

        markersLayer.clearLayers();

        let resultantMarkers = markers.filter(x => !target.includes(x));

        markersLayer.setMarkersData(resultantMarkers).addMarkers();

        this.setState({markers: resultantMarkers})

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
        const { markers } = this.state;
        return (
            <div className={'row'}>
                <div className="col s6">
                    <div id = 'map'>&nbsp;</div>
                </div>
                <div className="col s6">
                    <h4>Address</h4>
                    {
                        markers.map((item, key) => {
                            return (<div key={key} className={'col s6'}>
                                <div className="card">
                                    <div className="card-content">
                                        <p>{item.address.freeformAddress}</p>
                                        <p>
                                            Lat: {item.position.lat}
                                        </p>
                                        <p>
                                            Lng: {item.position.lon}
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

        )
    }
}
export default App;
