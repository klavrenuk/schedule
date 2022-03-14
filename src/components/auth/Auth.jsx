import React, {useEffect, useReducer, useState} from 'react';
import {Form, FormGroup, Button, Label, Input} from "reactstrap";
import axios from 'axios';

import Loading from "../general/Loading";

import './auth.min.css';

const optionsSignIn = [
    {
        name: 'login',
        label: 'login',
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
        name: 'name',
        label: 'Name',
        type: 'text',
        value: '',
        placeholder: 'Emma Stone'
    },
    {
        name: 'login',
        label: 'Login',
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
        login: '',
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
                    login: '',
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

    const validationUser = (options) => {
        return new Promise((resolve) => {
            for(let option of options) {
                if(!state.user[option.name] || !state.user[option.name].trim()) {
                    resolve(option.name);
                }
            }

            resolve(null);
        })
    }

    const signIn = async () => {
        setIsLoading(true);

        const inValidOption = await validationUser(optionsSignIn);
        if(inValidOption) {
            setIsLoading(false);
            alert(`Please, check ${inValidOption}`);
            return false;
        }

        axios({
            method: 'POST',
            url: '/api/auth',
            data: {
                login: state.user.login,
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

    const createAccount = async() => {
        console.log('createAccount', state.user);
        setIsLoading(true);

        const inValidOption = await validationUser(optionsRegistration);
        if(inValidOption) {
            setIsLoading(false);
            alert(`Please, check ${inValidOption}`);
            return false;
        }

        if(state.user.password !== state.user.passwordRepeat) {
            setIsLoading(false);
            alert('Passwords have to equal');
            return false;
        }

        axios({
            url: '/api/registration',
            method: 'POST',
            data: {
                name: state.user.name,
                login: state.user.login,
                password: state.user.password,
                passwordRepeat: state.user.passwordRepeat
            }
        }).then((response) => {
            setIsLoading(false);

            if(response.data.status) {
                alert('User created');
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