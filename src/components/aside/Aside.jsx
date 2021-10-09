import React, {useRef} from 'react';
import {Button} from 'reactstrap';

import ModalWithComponent from "../general/ModalWithComponent";
import EventForm from "../event/EventForm";

import './aside.min.css';

const Aside = () => {
    const ModalWithComponentRef = useRef();

    const openModalCreateEvent = () => ModalWithComponentRef.current.show();

    return (
        <aside className={'aside'}>
            <Button color={'white'}
                    block={true}
                    onClick={openModalCreateEvent}
            >Create event</Button>

            <ModalWithComponent ref={ModalWithComponentRef}
                                title={'Create EventForm'}
                                component={EventForm}
                                textButtonAccept={'Save'}
                                size="lg"
            />
        </aside>
    )
}

export default Aside;