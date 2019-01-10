import React from 'react';
import Logo from '../../Logo/Logo';
import NavigtionItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from '../../../hoc/_aux';
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={!props.open} clicked={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}><Logo/></div>
                <nav>
                    <NavigtionItems/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;