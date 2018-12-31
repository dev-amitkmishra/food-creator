import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad'
    }, {
        label: 'Bacon',
        type: 'bacon'
    }, {
        label: 'Cheese',
        type: 'cheese'
    }, {
        label: 'Meat',
        type: 'meat'
    }
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price - <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((elem, index) => {
            return <BuildControl
                key={elem.label}
                label={elem.label}
                type={elem.type + index}
                disabled={props.disabled[elem.type]}
                subtractIngredient={() => props.subtractIngredient(elem.type)}
                addIngredient={() => props.addIngredient(elem.type)}/>
        })}
        <button
        disabled={!props.purchasable}
        className={classes.OrderButton}>ORDER NOW</button>
    </div>
);

export default buildControls