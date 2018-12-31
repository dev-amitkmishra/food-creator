import React from 'react';
import Aux from '../../hoc/_aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
    return (
        <Aux>
            <Toolbar />
            <div>Toolbar,SideDrawer, BackDrop</div>
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    );
};

export default layout;