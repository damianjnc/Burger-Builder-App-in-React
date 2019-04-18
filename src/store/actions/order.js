import * as actionTypes from './order';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.purchaseBurgerSuccess,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.purchaseBurgerFail,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.purchaseBurgerStart
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then( response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData))

            })
            .catch(error => {dispatch(purchaseBurgerFail(error));
    });
};
}