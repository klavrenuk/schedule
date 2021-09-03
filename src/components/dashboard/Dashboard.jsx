import React from 'react';
import {Container} from "reactstrap";

import DashboardHeader from "./DashboardHeader";
import Aside from './../aside/Aside';
import Schedule from './../schedule/Schedule';

import './css/dashboard.min.css';

const Dashboard = () => {
    return (
        <Container className={'dashboard'} fluid={true}>
            <DashboardHeader />
            <main className={'dashboard-main'}>
                <Aside />
                <Schedule />
            </main>
        </Container>
    )
}

export default Dashboard;