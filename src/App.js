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
        const { map, markersLayer } = this.state;
        markersLayer.setMarkersData([location])
            .addMarkers();
        const viewport = location.viewport;
        if (viewport) {
            map.fitBounds([viewport.topLeftPoint, viewport.btmRightPoint]);
        } else {
            map.fitBounds(markersLayer.getBounds());
        }
    };

    render() {
        return (
            <div>
                <div id = 'map'></div>
            </div>

        )
    }
}
export default App;
