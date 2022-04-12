import React, {useEffect, useState} from 'react';
import {Input} from "reactstrap";

import WrapClickListener from "./WrapClickListener";

import './css/input_in_list.min.css';

export default function InputInList(props) {
    const requiredOptions = [
        'close',
        'parentElem'
    ];

    for(let option of requiredOptions) {
        if(!props.hasOwnProperty(option)) {
            return null
        }
    }

    const [value, setValue] = useState(props.value || '');
    const classNames = props.classNames ? props.classNames : '';
    const id = 'Input-' + props.parentElem;

    useEffect(() => {
        // check
    }, [props.isEdit, value]);


    const destroyListener = () => {
        console.log('destroyListener', value);
        setTimeout(() => {
            console.log('value timeout', value);
        }, 2000);

        // const input = document.getElementById('Input-' + props.parentElem);
        // console.log(input);

        props.close(value);
    }

    const onKeyDown = (event) => {
        if(event.code === 'Enter' || event.code == 'Escape') {
            console.log('onkeyDown');
            props.close(value);
        }
    }

    const onChange = (event) => setValue(event.target.value);

    return (
        <div className={'input_in_list'}>
            <Input id={id}
                   className={classNames}
                   value={value}
                   onKeyDown={(event) => onKeyDown(event)}
                   onChange={(event) => onChange(event)}
                   disabled={!props.isEdit}
            />

            <WrapClickListener parentElem={props.parentElem}
                               isEdit={props.isEdit}
                               destroyListener={destroyListener}
            />
        </div>
    )
}