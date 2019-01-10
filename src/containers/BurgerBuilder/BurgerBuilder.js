import React, {Component} from 'react';
import Aux from '../../hoc/_aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price: 5,
        purchasable: false,
        isPurchasing: false,
        loading: false,
        error: null
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

    purchaseHandler = () => {
        this.setState({isPurchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({isPurchasing: false});
    }
    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const orderObj = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Amit',
                address: {
                    add1: 'My address',
                    zipCode: '201010',
                    country: 'India'
                },
                email: 'test@testmail.com'
            },
            deliveryMethod: 'ASAP'
        }
        axiosInstance
            .post('/orders.json', orderObj)
            .then((resp) => {
                console.log(resp);
                this.setState({loading: false, isPurchasing: false});
            })
            .catch((err) => {
                console.log(err);
                this.setState({loading: false, isPurchasing: false});
            })
    }
    componentDidMount() {
        axiosInstance
            .get('https://food-creator-app.firebaseio.com/orders/ingredients.json')
            .then((res) => {
                this.setState({ingredients: res.data})
            }).catch(error => {
                console.log(error);
                this.setState({
                    error: 'Ingredients not loaded!'
                })
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
        let orderSummary = null;
        let burger = this.state.error ? <p>{this.state.error}</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        disabled={disableData}
                        price={this.state.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        subtractIngredient={this.subtractIngredientHandler}
                        addIngredient={this.addIngredientHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary
            show={!this.props.loading}
            price={this.state.price}
            ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axiosInstance);