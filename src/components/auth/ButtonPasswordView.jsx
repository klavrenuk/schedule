import React from 'react';
import {Button} from 'reactstrap';
import { AiFillEye } from "react-icons/ai";

import './styles/btn_password_view.min.css';

export default function ButtonPasswordView(props) {
    const data = props.data;

    if(data.type !== 'password') {
        return false;
    }

    return (
        <Button color={'icon'}
                className={'btn_password_view'}
                onClick={() => props.onShowPassword(data.name)}
        >
            <AiFillEye />
        </Button>
    )
}