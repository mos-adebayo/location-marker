import React from 'react';
import {appHelpers} from "../../_util";

const LocationItemComponent = ({location, locateMarker, removeMarker}) => {
    return (
        <div className="card">
            <div className="card-content">
                <p className={'grey-text'}>
                    <small>Address</small>
                </p>
                <p className={'truncate'}>{location.address}</p>
                <p className={'grey-text'}>
                    <small>Latitude, Longitude</small>
                </p>
                <p>
                    {location.latitude}, {location.longitude}
                </p>
            </div>
            <div className="card-footer card-content grey lighten-4">
               <div className="row">
                    <div className={'left'}>
                        <a onClick={(e) => locateMarker(e, location)} href={'/'} className={'locate-icon'}>
                            <i className="tiny material-icons">search</i>
                        </a>
                             &nbsp;
                        <a onClick={(e) => removeMarker(e, location)} href={'/'} className={'text-red remove-icon'}>
                             <i className="tiny material-icons red-text">delete</i>
                         </a>
                    </div>
                    <div className={'right'}>
                        <p className={'grey-text'}>
                            <small>{appHelpers.formatDate(location.createdAt)}</small>
                        </p>
                    </div>
               </div>

            </div>
        </div>
    );
};

export default LocationItemComponent;
