import React from 'react';

import LoaderImg from './images/loader.gif';

import './styles/loader.min.css';

export default function Loading(props) {
    let classNames = 'loading';

    switch (props.type) {
        case 'modal':
            classNames += ' loading--modal';
            break;

    }

    return(
        <div className={classNames}>
            <img src={LoaderImg} alt={'Loading...'} />
        </div>
    )
}