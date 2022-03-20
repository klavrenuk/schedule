import React from 'react';
import {useSelector} from "react-redux";

import UserImg from './images/user.png';

import './css/user-account.min.css';

const UserAccount = () => {
    const state = useSelector(state => state);

    if(!state.user || !state.user.hasOwnProperty('name')) {
        return false;
    }

    return (
        <div className={'user_account'}>
            <span className={'user_account-name'}>{state.user.name}</span>
            <div className={'user_account-logo'}>
                <img src={UserImg}
                     alt={'User log'}
                />
            </div>
        </div>
    )
}

export default UserAccount;