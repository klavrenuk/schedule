import React from 'react';
import {Button} from 'reactstrap';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import './css/navigationDays.min.css';

const buttons = [
    {
        classNames: 'navigation_days-button navigation_days-button--arrow navigation_days-button--arrow_prev',
        text: <BsChevronLeft />,
        name: 'prev'
    },
    {
        classNames: 'navigation_days-button navigation_days-button--text',
        text: 'Today',
        name: 'today'
    },
    {
        classNames: 'navigation_days-button navigation_days-button--arrow navigation_days-button--arrow_next',
        text: <BsChevronRight />,
        name: 'next'
    }
];

const NavigationDays = () => {
    return (
        <div className={'navigation_days'}>
            {
                buttons.map((button) => {
                    return (
                        <Button
                            color={'link'}
                            key={button.name}
                            name={button.name}
                            className={button.classNames}
                        >
                            {button.text}
                        </Button>
                    )
                })
            }
        </div>
    )
}

export default NavigationDays;