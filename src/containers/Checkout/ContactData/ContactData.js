import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid:false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid:false,
                    touched: false,
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid:false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    touched: false,
                    validation: {
                        required: true,
                    },
                    valid:false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    touched: false,
                    validation: {
                        required: true,
                    },
                    valid:false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [{
                            value: 'fastest',
                            display: 'Fastest',
                        },
                        {
                            value: 'cheapest',
                            display: 'Cheapest',
                        },
                    ]
                    },
                    value: 'fastest',
                    touched: false,
                    valid: true,
                    validation: {}
                    
                },
        },
        formIsValid: false,
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm)
        {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
        
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules)
        {
            return true;
        }

        if(rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) =>
    {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentiifers in updatedOrderForm)
        {
            formIsValid = updatedOrderForm[inputIdentiifers].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const FormElementsArray = [];
        for (let key in this.state.orderForm)
        {
            FormElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                
                {FormElementsArray.map(formElement => (
                    <Input elementType = {formElement.config.elementType} 
                        key = {formElement.id}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed = {(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                ))}
                <Button btnType="Success" disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));