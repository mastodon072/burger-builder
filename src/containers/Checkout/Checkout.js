import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux'

import CheckoutSummmary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                    <Route path={this.props.match.url + "/contact-data"} component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);