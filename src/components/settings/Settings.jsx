import React from 'react';
import { BsFillGearFill } from "react-icons/bs";
import {Button} from "reactstrap";

import SettingsModal from "./SettingsModal";

const Settings = () => {
    const toggleSettingsModal = () => {
        const elem = document.getElementById('SettingsModal');

        console.log(elem);

        if(elem) {
            if(elem.classList.contains('show')) {
                elem.classList.remove('show');
            } else {
                elem.classList.add('show');
            }
        }
    }

    return (
        <div className={'settings'}>
            <Button
                color={'icon'}
                onClick={() => toggleSettingsModal()}
            ><BsFillGearFill /></Button>

            <SettingsModal />
        </div>
    )
}

export default Settings;