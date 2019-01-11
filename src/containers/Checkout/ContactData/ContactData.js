import React, {Component} from 'react';
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
                valid: false
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
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false
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
                valid: false
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
                valid: false
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
                value: ''
            }
        },
        loading: false
    }

    checkValidation = (value, rules) => {
        let isValid = false;
        if(rules.required) {
            isValid = value.trim() !== '';
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
            ingredients: this.props.ingredients,
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
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElemnt = {
            ...updatedOrderForm[input]
        };
        updatedFormElemnt.value = event.target.value;
        updatedFormElemnt.valid = this.checkValidation(updatedFormElemnt.value, updatedFormElemnt.validation)
        updatedOrderForm[input] = updatedFormElemnt;
        this.setState({
            orderForm: updatedOrderForm
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
                    value={element.config.value}/>
            })}

            <Button btnType="Success">ORDER</Button>
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

export default ContactData;