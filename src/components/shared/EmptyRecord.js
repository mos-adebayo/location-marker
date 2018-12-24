import React from 'react';

const EmptyRecord = ({message}) => {
    return (
        <div className={'section empty-container'}>
            <h1 className={'center-align'}>
                <i className="large material-icons">info</i>
            </h1>
            <p className={'center-align'}>
                {message}
            </p>
        </div>
    );
};

export default EmptyRecord;
