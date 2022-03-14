import React, {useEffect, useReducer, useState} from 'react';
import {Form, FormGroup, Button, Label, Input} from "reactstrap";
import axios from 'axios';

import Loading from "../general/Loading";

import './auth.min.css';

const optionsSignIn = [
    {
        name: 'username',
        label: 'username',
        type: 'text',
        value: '',
        placeholder: 'Emma'
    },
    {
        name: 'password',
        label: 'password',
        type: 'password',
        value: '',
        placeholder: 'Crazy'
    }
];
const optionsRegistration = [
    {
        name: 'Name',
        label: 'Name',
        type: 'text',
        value: '',
        placeholder: 'Emma Stone'
    },
    {
        name: 'username',
        label: 'username',
        type: 'text',
        value: '',
        placeholder: 'Alex'
    },
    {
        name: 'password',
        label: 'password',
        type: 'password',
        value: '',
        placeholder: 'Crazy'
    },
    {
        name: 'passwordRepeat',
        label: 'password',
        type: 'password',
        value: '',
        placeholder: 'Crazy'
    }
];
const defaultState = {
    options: optionsSignIn,
    typeView: 'auth',
    user: {
        username: '',
        password: ''
    },
    title: 'Sign in',
    btnRightText: 'Create an account'
};

function reducer(state, action) {
    switch (action.type) {
        case 'showViewAuth':
            return defaultState;

        case 'showViewRegistration':
            return {
                options: optionsRegistration,
                typeView: 'registration',
                user: {
                    name: '',
                    username: '',
                    password: '',
                    passwordRepeat: ''
                },
                title: 'Registration',
                btnRightText: 'Continue'
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
    const [isLoading, setIsLoading] = useState(false);
    const [isShowContent, setIsShowContent] = useState(true);

    useEffect(() => {
        setIsShowContent(false);
    }, [state.typeView])

    const onChange = (event) => {
        dispatch({
            type: 'updateUser',
            prop: event.target.name,
            value: event.target.value
        });
    }

    const createAccount = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    const signIn = () => {
        setIsLoading(true);

        if(!state || !state.user) {
            return false;
        }

        for(let option of optionsSignIn) {
            if(!state.user[option.name] || !state.user[option.name].trim()) {
                alert(`Please, check ${option.name}`);
                return false;
            }
        }

        axios({
            method: 'POST',
            url: '/api/auth',
            data: {
                userName: state.user.username,
                password: state.user.password
            }
        }).then((response) => {
            setIsLoading(false);

            if(response.data.status) {
                location.href = '/dashboard';
            } else {
                if(response.data.message) {
                    alert(response.data.message);
                } else {
                    throw new Error();
                }
            }

        }).catch(() => {
            setIsLoading(false);
            alert('Error! Please, try later');
        })
    }

    const onAction = (action) => {
        if(action === 'create') {
            if(state.typeView !== 'registration') {
                dispatch({
                    type: 'showViewRegistration'
                });
            } else {
                createAccount();
            }

        } else {
            if(state.typeView !== 'auth') {
                dispatch({
                    type: 'showViewAuth'
                });

            } else {
                signIn();
            }
        }
    }

    return (
        <div className={'auth'}>
            {
                isLoading ? <Loading type={'modal'} />
                    :
                    null
            }

            {
                isShowContent ? null
                    :
                    <Form className={'auth-form'}>
                        <FormGroup>
                            <h2 className={'form-title'}>{state.title}</h2>
                        </FormGroup>

                        {
                            state.options.map((option) => {
                                return (
                                    <FormGroup key={option.name}>
                                        <Label for={option.name}>{option.label}</Label>
                                        <Input
                                            id={option.name}
                                            name={option.name}
                                            type={option.type}
                                            value={state.user[option.name]}
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
                                    onClick={() => onAction('auth')}
                            >Sign in</Button>
                            <Button color={'default'}
                                    onClick={() => onAction('create')}
                            >{state.btnRightText}</Button>
                        </FormGroup>
                    </Form>
            }
        </div>
    )
}

export default Auth;