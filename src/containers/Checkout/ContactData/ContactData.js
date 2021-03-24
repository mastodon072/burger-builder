import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state= {
        orderForm: {
          name: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your name',
            },
            value: '', 
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          phone: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Phone',
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your Email',
            },
            value: '', 
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          zipCode: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Zip Code',
            },
            value: '', 
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5
            },
            valid: false,
            touched: false
          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Country',
            },
            value: '', 
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {
                  value: 'fastest',
                  displayValue: 'Fastest'
                },
                {
                  value: 'cheapest',
                  displayValue: 'Cheapest',
                }
              ],
              placeholder: 'Country',
            },
            value: 'fastest', 
            validation: {},
            valid: true
          },
        },
        formIsValid: false,
        loading: false,

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
          ingredients: this.props.ings,
          price: (+this.props.price).toFixed(2), //You would want to calculate price in server in real app
          orderData: formData
        }
        axios.post('/orders.json', order).then(response => {
          this.setState({loading: false});
          this.props.history.push('/');
        }).catch(error => {
          console.log(error);
          this.setState({loading: false, purchasing: false});
        });
    }

    checkValidity(value, rules) {

      if(!rules) {
        return true;
      }

      let isValid = true;
      if(rules.required ) {
        isValid = value.trim() !== '' && isValid;
      }
      if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if(rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid;
      }

      return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      }
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      }

      updatedFormElement.value = event.target.value;
      if( updatedFormElement.validation ) {
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      }
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for(let inputIdentifiers in updatedOrderForm) {
        if(updatedOrderForm[inputIdentifiers].validation) {
          formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
        }
      }

      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }

    render () {
        const formElementsArray = [];
        for( let key in this.state.orderForm) {
          formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
          })
        }
        let form = (
              <form onSubmit={this.orderHandler}>
                  {formElementsArray.map(formElement => (
                    <Input 
                      keyy={formElement.id}
                      elementType={formElement.config.elementType} 
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.value}
                      invalid={!formElement.config.valid}
                      touched={formElement.config.touched}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)}
                      />
                  ))}
                  <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
              </form>
            );
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);