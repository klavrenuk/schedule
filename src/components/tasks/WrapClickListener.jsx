import React, {useEffect, useMemo, useState} from 'react';

export default function WrapClickListener(props) {
    const parentElem = props.parentElem;

    const clickPressListener = (event) => {
        if(!event.target.closest(parentElem)) {
            window.removeEventListener('click', memoizedListener);
            props.destroyListener();
        }
    }

    const memoizedListener = useMemo(() => clickPressListener, []);

    useEffect(() => {
        if(props.isEdit) {
            window.addEventListener('click', memoizedListener);
        }

    }, [memoizedListener, props]);


    return null;
}