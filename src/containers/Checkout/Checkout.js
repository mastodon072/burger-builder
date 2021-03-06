import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import CheckoutSummmary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions/index'

class Checkout extends Component {

    checkoutContinued =  () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to="/"/>;

        if(this.props.ings) {
            const purhcasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
            <div>
                {purhcasedRedirect}
                <CheckoutSummmary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                <Route path={this.props.match.url + "/contact-data"} component={ContactData}/>
            </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);