import React from 'react';

import InputInList from "./InputInList";

import './css/section_new.min.css';

export default function SectionNew(props) {
    const id = 'SectionNew';

    return (
        <div id={id} className={'section_new'}>
            <InputInList
                close={props.save}
                parentElem={`${id}`}
                isEdit={true}
            />
        </div>
    )
}