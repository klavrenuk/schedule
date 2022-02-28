import React, {useState} from 'react';
import {FormGroup, Input, Label, Button, Row, Col} from "reactstrap";
import DatePicker from 'react-datepicker';
import {useDispatch} from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";


export default function EventFormItem(props) {
    const dispatch = useDispatch();
    const [isShowDescription, setIsShowDescription] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const data = props.data;

    function renderWithFromGroup(content) {
        const itemClassName = 'event_item event_item--' + data.type;

        return (
            <FormGroup className={itemClassName}>
                <Row>
                    <Col sm={4} className={'text-right'}>
                        <Label
                            className={'event_item-label'}
                            for={data.type}
                        >{data.name}</Label>
                    </Col>
                    <Col sm={6}>{content}</Col>
                </Row>
            </FormGroup>
        )
    }

    const onChangeItem = (event) => {
        dispatch({
            type: 'event',
            prop: event.target.name,
            value: event.target.value
        });
    }

    const onChangeDate = (date) => {
        setStartDate(date);

        dispatch({
            type: 'event',
            prop: data.name,
            value: new Date(date).getTime()
        });
    }

    const toggleViewDescription = () => setIsShowDescription(true);

    switch (data.type) {
        case 'name':
            const input = <Input id={data.type}
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
                    <Input id={data.type}
                           name={data.name}
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