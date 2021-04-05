import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.props.ings
    };
    const sum = Object.values(ingredients).reduce((s, el) => s + el, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push( '/checkout')
  }

  render() {

    const disabledInfo = {...this.props.ings};

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can not be loaded.</p> : <Spinner/>;

    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState()}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      
      orderSummary = <OrderSummary
        price={this.props.price}
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;
      
      
    }



    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch( actions.addIngredient(ingName) ),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));