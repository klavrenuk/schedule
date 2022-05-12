import React from 'react';

import './styles/error_message_line.min.css';

export default function ErrorMessageLine(props) {
    if(!props.message) {
        return null;
    } else {
        return <p className={'errorMessage'}>{ props.message }</p>;
    }
}