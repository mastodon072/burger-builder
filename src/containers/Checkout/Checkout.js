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
    render() {
        return (
            <div>
                <CheckoutSummmary ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout;