import React from 'react';
import {Row, Col, Button, FormGroup, Form, Label, Input} from 'reactstrap';
import {BsX} from 'react-icons/bs';

import './css/settings_modal.min.css';

const options = [
    {
        name: 'isShowNumberWeek',
        label: 'Show number week',
        type: 'checkbox'
    }
];

const SettingsModal = () => {
    const closeModal = () => {
        const elem = document.getElementById('SettingsModal');

        if(elem) {
            elem.classList.remove('show');
        }
    }

    return (
        <div id={'SettingsModal'} className={'settings_modal border_top border_top--grey'}>
            <div className={'settings_modal-header'}>
                <Row className={'header_row'}>
                    <Col sm={8}><h6 className={'header_row-title'}>Settings</h6></Col>
                    <Col sm={4}
                         className={'text-right'}
                    >
                        <Button
                            color={'icon'}
                            className={'header_row-close'}
                            onClick={() => closeModal()}
                        ><BsX /></Button>
                    </Col>
                </Row>
            </div>

            <Form className={'settings_modal-body'}>
                {
                    options.map((option) => {
                        switch (option.type) {
                            case 'select':
                                return (
                                    <FormGroup key={option.name}>
                                        <Label for={option.name.toUpperCase()}>{option.label}</Label>
                                        <Input
                                            id={option.name.toUpperCase()}
                                            type="select"
                                            name={option.name}
                                        >
                                            <option value={null}>Select your option</option>
                                            {
                                                option.options.map((item) => {
                                                    return (
                                                        <option key={item.value} value={item.id}>
                                                            {option.text}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                )

                            case 'checkbox':
                                return (
                                    <FormGroup key={option.name} className={'flex flex--align_center'}>
                                        <Label>
                                            <Input
                                                type="checkbox"
                                                name={option.name}
                                            />
                                            {option.label}
                                        </Label>
                                    </FormGroup>
                                )
                        }
                    })
                }
            </Form>
        </div>
    )
}

export default SettingsModal;