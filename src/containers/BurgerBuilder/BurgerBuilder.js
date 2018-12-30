import React, {Component} from 'react';
import Aux from '../../hoc/_aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    };
    subtractIngredientHandler = (item) => {
        debugger;
    }
    addIngredientHandler = (item) => {
        debugger;
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls subtractIngredient={this.subtractIngredientHandler} addIngredient={this.addIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;