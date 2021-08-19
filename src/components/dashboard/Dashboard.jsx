import React from 'react';
import {Container} from "reactstrap";

import DashboardHeader from "./DashboardHeader";

import './css/dashboard.min.css';

const Dashboard = () => {
    return (
        <div>
            <Container fluid={true}>
                <DashboardHeader />
            </Container>
        </div>
    )
}

export default Dashboard;