import React, {useState} from 'react';

import Tabs from './Tabs';

import './css/tasks.min.css';

export default function Tasks() {
    const [view, setView] = useState('tasks');

    return (
        <aside className={'tasks'}>
            <Tabs setActionView={setView}
                  activeView={view}
            />
        </aside>
    )
}