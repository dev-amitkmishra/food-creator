import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    cancelHandler = () => {
        this
            .props
            .history
            .goBack();
    }
    continueHandler = () => {
        this
            .props
            .history
            .replace('/checkout/contact-data');
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCancel={this.cancelHandler}
                    onContinue={this.continueHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};


export default connect(mapStateToProps)(Checkout);