import React from 'react';
import {Row, Col, Button, FormGroup, Form, Label, Input} from 'reactstrap';
import {BsX} from 'react-icons/bs';

const options = [
    {
        name: 'firstDay',
        label: 'First day of week',
        type: 'select',
        options: [
            {
                value: 'monday',
                text: 'Monday'
            },
            {
                value: 'saturday',
                text: 'Saturday'
            },
            {
                value: 'sunday',
                text: 'Sunday'
            }
        ]
    },
    {
        name: 'isShowNumberWeek',
        label: 'Show number week',
        type: 'checkbox'
    },
    {
        name: 'isShowWeekends',
        label: 'Show weekends',
        type: 'checkbox'
    }
];

const SettingsModal = () => {
    return (
        <div className={'settings_modal'}>
            <div className={'settings_modal-header'}>
                <Row>
                    <Col sm={8}><h5>Settings</h5></Col>
                    <Col sm={4}
                         className={'text-right'}
                    >
                        <Button color={'icon'}><BsX /></Button>
                    </Col>
                </Row>
            </div>

            <div className={'settings_modal-body'}>
                <Form>
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
                                                            <option key={item.id}
                                                                    value={item.id}
                                                            >
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
                                        <FormGroup>
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
        </div>
    )
}