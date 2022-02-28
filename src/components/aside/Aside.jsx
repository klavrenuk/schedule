import React, {useRef} from 'react';
import {Button} from 'reactstrap';

import ModalEvent from '../event/ModalEvent';

import './aside.min.css';

const Aside = () => {
    const ModalEventRef = useRef();
    

    const createEvent = () => ModalEventRef.current.show();

    return (
        <aside className={'aside'}>
            <Button color={'white'}
                    block={true}
                    onClick={createEvent}
            >Create event</Button>

            <ModalEvent ref={ModalEventRef} />
        </aside>
    )
}

export default Aside;