import React from 'react';
import {Button} from 'reactstrap';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const NavigationDays = () => {
    return (
        <div className={'navigation_days'}>
            <Button
                color={'link'}
                className={'navigation_days-arrow navigation_days-arrow--prev'}
            >
                <BsChevronLeft />
            </Button>
            <Button color={'link'}
                    className={'navigation_days-today'}
            >Today</Button>
            <Button
                color={'link'}
                className={'navigation_days-arrow navigation_days-arrow-next'}
            >
                <BsChevronRight />
            </Button>
        </div>
    )
}

export default NavigationDays;