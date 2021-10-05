import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";


export default function EventFormItem(props) {
    const data = props.data;

    function renderWithFromGroup(content) {
        return (
            <FormGroup>
                <Label for={data.type}>{data.label}</Label>
                {content}
            </FormGroup>
        )
    }

    switch (data.type) {
        case 'name':
            const input = <Input id={data.type}
                                 placeholder={'Enter text'}
            />
            return renderWithFromGroup(input);

        default:
            return null;
    }
}