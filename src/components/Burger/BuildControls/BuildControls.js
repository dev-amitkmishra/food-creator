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
        {controls.map((elem, index) => {
            return <BuildControl
                label={elem.label}
                type={elem.type + index}
                subtractIngredient={props.subtractIngredient}
                addIngredient={props.addIngredient}/>
        })}
    </div>
);

export default buildControls