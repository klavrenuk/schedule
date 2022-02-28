import React from 'react';

export default function TimeGrid() {

    function getHours() {
        let arr = [];

        for(let i = 0; i < 24; i++) {
            arr.push(i + '0:00');
        }

        return arr;
    }

    const listHours = getHours();


    return (
        <div>
            {
                listHours.map((hour) => {
                    <div key={hour}>Hello from hour {{hour}}</div>
                })
            }
        </div>
    )
}