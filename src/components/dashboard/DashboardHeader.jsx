import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useDispatch} from 'react-redux';
import { AiOutlineDownSquare } from "react-icons/ai";

import NavigationDays from "./NavigationDays";
import UserAccount from "./UserAccount";
import Settings from '../settings/Settings';

import './css/dashboard_header.min.css';

const DashboardHeader = () => {
    const dispatch = useDispatch();

    const onShowTasks = () => dispatch({
        type: 'toggleModalTasks'
    });

    return (
        <header className={'dashboard_header'}>
            <Row className={'flex flex--align_center dashboard_header-row'}>
                <Col sm={8}><NavigationDays /></Col>

                <Col sm={4}>
                    <Row className={'flex flex--align_center'}>
                        <Col sm={8} className={'text-right'}>
                            <Button color={'icon'}
                                    className={'dashboard_header-btn_open_tasks'}
                                    onClick={() => onShowTasks()}
                            >
                                <AiOutlineDownSquare />
                            </Button>
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