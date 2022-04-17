import React, {useEffect, useRef} from 'react';
import {Container} from "reactstrap";
import {useSelector} from 'react-redux';

import DashboardHeader from "./DashboardHeader";
import Aside from './../aside/Aside';
import Schedule from './../schedule/Schedule';
import Tasks from "../tasks/Tasks";
import AlertError from "../general/AlertError";

import './css/dashboard.min.css';

const Dashboard = () => {
    const state = useSelector(state => state);
    const AlertErrorRef = useRef();

    useEffect(() => {
        if(state.error) {
            AlertErrorRef.current.show(state.error);
        }

    }, [state]);

    return (
        <Container className={'dashboard'} fluid={true}>
            <DashboardHeader />

            <main className={'dashboard-main'}>
                <Aside />
                <Schedule />
                <Tasks />
            </main>

            <AlertError ref={AlertErrorRef} />
        </Container>
    )
}

export default Dashboard;