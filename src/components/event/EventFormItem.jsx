import React, {useState} from 'react';
import {FormGroup, Input, Label, Button, Row, Col} from "reactstrap";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


export default function EventFormItem(props) {
    const [isShowDescription, setIsShowDescription] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const data = props.data;

    function renderWithFromGroup(content) {
        const itemClassName = 'event_item event_item--' + data.type;

        return (
            <FormGroup className={itemClassName}>
                <Row>
                    <Col sm={4} className={'text-right'}>
                        <Label for={data.type}>{data.label}</Label>
                    </Col>
                    <Col sm={6}>{content}</Col>
                </Row>
            </FormGroup>
        )
    }

    const onChangeItem = (event) => data.value = event.target.value;

    const onChangeDate = (date) => {
        setStartDate(date);
        data.value = new Date(date).toLocaleDateString('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    }

    const toggleViewDescription = () => setIsShowDescription(true);

    switch (data.type) {
        case 'name':
            const input = <Input id={data.type}
                                 name={data.type}
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
                    <Input id={data.type}
                           name={data.type}
                           type="textarea"
                           rows="4"
                           onChange={(event) => onChangeItem(event)}
                    />
                )
            }

        case 'date':
            return renderWithFromGroup(
                <DatePicker 
                    id={data.type}
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => onChangeDate(date)} 
                    showTimeSelect
                />
            )

        default:
            return null;
    }
}