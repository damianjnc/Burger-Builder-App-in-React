import React, { Component } from 'react';
import { connect } from "react-redux";

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandle from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
      const spinner =  this.props.loading ? <Spinner/> : null;
        return (
            <div>
                {spinner}
                {this.props.orders.map(order=>(
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandle(Orders,axios));