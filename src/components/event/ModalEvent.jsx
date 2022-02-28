import React from 'react';

const ModalEvent = forwardRef((props, ref) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} size={props.size}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>

            <ModalBody>{component}</ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={props.save}>{btnAcceptText}</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalEvent;