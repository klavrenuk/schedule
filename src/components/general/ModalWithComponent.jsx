import React, {forwardRef, useEffect, useState, useImperativeHandle} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalWithComponent = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        setTitle(props.title);

    }, [props]);

    const toggle = () => setIsOpen(!isOpen);

    console.log(props);

    useImperativeHandle(ref, () => ({
        show() {
            console.log('show');
            toggle();
        }
    }));

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>

            <ModalBody>
            </ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={toggle}>accept</Button>
            </ModalFooter>
        </Modal>
    )
})

export default ModalWithComponent;