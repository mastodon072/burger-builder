import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('/ingredients.json')
          .then(res => {
            this.setState({ingredients: res.data});
          })
          .catch(err=> {
            this.setState({error: true})
          })
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.values(ingredients).reduce((s, el) => s + el, 0);

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition


    this.setState({ingredients: updatedIngredients, totalPrice: newPrice}, () => this.updatePurchaseState());
  }

  removeIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount < 1) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction


    this.setState({ingredients: updatedIngredients, totalPrice: newPrice}, () => this.updatePurchaseState());
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert('Continue Purchase!');
    // this.setState({loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice.toFixed(2), //You would want to calculate price in server in real app
    //   customer: {
    //     name: 'Bikash Waiba',
    //     phone: '+9779808091613',
    //     email: 'test@example.com',
    //     address: {
    //       zipCode: 1235,
    //       street: 'some street',
    //       country: 'Nepal'
    //     },
    //     deliveryMethod: 'fastest'
    //   }

    // }
    // axios.post('/orders.json', order).then(response => {
    //   console.log(response);
    //   this.setState({loading: false, purchasing: false});
    // }).catch(error => {
    //   console.log(error);
    //   this.setState({loading: false, purchasing: false});
    // });
    const queryParams = [];
    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
    console.log(this.props.history)
  }

  render() {

    const disabledInfo = {...this.state.ingredients};

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can not be loaded.</p> : <Spinner/>;

    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;
      
      if( this.state.loading ) {
        orderSummary = <Spinner/>;
      }
      
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
export default withErrorHandler(BurgerBuilder, axios);