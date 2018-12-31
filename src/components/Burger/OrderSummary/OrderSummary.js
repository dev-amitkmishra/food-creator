import React, { Component } from 'react';
import Aux from '../../../hoc/_aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('ordersummery.js componentWillUpdate');
    }
    render() {
        const ingredientSummary = Object
        .keys(this.props.ingredients)
        .map((key) => {
            return <li key={key}>
                <span
                    style={{
                    textTransform: 'capitalize'
                }}>{key}</span>: {this.props.ingredients[key]}</li>
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Contiue?</p>
                <Button clicked={this.props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;