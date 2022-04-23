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
    const [isSave, setIsSave] = useState(false);
    const classNames = props.classNames ? props.classNames : '';
    const id = 'Input-' + props.parentElem;

    useEffect(() => {
        if(isSave) {
            if(isEmptyValue(value) && props.hasOwnProperty('close')) {
                setValue(props.value);
                props.close();

            } else {
                props.save(value);
            }
        }

        return () => {
            setIsSave(false);
        }
    }, [isSave]);

    const isEmptyValue = (value) => {
        if(value === '' || value.trim() === '') {
            return true;
        } else {
            return false;
        }
    }

    const destroyListener = () => setIsSave(true);

    const onKeyDown = (event) => {
        if(event.code === 'Enter' || event.code == 'Escape') {
            setIsSave(true);
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