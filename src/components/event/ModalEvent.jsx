import React, {useState, useImperativeHandle, forwardRef} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import {useSelector} from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2'

import Loading from "../general/Loading";
import EventFormItem from './EventFormItem';

const options = [
    {
        type: 'name',
        name: 'name',
        value: ''
    },
    {
        type: 'description',
        name: 'description',
        value: ''
    },
    {
        type: 'date',
        name: 'date',
        value: new Date()
    }
];

const ModalEvent = forwardRef((props, ref) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const state = useSelector(state => state);

    useImperativeHandle(ref, () => ({
        show() {
            setIsShowModal(true);
        }
    }))

    const onSave = () => {
        setIsLoading(true);

        let incorrectOption = null;

        if(!state.event.name) {
            incorrectOption = 'Name';
        } else if(!state.event.date) {
            incorrectOption = 'Date';
        }

        if(incorrectOption) {
            Swal.fire(`Please, enter option "${incorrectOption}"`);
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
        }).then(() => {
            setIsLoading(false);
            Swal.fire('Success!');
            setTimeout(() => toggle(), 600);

        }).catch(() => {
            setIsLoading(false);
            Swal.fire('Error! Please, check form and try later');
        })
    }

    const toggle = () => setIsShowModal(!isShowModal);

    return (
        <Modal isOpen={isShowModal} toggle={toggle}>
            {
                isLoading ?
                    <Loading type="modal" />
                    :
                    null
            }

            <ModalHeader toggle={toggle}>New event</ModalHeader>

            <ModalBody>
                {
                    options.map((option) => {
                        return <EventFormItem key={option.type}
                                              data={option}
                        />
                    })
                }
            </ModalBody>

            <ModalFooter>
                <Button color="link" onClick={toggle}>cancel</Button>
                <Button color="primary" onClick={onSave}>save</Button>
            </ModalFooter>
        </Modal>
    )
});

export default ModalEvent;