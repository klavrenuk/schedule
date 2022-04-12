import React, {useEffect, useMemo} from 'react';

export default function WrapClickListener(props) {
    const parentId = '#' + props.parentElem;

    const clickPressListener = (event) => {
        if(!event.target.closest(parentId)) {
            window.removeEventListener('click', memoizedListener);
            props.destroyListener();
        }
    }

    const memoizedListener = useMemo(() => clickPressListener, []);

    useEffect(() => {
        if(props.isEdit) {
            window.addEventListener('click', memoizedListener);
        } else {
            window.removeEventListener('click', memoizedListener);
        }

    }, [memoizedListener, props]);


    return null;
};