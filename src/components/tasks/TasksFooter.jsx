import React from 'react';
import {Button} from "reactstrap";

import './css/tasks_footer.min.css';

export default function TasksFooter(props) {
    return (
        <div className={'tasks_footer'}>
            <div className={'tasks-container'}>
                <Button color={'default'}
                        className={'btn--create_list'}
                        onClick={() => props.showSectionNew()}
                >
                    create list
                </Button>
            </div>
        </div>
    )
}