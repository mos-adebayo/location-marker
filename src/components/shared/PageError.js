import React from 'react';

export const ComponentErrorMessage = ({message}) => {
    return (
        <div className={'section empty-container'}>
            <h1 className={'center-align'}>
                <i className="large material-icons red-text">error</i>
            </h1>
            <p className={'center-align'}>
                {message}
            </p>
        </div>
    );
};
export const AppErrorMessage = ({message}) => {
    return (
        <div className={'app-error red'}>
            <p className={'white-text'}>
                {message}
            </p>
        </div>
    );
};
