import React from 'react';
import {Row, Col, Button} from 'reactstrap';

import NavigationDays from "./NavigationDays";
import UserAccount from "./UserAccount";
import Settings from '../settings/Settings';

const DashboardHeader = () => {
    return (
        <header className={'dashboard_header'}>
            <Row>
                <Col sm={8}><NavigationDays /></Col>

                <Col sm={4}
                     className={'text-right'}
                >
                    <Row>
                        <Col sm={8}
                             className={'text-right'}
                        >
                            <Settings />
                        </Col>
                        <Col sm={4}><UserAccount /></Col>
                    </Row>
                </Col>
            </Row>
        </header>
    )
}

export default DashboardHeader;