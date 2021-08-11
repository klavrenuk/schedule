import React from 'react';
import {Form, FormGroup, Button, Label, Input} from "reactstrap";

import './auth.min.css';

const options = [
    {
        name: 'username',
        label: 'username',
        type: 'text',
        value: null,
        placeholder: 'Emma Stone'
    },
    {
        name: 'password',
        label: 'password',
        type: 'password',
        value: null,
        placeholder: 'Crazy, Stupid, Love'
    }
];

const Auth = () => {

    const run = () => {
        console.log('run');
    }

    const createAccount = () => {
        console.log('createAccount');
    }

    return (
        <div className={'auth'}>
            <Form>
                <FormGroup>
                    <h2>Authorization</h2>
                </FormGroup>

                {
                    options.map((option) => {
                        return (
                            <FormGroup key={option.name}>
                                <Label for={option.name}>{option.name}</Label>
                                <Input
                                    id={option.name}
                                    name={option.name}
                                    value={option.value}
                                    placeholder={option.placeholder}
                                />
                            </FormGroup>
                        )
                    })
                }

                <FormGroup>
                    <Button color={'primary'}
                            onClick={run}
                    >Sign in</Button>
                    <Button color={'default'}
                            onClick={createAccount}
                    >Create account</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default Auth;