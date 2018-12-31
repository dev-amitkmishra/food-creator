import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let modifiedIngredients = Object
        .keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return<BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
            })
        }).reduce((arr, elem) => {
            return arr.concat(elem);
        }, []);
    if (modifiedIngredients.length === 0){
        modifiedIngredients = <div>Please select ingredients!</div>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {modifiedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;