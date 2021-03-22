import React, {Component} from 'react';

import CheckoutSummmary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            salad: 1,
            bacon: 1,
            cheese: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for( let param of query.entries()) {
            //['salad', 1]
            ingredients[param[0]] = +param[1]
        }

        this.setState({ingredients: ingredients})
    }

    checkoutContinued =  () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    checkoutCancelled = () => {
        console.log(this.props);
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummmary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
            </div>
        )
    }
}

export default Checkout;