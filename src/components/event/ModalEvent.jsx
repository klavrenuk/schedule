import React, {useState, useImperativeHandle, forwardRef} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";

import EventForm from './EventForm';

const ModalEvent = forwardRef((props, ref) => {
    const [isShowModal, setIsShowModal] = useState(false);

    useImperativeHandle(ref, () => ({
        show() {
            setIsShowModal(true);
        }
    }))

    const onSave = () => {
        toggle();
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