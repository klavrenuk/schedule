import React from 'react';

export default function Hour(props) {
    return (
        <div className={'hour'}>
            <div className={'hour-left_side'}>{props.hour}</div>
            <div className={'hour-line'}></div>
        </div>
    )
}