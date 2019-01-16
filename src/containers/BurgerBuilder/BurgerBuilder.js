import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/_aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        isPurchasing: false,
        loading: false,
        error: null
    };
    // subtractIngredientHandler = (item) => {     const oldCounter =
    // this.state.ingredients[item];     if (oldCounter <= 0) {         return;
    // }     const updatedCounter = oldCounter - 1;     const upgratdedIngredients =
    // {         ...this.state.ingredients     };     upgratdedIngredients[item] =
    // updatedCounter;     const priceSub = INGREDIENT_PRICES[item];     const
    // oldPrice = this.state.price;     const newPrice = oldPrice - priceSub;
    // this.setState({price: newPrice, ingredients: upgratdedIngredients});
    // this.updatePurchaseState(upgratdedIngredients); } addIngredientHandler =
    // (item) => {     const oldCounter = this.state.ingredients[item];     const
    // updatedCounter = oldCounter + 1;     const upgratdedIngredients = {
    // ...this.state.ingredients     };     upgratdedIngredients[item] =
    // updatedCounter;     const priceAdd = INGREDIENT_PRICES[item];     const
    // oldPrice = this.state.price;     const newPrice = oldPrice + priceAdd;
    // this.setState({price: newPrice, ingredients: upgratdedIngredients});
    // this.updatePurchaseState(upgratdedIngredients); }

    updatePurchaseState(ingredients) {
        const sum = Object
            .keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((arr, elem) => {
                return arr + elem;
            }, 0);
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({isPurchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({isPurchasing: false});
    }
    purchaseContinueHandler = () => {
        this
            .props
            .history
            .push('/checkout');
    }
    componentDidMount() {
        // axiosInstance
        // .get('https://food-creator-app.firebaseio.com/orders/ingredients.json')
        // .then((res) => {         this.setState({ingredients: res.data})     })
        // .catch(error => {         console.log(error);         this.setState({error:
        // 'Ingredients not loaded!'})     })
    }

    render() {
        const disableData = {
            ...this.props.ings
        };

        for (const key in disableData) {
            if (disableData.hasOwnProperty(key)) {
                disableData[key] = disableData[key] <= 0
                    ? true
                    : false;
            }
        }
        let orderSummary = null;
        let burger = this.state.error
            ? <p>{this.state.error}</p>
            : <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        disabled={disableData}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        subtractIngredient={(ingName) => this.props.onRemoveIngredient(ingName)}
                        addIngredient={(ingName) => this.props.onAddIngredient(ingName)}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                show={!this.props.loading}
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.isPurchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export const matchStateToProps = state => {
    return {ings: state.ingredients, price: state.totalPrice}
}

export const matchDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({type: actionTypes.Actions.ADD_INGREDIENT, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({type: actionTypes.Actions.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(matchStateToProps, matchDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));