import React from 'react';


export default function Section(props) {
    console.log('section', props);

    return (
        <li>
            Section { props.data._id }
        </li>
    )
}