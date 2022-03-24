import React from 'react';

import './css/tabs.min.css';

export default function Tabs(props) {
    const options = ['Tasks', 'Completed'];

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
                           onClick={() => props.setActionView(option.toLowerCase())}
                        >
                            {option}
                        </a>
                    )
                })
            }
        </nav>
    )
}