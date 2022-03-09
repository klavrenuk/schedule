import React, {useState, useImperativeHandle, forwardRef, useEffect} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import {useSelector} from "react-redux";
import axios from 'axios';

import EventForm from './EventForm';

const ModalEvent = forwardRef((props, ref) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const state = useSelector(state => state);

    useImperativeHandle(ref, () => ({
        show() {
            setIsShowModal(true);
        }
    }))

    const onSave = () => {
        console.log(state.event);
        let incorrectOption = null;

        if(!state.event.name) {
            incorrectOption = 'Name';
        } else if(!state.event.date) {
            incorrectOption = 'Date';
        }

        if(incorrectOption) {
            alert(`Please, enter option "${incorrectOption}"`);
            return false;
        }

        axios({
            method: 'POST',
            url: '/api/event',
            data: {
                name: state.event.name,
                description: state.event.description || null,
                date: state.event.date
            }
        }).then((resp) => {
            console.log(resp);
        })

        //toggle();
    }

    const toggle = () => setIsShowModal(!isShowModal);

    return (
        <Modal isOpen={isShowModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Event</ModalHeader>

            <ModalBody>
                <EventForm />
            </ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={onSave}>save</Button>
            </ModalFooter>
        </Modal>
    )
});

export default ModalEvent;