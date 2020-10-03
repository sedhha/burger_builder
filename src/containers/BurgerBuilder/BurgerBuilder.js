import React, { Component } from "react";
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/BuildControls/BuilldControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';

const INGEDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuiilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients)
    {


        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<0)
        return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };


        updatedIngredients[type] = updatedCount;
        const priceReduction = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {

        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () =>
    {
        alert("Order Placed");
    }

    render()
    {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return(
            <Aux>
            <Modal show = {this.state.purchasing}
            modalClosed = {this.purchaseCancelHandler}
            >
            <OrderSummary ingredients = {this.state.ingredients}
            
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    price = {this.state.totalPrice}
            />
            </Modal>
            <Burger ingredients = {this.state.ingredients} />
            <BuildControls 
            ingrdientAdded = {this.addIngredientHandler}
            ingrdientRemoved = {this.removeIngredientHandler}
            disabled = {disableInfo}
            price = {this.state.totalPrice}
            purchasable = {this.state.purchasable}
            ordered = {this.purchaseHandler}
            />
            </Aux>
        );
    }
}

export default BurgerBuiilder;