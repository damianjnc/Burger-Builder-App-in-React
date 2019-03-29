import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

class OrderSummary extends Component{

    //This could be a functional component, doesn't have to be a class
    
    componentWillUpdate(){
        console.log('[OrderSummary] Component WillUpdate');
    }

    render(){

        const ingredientSummary = Object.keys( this.props.ingredients )
            .map(igKey => {
                return(
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                );
            });

        return ( 
            <Auxiliary>
                <h3>Your order:</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCancelled}
                >CANCEL</Button>

                <Link to="/checkout"><Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >CONTINUE</Button></Link>

            </Auxiliary>
        );
    }
}

export default OrderSummary;