import React from 'react';
import {Row, Col, Button} from 'reactstrap';

import NavigationDays from "./NavigationDays";
import UserAccount from "./UserAccount";

const DashboardHeader = () => {
    return (
        <header>
            <Row>
                <Col sm={6}>
                    <NavigationDays />
                </Col>
                <Col sm={6}
                     className={'text-right'}
                >
                    <Button color={'icon'}>
                        Icon
                    </Button>
                    <UserAccount />
                </Col>
            </Row>
        </header>
    )
}

export default DashboardHeader;