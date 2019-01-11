import React, {Component} from 'react';
import axios from '../../axios';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios
            .get('orders.json')
            .then((res) => {
                console.log(res);
                const fetchOrders = [];
                for (const key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchOrders})
            })
            .catch(err => {
                this.setState({loading: true})
            })
    }
    render() {
        return (
            <div>
                {this
                    .state
                    .orders
                    .map((order) => {
                        return <Order ingredients={order.ingredients} price={order.price} key={order.id}/>
                    })}
            </div>
        )
    }
}
export default withErrorHandler(Orders, axios);