import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {useDispatch} from "react-redux";
import {Row, Col, Button} from 'reactstrap';

import './styles/alert_error.min.css';

const AlertError = forwardRef((props, ref) => {
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        show(message = '') {
            setIsShow(true);
            setMessage(message);
            setTimeout(() => close(), 10000);
        }
    }))

    const close = () => {
        if(isShow) {
            dispatch({
                type: 'setError',
                value: null
            });
            setIsShow(false);
        }
    }

    if(!isShow) {
        return false;
    }

    return (
        <div className={'alert_error'}>
            <Row className={'flex flex--align_center'}>
                <Col sm={10}>{message}</Col>
                <Col sm={2}>
                    <Button color={'close'}
                            onClick={() => close()}
                    ></Button>
                </Col>
            </Row>

        </div>
    )
})

export default AlertError;