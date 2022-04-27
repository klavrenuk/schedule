import React, {useEffect, useState} from 'react';

import Hour from './Hour';

import './css/time_grid.min.css';

const getHours = () => {
    let arr = [];

    for(let i = 0; i < 24; i++) {
        arr.push(i);
    }

    return arr;
}

const hoursDefault = getHours();

export default function TimeGrid() {
    const [hours, setHours] = useState(hoursDefault);
    const [gridHeight, setGridHeight] = useState(0);

    const calcHeight = () => {
        const elms = ['DashboardHeader', 'ScheduleDay', 'TasksAllDay'];
        const docHeight = document.body.clientHeight;

        let item = null,
            sumElms = 0;

        for(let elem of elms) {
            item = document.querySelector(`#${elem}`);

            if(item) {
                sumElms += item.clientHeight;
            }
        }

        setGridHeight(docHeight - sumElms);
    }

    useEffect(() => {
        calcHeight();
    }, []);

    return (
        <div className={'time_grid'}
             style={{'height': gridHeight}}
        >
            {
                hours.map((hour) => {
                    return (
                        <Hour key={hour}
                              hour={hour}
                        />
                    )
                })
            }
        </div>
    )
}