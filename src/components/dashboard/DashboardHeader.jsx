import React from 'react';
import {Row, Col, Button} from 'reactstrap';

import NavigationDays from "./NavigationDays";
import UserAccount from "./UserAccount";
import Settings from '../settings/Settings';

const DashboardHeader = () => {
    return (
        <header className={'dashboard_header'}>
            <Row>
                <Col sm={6}>
                    <NavigationDays />
                </Col>
                <Col sm={6}
                     className={'text-right'}
                >
                    <Settings />
                    <UserAccount />
                </Col>
            </Row>
        </header>
    )
}

export default DashboardHeader;