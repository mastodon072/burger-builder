import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";

class ContactData extends Component {
    state= {
        name: 'Bikash Wiaba',
        email: 'bikash_065@yahoo.com', 
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
          ingredients: this.props.ingredients,
          price: (+this.props.price).toFixed(2), //You would want to calculate price in server in real app
          customer: {
            name: 'Bikash Waiba',
            phone: '+9779808091613',
            email: 'test@example.com',
            address: {
              zipCode: 1235,
              street: 'some street',
              country: 'Nepal'
            },
            deliveryMethod: 'fastest'
          }

        }
        axios.post('/orders.json', order).then(response => {
          this.setState({loading: false});
          this.props.history.push('/');
        }).catch(error => {
          console.log(error);
          this.setState({loading: false, purchasing: false});
        });
    }

    render () {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if(this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;