import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_aux';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            })
            this.responseInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            })
        }
        // clean-up the interceptors when they are not in use, else all the componets which are using higher order components
        // will create multiple interceptors because for every component, which are wrapper with HOC, componentWillMount will get called
        // and it will eventually may create memory-leak problem
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }
        errorHandler = () => {
            this.setState({
                error: null
            });
        }
        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
    
            );
        }
    };
};

export default withErrorHandler;