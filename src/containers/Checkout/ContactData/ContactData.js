import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address:{
            street: '',
            postcode: ''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Damian Joniec',
                address: {
                    street: '347 Sydenham Rd',
                    postCode: 'SE265SL',
                    country: 'England'
                },
                emailAddress: 'damianjnc@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then( response => {
                this.setState({ loading:false});
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading:false}));
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                <input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Your Street'/>
                <input className={classes.Input} type='text' name='postcode' placeholder='Your Postcode'/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your details:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;