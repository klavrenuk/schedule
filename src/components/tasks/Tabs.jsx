import React from 'react';

export default function Tabs(props) {
    const options = ['Tasks', 'Completed'];

    return (
        <nav className={'tabs'}>
            {
                options.map((option) => {
                    return (
                        <a className={
                            props.activeView === option ?
                                'active tabs-link' : 'tabs-link'
                        }
                           onClick={() => props.setActionView(option)}
                        >
                            {option}
                        </a>
                    )
                })
            }
        </nav>
    )
}