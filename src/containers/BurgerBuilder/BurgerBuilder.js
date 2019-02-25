import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    };

    render(){

        return(
            <Auxiliary>
                <Burger ingredients={ this.state.ingredients } />
                <div> <BurgerControls /> </div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;