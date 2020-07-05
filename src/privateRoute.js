import React from 'react';
import Header from '../src/header/index';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    return (

        <Route {...rest} render={props => {
            if (localStorage.getItem("token")) {
                return <>
                    <div>
                        <Header/>
                        <Component {...props} />
                    </div>
                </>

            }
            else {
                return <Redirect to='/login'/>
            }

        }}/>
    )
};

export default PrivateRoute;