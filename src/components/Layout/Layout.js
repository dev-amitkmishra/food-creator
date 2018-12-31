import React, {Component} from 'react';
import Aux from '../../hoc/_aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    };
    sideDrawerClosHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };
    //  sideDrawerClosHandler = () => { };
    render() {
        return (
            <Aux>
                <Toolbar sideDrawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
};

export default Layout;