import React, {useState} from 'react';
import {FormGroup, Input, Label, Button, Row, Col} from "reactstrap";
import DatePicker from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import './css/event_form_item.min.css';

export default function EventFormItem(props) {
    const [isShowDescription, setIsShowDescription] = useState(false);
    const data = props.data;

    function renderWithFromGroup(content) {
        const itemClassName = 'event_item event_item--' + data.name;

        return (
            <FormGroup className={itemClassName}>
                <Row>
                    <Col sm={4} className={'text-right'}>
                        <Label
                            className={'event_item-label'}
                            for={data.name.toUpperCase()}
                        >{data.name}</Label>
                    </Col>
                    <Col sm={6}>{content}</Col>
                </Row>
            </FormGroup>
        )
    }

    const onChangeItem = (event) => data.value = event.target.value;

    const onChangeDate = (value, type) => data.value[type] = value.unix * 1000;

    const toggleViewDescription = () => setIsShowDescription(true);

    switch (data.name) {
        case 'name':
            const input = <Input id={data.name.toUpperCase()}
                                 name={data.name}
                                 placeholder={'Enter text'}
                                 onChange={(event) => onChangeItem(event)}
            />
            return renderWithFromGroup(input);

        case 'description':
            if(!isShowDescription) {
                return renderWithFromGroup(
                    <div>
                        <Button color={'primary'}
                                className={'event_item-button_description'}
                                onClick={toggleViewDescription}
                        >
                            + Description
                        </Button>
                    </div>
                )

            } else {
                return renderWithFromGroup(
                    <Input id={data.name.toUpperCase()}
                           name={data.name}
                           type="textarea"
                           rows="4"
                           onChange={(event) => onChangeItem(event)}
                    />
                )
            }

        case 'date':
            return renderWithFromGroup(
                <div>
                    <Row className={'flex flex--align_center'}>
                        <Col sm={5}>
                            <DatePicker
                                format="dd/MM/YYYY HH:mm:ss"
                                onChange={(value) => onChangeDate(value, 'start')}
                                plugins={[
                                    <TimePicker position="bottom" />
                                ]}
                            />
                        </Col>
                        <Col sm={2} className={'text-center'}>-</Col>
                        <Col sm={5}>
                            <DatePicker
                                format="dd/MM/YYYY HH:mm:ss"
                                onChange={(value) => onChangeDate(value, 'end')}
                                plugins={[
                                    <TimePicker position="bottom" />
                                ]}
                            />
                        </Col>
                    </Row>
                </div>
            )

        default:
            return null;
    }
}