import React from 'react';

const LocationItemsComponent = ({location, locateMarker, removeMarker}) => {
    return (
        <div className="card">
            <div className="card-content">
                <p className={'truncate'}>{location.address}</p>
                <p>
                    Lat: {location.latitude}
                </p>
                <p>
                    Lng: {location.longitude}
                </p>
            </div>
            <div className="card-content grey lighten-4">
                <a onClick={(e) => locateMarker(e, location)} href={'/'} className={''}>
                    <i className="material-icons">search</i>
                </a>
                &nbsp;<a onClick={(e) => removeMarker(e, location)} href={'/'} className={'text-red'}>
                <i className="material-icons red-text">delete</i>
            </a>
            </div>
        </div>
    );
};

export default LocationItemsComponent;
