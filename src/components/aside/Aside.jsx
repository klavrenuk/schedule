import React, {useRef} from 'react';
import {Button} from 'reactstrap';

import Event from '../event/Event';

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

            <Event ref={ModalEventRef} type={'page'} />
        </aside>
    )
}

export default Aside;