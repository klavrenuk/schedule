import React, {useReducer} from 'react';
import {Form, FormGroup, Button, Label, Input} from "reactstrap";

import './auth.min.css';

const optionsSingIn = [
    {
        name: 'username',
        label: 'username',
        type: 'text',
        value: null,
        placeholder: 'Emma'
    },
    {
        name: 'password',
        label: 'password',
        type: 'password',
        value: null,
        placeholder: 'Crazy'
    }
];
const optionsRegistration = [
    {
        name: 'Name',
        label: 'Name',
        type: 'text',
        value: null,
        placeholder: 'Emma Stone'
    },
    {
        name: 'username',
        label: 'username',
        type: 'text',
        value: null,
        placeholder: 'Alex'
    },
    {
        name: 'password',
        label: 'password',
        type: 'password',
        value: null,
        placeholder: 'Crazy'
    },
    {
        name: 'password',
        label: 'password',
        type: 'password',
        value: null,
        placeholder: 'Crazy'
    }
];

const defaultState = {
    options: optionsSingIn,
    typeView: 'auth',
    user: {},
    title: 'Authorization',
    btnRightText: 'Create account'
};

function reducer(state, action) {
    switch (action.type) {
        case 'showViewAuth':
            return defaultState;

        case 'showViewRegistration':
            return {
                options: optionsRegistration,
                typeView: 'registration',
                user: {},
                title: 'Registration',
                btnRightText: 'Save'
            };

        case 'updateUser':
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.prop]: action.value
                }
            }

        default:
            throw new Error();
    }
}


const Auth = () => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onChange = (event) => {
        dispatch({
            type: 'updateUser',
            prop: event.target.name,
            value: event.target.value
        });

        const input = document.getElementById(event.target.name);
        if(input) {
            if(event.target.value !== null && event.target.value !== undefined && event.target.value.trim()) {
                if(!input.classList.contains('fill')) {
                    input.classList.add('fill');
                }

            } else {
                if(input.classList.contains('fill')) {
                    input.classList.remove('fill');
                }
            }
        }
    }

    const run = () => {
        console.log('run', state.user);
    }

    const createAccount = () => {
        console.log('createAccount');
    }

    return (
        <div className={'auth'}>
            <Form className={'auth-form'}>
                <FormGroup>
                    <h2 className={'form-title'}>{state.title}</h2>
                </FormGroup>

                {
                    state.options.map((option) => {
                        return (
                            <FormGroup key={option.name}>
                                <Label for={option.name}>{option.name}</Label>
                                <Input
                                    id={option.name}
                                    name={option.name}
                                    type={option.type}
                                    value={option.value}
                                    placeholder={option.placeholder}
                                    autoComplete={'off'}
                                    onChange={(event) => onChange(event)}
                                />
                            </FormGroup>
                        )
                    })
                }

                <FormGroup className={'form-buttons flex_center_center'}>
                    <Button color={'primary'}
                            onClick={run}
                    >Sign in</Button>
                    <Button color={'default'}
                            onClick={createAccount}
                    >{state.btnRightText}</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default Auth;