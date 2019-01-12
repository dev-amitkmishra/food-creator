import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let input = '';
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case 'input':
            input = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed}/>
            break;
        case 'textarea':
            input = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed}/>
            break;
        case 'select':
            input = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} onChange={props.changed}>{props
                        .elementConfig.options
                        .map(opt => {
                            return <option key={opt.value}>{opt.displayValue}</option>
                        })}</select>
            );
            break;

        default:
            input = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed}/>
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    );
};

export default input;