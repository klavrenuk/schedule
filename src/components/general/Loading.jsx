import React from 'react';

import LoaderImg from './images/loader.gif';

import './styles/loader.min.css';

export default function Loading(props) {
    let classNames = 'loading';

    if(props.type) {
        classNames += ' loading--' + props.type;
    }

    return(
        <div className={classNames}>
            <img src={LoaderImg} alt={'Loading...'} />
        </div>
    )
}