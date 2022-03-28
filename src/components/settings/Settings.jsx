import React from 'react';
import { BsFillGearFill } from "react-icons/bs";
import {Button} from "reactstrap";

import SettingsModal from "./SettingsModal";

import './css/settings.min.css';

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
            <Button color={'icon'}
                className={'settings-button btn-icon--20'}
                onClick={() => toggleViewSettingsModal()}
            ><BsFillGearFill /></Button>

            <SettingsModal />
        </div>
    )
}

export default Settings;