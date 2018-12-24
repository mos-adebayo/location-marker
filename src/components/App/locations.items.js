import React from 'react';
import {appHelpers} from "../../_util";

const LocationItemsComponent = ({location, locateMarker, removeMarker}) => {
    return (
        <div className="card">
            <div className="card-content">
                <p className={'grey-text'}>
                    <small>Address</small>
                </p>
                <p className={'truncate'}>{location.address}</p>
                <p className={'grey-text'}>
                    <small>Marker</small>
                </p>
                <p>
                    {location.latitude}, {location.longitude}
                </p>
            </div>
            <div className="card-footer card-content grey lighten-4">
               <div className="row">
                    <div className={'left'}>
                        <a onClick={(e) => locateMarker(e, location)} href={'/'} className={''}>
                            <i className="tiny material-icons">search</i>
                        </a>
                             &nbsp;
                        <a onClick={(e) => removeMarker(e, location)} href={'/'} className={'text-red'}>
                             <i className="tiny material-icons red-text">delete</i>
                         </a>
                    </div>
                    <div className={'right'}>
                        <p className={'grey-text'}>
                            {appHelpers.formatDate(location.createdAt)}
                        </p>
                    </div>
               </div>

            </div>
        </div>
    );
};

export default LocationItemsComponent;
