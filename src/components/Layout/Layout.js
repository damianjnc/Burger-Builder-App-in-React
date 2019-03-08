import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler =() => {
         this.setState({ showSideDrawer: false });
    };

    showSidedrawer = () => {
        this.setState({ showSideDrawer: true });
    }

    render(){
        return(
            <Auxiliary>
                <Toolbar showSidedrawer={this.showSidedrawer} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
             </Auxiliary>

        );
    }
}

export default Layout;