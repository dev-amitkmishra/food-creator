import React, {Component} from 'react';
import Aux from '../../hoc/_aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 5,
        purchasable: false
    };
    subtractIngredientHandler = (item) => {
        const oldCounter = this.state.ingredients[item];
        if (oldCounter <= 0) {
            return;
        }
        const updatedCounter = oldCounter - 1;
        const upgratdedIngredients = {
            ...this.state.ingredients
        };
        upgratdedIngredients[item] = updatedCounter;
        const priceSub = INGREDIENT_PRICES[item];
        const oldPrice = this.state.price;
        const newPrice = oldPrice - priceSub;
        this.setState({price: newPrice, ingredients: upgratdedIngredients});
        this.updatePurchaseState(upgratdedIngredients);
    }
    addIngredientHandler = (item) => {

        const oldCounter = this.state.ingredients[item];
        const updatedCounter = oldCounter + 1;
        const upgratdedIngredients = {
            ...this.state.ingredients
        };
        upgratdedIngredients[item] = updatedCounter;
        const priceAdd = INGREDIENT_PRICES[item];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + priceAdd;
        this.setState({price: newPrice, ingredients: upgratdedIngredients});
        this.updatePurchaseState(upgratdedIngredients);
    }

    updatePurchaseState(ingredients) {
        const sum = Object
            .keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((arr, elem) => {
                return arr + elem;
            }, 0);

        this.setState({
            purchasable: sum > 0
        })
    }
    render() {
        const disableData = {
            ...this.state.ingredients
        };

        for (const key in disableData) {
            if (disableData.hasOwnProperty(key)) {
                disableData[key] = disableData[key] <= 0
                    ? true
                    : false;
            }
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    disabled={disableData}
                    price={this.state.price}
                    purchasable={this.state.purchasable}
                    subtractIngredient={this.subtractIngredientHandler}
                    addIngredient={this.addIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;