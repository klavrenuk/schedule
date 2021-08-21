import React from 'react';
import { BsFillGearFill } from "react-icons/bs";
import {Button} from "reactstrap";

const Settings = () => {
    return (
        <div className={'settings'}>
            <Button
                color={'icon'}
            ><BsFillGearFill /></Button>
        </div>
    )
}

export default Settings;