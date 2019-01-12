import React from 'react';
import classes from './Button.css';

const button = (props) => {
    let btnClasses = [
        classes.Button,
        classes[props.btnType]
    ];
    return (
        <button
            onClick={props.clicked}
            className={btnClasses.join(' ')}
            disabled={props.disabled}>{props.children}</button>
    );
};

export default button;