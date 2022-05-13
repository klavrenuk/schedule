import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Row, Col} from "reactstrap";

import Loading from "../general/Loading";
import EventFormItem from "./EventFormItem";
import ErrorMessageLine from "../general/ErrorMessageLine";

import './css/event_page.min.css';

const EventPage = forwardRef((props, ref) => {
    const [isShow, setIsShow] = useState(false);

    const isLoading = props.isLoading;
    const errorMessage = props.errorMessage;
    const options = props.options;

    useImperativeHandle(ref, () => ({
        show() {
            setIsShow(true);
        }
    }));

    const close = () => setIsShow(false);

    return (
        <div className={isShow ? 'event_page show' : 'event_page'}>
            {
                isShow ?
                    <div>
                        {
                            isLoading ?
                                <Loading type="page" />
                                :
                                <div className={'event_page-content'}>
                                    <Row>
                                        <Col sm={12}>
                                            <h1 className={'event_page-content-title'}>
                                                New event
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            {
                                                options.map((option) => {
                                                    return <EventFormItem key={option.name}
                                                                          data={option}
                                                    />
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <ErrorMessageLine message={errorMessage} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} className={'text-right'}>
                                            <Button color="link" onClick={close}>close</Button>
                                            <Button color="primary"
                                                    onClick={props.onSave}
                                            >save</Button>
                                        </Col>
                                    </Row>
                                </div>
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
})

export default EventPage;