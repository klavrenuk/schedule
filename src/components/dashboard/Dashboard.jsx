import React from 'react';
import {Container} from "reactstrap";

import DashboardHeader from "./DashboardHeader";
import Aside from './../aside/Aside';

import './css/dashboard.min.css';

const Dashboard = () => {
    return (
        <div>
            <Container fluid={true}>
                <DashboardHeader />
                <Aside />
            </Container>
        </div>
    )
}

export default Dashboard;