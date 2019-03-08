import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} onClick={props.clickedLogo} >
        <img src={burgerLogo} alt="myBurger" />
    </div>

);

export default logo;
