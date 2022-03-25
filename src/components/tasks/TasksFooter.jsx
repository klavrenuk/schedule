import React from 'react';
import {Button} from "reactstrap";

import './css/tasks_footer.min.css';

export default function TasksFooter() {
    return (
        <div className={'tasks_footer'}>
            <div className={'tasks-container'}>
                <Button color={'default'}
                        className={'btn--create_list'}
                >
                    create list
                </Button>
            </div>
        </div>
    )
}