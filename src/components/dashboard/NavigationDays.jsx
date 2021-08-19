import React from 'react';
import {Button} from 'reactstrap';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import './css/navigationDays.min.css';

const NavigationDays = () => {
    return (
        <div className={'navigation_days'}>
            <Button
                color={'link'}
                className={'navigation_days-button navigation_days-button--arrow navigation_days-button--arrow_prev'}
            ><BsChevronLeft /></Button>

            <Button color={'link'}
                    className={'navigation_days-button'}
            >Today</Button>
            <Button
                color={'link'}
                className={'navigation_days-button navigation_days-button--arrow navigation_days-button--arrow_next'}
            ><BsChevronRight /></Button>
        </div>
    )
}

export default NavigationDays;