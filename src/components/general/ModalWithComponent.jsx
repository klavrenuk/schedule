import React, {forwardRef, useEffect, useState, useImperativeHandle} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalWithComponent = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [btnAcceptText, setBtnAcceptText] = useState('accept');
    const [component, setComponent] = useState(null);

    useEffect(() => {
        if(props.title) {
            setTitle(props.title);
        }

        if(props.component) {
            setComponent(props.component);
        }

        if(props.textButtonAccept) {
            setBtnAcceptText(props.textButtonAccept);
        }

    }, [props]);

    const toggle = () => setIsOpen(!isOpen);

    console.log(props);

    useImperativeHandle(ref, () => ({
        show() {
            toggle();
        }
    }));

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>

            <ModalBody>{component}</ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={toggle}>{btnAcceptText}</Button>
            </ModalFooter>
        </Modal>
    )
})

export default ModalWithComponent;