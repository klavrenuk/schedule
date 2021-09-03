import React from 'react';
import { BsFillGearFill } from "react-icons/bs";
import {Button} from "reactstrap";

import SettingsModal from "./SettingsModal";

const Settings = () => {
    const toggleViewSettingsModal = () => {
        const elem = document.getElementById('SettingsModal');

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
                onClick={() => toggleViewSettingsModal()}
            ><BsFillGearFill /></Button>

            <SettingsModal />
        </div>
    )
}

export default Settings;