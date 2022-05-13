import React, {forwardRef, useImperativeHandle, useState} from 'react'
import Loading from "../general/Loading";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import EventFormItem from "./EventFormItem";
import ErrorMessageLine from "../general/ErrorMessageLine";

const EventModal = forwardRef((props, ref) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const isLoading = props.isLoading;
    const errorMessage = props.errorMessag;
    const options = props.options;

    useImperativeHandle(ref, () => ({
        show() {
            setIsShowModal(true);
        }
    }));


    const toggle = () => setIsShowModal(!isShowModal);

    return (
        <Modal className={'modal_event'}
               isOpen={isShowModal}
               toggle={toggle} size={'lg'}
        >
            {
                isLoading ?
                    <Loading type="modal" />
                    :
                    null
            }

            <ModalHeader toggle={toggle}>New event</ModalHeader>

            <ModalBody>
                <div>
                    {
                        options.map((option) => {
                            return <EventFormItem key={option.name}
                                                  data={option}
                            />
                        })
                    }
                </div>

                <ErrorMessageLine message={errorMessage} />
            </ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={props.onSave}>save</Button>
            </ModalFooter>
        </Modal>
    )
});

export default EventModal;