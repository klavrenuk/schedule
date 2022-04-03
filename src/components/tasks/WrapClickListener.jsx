import React, {useEffect, useMemo, useImperativeHandle, forwardRef} from 'react';

const WrapClickListener = forwardRef(((props, ref) => {
    const parentElem = props.parentElem;

    useImperativeHandle(ref, () => ({
        removeListener() {
            window.removeEventListener('click', memoizedListener);
        }
    }));

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
}));

export default WrapClickListener;