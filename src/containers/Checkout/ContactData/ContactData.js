import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axiosInstance from '../../../axios';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const orderObj = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: {
                    add1: this.state.street,
                    zipCode: this.state.zip,
                    country: 'India'
                },
                email: this.state.email
            },
            deliveryMethod: 'ASAP'
        }
        debugger;
        axiosInstance
            .post('/orders.json', orderObj)
            .then((resp) => {
                console.log(resp);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
                this.setState({loading: false});
            })
    }
    render() {
        let form = <form>
            <input className={classes.Input} type="text" name="name" placeholder="Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Email"/>
            <input
                className={classes.Input}
                type="text"
                name="street"
                placeholder="Street"/>
            <input className={classes.Input} type="text" name="zip" placeholder="Zip"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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