import React, {useState} from 'react';
import {FormGroup, Input, Label, Button, Row, Col} from "reactstrap";
import DatePicker from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
import {useDispatch, useSelector} from "react-redux";

import './css/event_form_item.min.css';

export default function EventFormItem(props) {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

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

    const onChangeAllDay = (event) => {
        dispatch( {
            type: 'event',
            option: 'isAllDay',
            value: event.target.checked
        });
        data.value = event.target.checked;
    }

    switch (data.name) {
        case 'allDay':
            return (
                <div className={'event_item event_item--all_day'}>
                    <Row>
                        <Col sm={{
                            size: 6,
                            offset: 4
                        }}>
                            <Input id={data.name.toUpperCase()}
                                   name={data.name}
                                   type={'checkbox'}
                                   placeholder={'Enter text'}
                                   onChange={(event) => onChangeAllDay(event)}
                            />
                            <Label for={data.name.toUpperCase()}>All day</Label>
                        </Col>
                    </Row>

                </div>
            )

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
            let classNameWrap = '';

            if(state.event.isAllDay) {
                classNameWrap = 'disabled';
                data.value.end = data.value.start;
            }

            console.log('datePicker', data.value.end);

            return renderWithFromGroup(
                <div className={classNameWrap}>
                    <Row className={'flex flex--align_center'}>
                        <Col sm={5}>
                            <DatePicker
                                disabled={state.event.isAllDay}
                                weekStartDayIndex={1}
                                editable={false}
                                format="DD/MM/YYYY HH:mm"
                                onChange={(value) => onChangeDate(value, 'start')}
                                value={data.value.start}
                                plugins={[
                                    <TimePicker position="bottom" hideSeconds  />
                                ]}
                                render={<InputIcon/>}
                            />
                        </Col>
                        <Col sm={2} className={'text-center'}>-</Col>
                        <Col sm={5}>
                            <DatePicker
                                disabled={state.event.isAllDay}
                                weekStartDayIndex={1}
                                editable={false}
                                format="DD/MM/YYYY HH:mm"
                                onChange={(value) => onChangeDate(value, 'end')}
                                value={data.value.end}
                                plugins={[
                                    <TimePicker position="bottom" hideSeconds  />
                                ]}
                                render={<InputIcon/>}
                                mobileLabels={{
                                    OK: "Accept",
                                    CANCEL: "Close",
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            )

        default:
            return null;
    }
}