import React from 'react';

import UserImg from './images/user.png';

const UserAccount = () => {
    return (
        <div className={'user_account'}>
            <a>
                <span>Kirill</span>
                <img src={UserImg}
                     alt={'User log'}
                />
            </a>
        </div>
    )
}

export default UserAccount;