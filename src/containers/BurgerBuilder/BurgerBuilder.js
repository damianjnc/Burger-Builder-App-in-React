import React, { Component } from 'react';
import { connect } from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();

    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum>0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue');
        /**/
    /* const queryParams = [];
     for (let i in this.state.ingredients){
         queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
     }
     queryParams.push('price=' + this.state.totalPrice);
     const queryString = queryParams.join('&');*/

     this.props.history.push('/checkout');

    }

    render(){
        const disabledInfo ={
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients couldn't be loaded</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                <Auxiliary>
                    <Burger ingredients={ this.props.ings } />
                    <BurgerControls
                        ingredientAdded = { this.props.onIngredientAdded }
                        ingredientRemoved = { this.props.onIngredientRemoved }
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary> );
            orderSummary = <OrderSummary
                        ingredients={this.props.ings}
                        purchaseContinued={this.purchaseContinueHandler}
                        purchaseCancelled={this.purchaseCancelHandler}
                        price={this.props.price.toFixed(2)}
                   />;
            if(this.state.loading){
                orderSummary =  <Spinner />;
             }
        }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary} 
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));