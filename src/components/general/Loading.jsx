import React from 'react';

import LoaderImg from './images/loader.gif';

import './styles/loading.min.css';

/*
    Types:
        - page
        - modal
        - tasks
*/


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