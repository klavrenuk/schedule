import React from 'react';

import './css/tabs.min.css';

export default function Tabs(props) {
    const options = props.options;

    return (
        <nav className={'tabs'}>
            {
                options.map((option) => {
                    return (
                        <a className={
                            props.activeView === option.toLowerCase() ?
                                'active tabs-link' : 'tabs-link'
                        }
                           key={option}
                           onClick={() => props.onChange(option.toLowerCase())}
                        >
                            {option}
                        </a>
                    )
                })
            }
        </nav>
    )
}