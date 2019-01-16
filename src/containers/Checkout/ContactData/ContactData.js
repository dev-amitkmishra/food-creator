import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import axiosInstance from '../../../axios';

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
                validation:{
                    required: true
                },
                valid: false,
                shouldValidate: true,
                touched: false
            },
            address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                shouldValidate: true,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                shouldValidate: true,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                shouldValidate: true,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                shouldValidate: true,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        }, {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'fastest',
                valid: true,
                shouldValidate: false
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidation = (value, rules) => {
        let isValid = true;
        if(!rules) {
            return true;
        }
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (const identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value
        }
        const orderObj = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axiosInstance
            .post('/orders.json', orderObj)
            .then((resp) => {
                console.log(resp);
                this.setState({loading: false});
                this
                    .props
                    .history
                    .push('/');
            })
            .catch((err) => {
                console.log(err);
                this.setState({loading: false});
            })
    }
    changeHandler = (event, input) => {
        let formIsValid = true;
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElemnt = {
            ...updatedOrderForm[input]
        };
        updatedFormElemnt.touched = true;
        updatedFormElemnt.value = event.target.value;
        updatedFormElemnt.valid = this.checkValidation(updatedFormElemnt.value, updatedFormElemnt.validation);
        for (const key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        updatedOrderForm[input] = updatedFormElemnt;
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })

    }
    render() {
        const formElementsArray = [];
        for (const key in this.state.orderForm) {
            formElementsArray.push({id: key, config: this.state.orderForm[key]})
        }
        let form = <form onSubmit={this.orderHandler}>
            {formElementsArray.map((element) => {
                return <Input
                    key={element.id}
                    changed={(event) => this.changeHandler(event, element.id)}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.shouldValidate}
                    touched={element.config.touched}
                    value={element.config.value}/>
            })}

            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>;
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your details:</h4>
                {form}
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);