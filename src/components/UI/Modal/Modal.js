import React from 'react';
import classes from './Modal.css';

const model = (props) => (
    <div className={classes.Modal}>
        {props.children}
    </div>
);

export default model;