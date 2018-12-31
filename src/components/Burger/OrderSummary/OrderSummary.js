import React from 'react';
import Aux from '../../../hoc/_aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object
        .keys(props.ingredients)
        .map((key) => {
            return <li key={key}>
                <span
                    style={{
                    textTransform: 'capitalize'
                }}>{key}</span>: {props.ingredients[key]}</li>
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Contiue?</p>
            <Button clicked={props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType='Success'>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;