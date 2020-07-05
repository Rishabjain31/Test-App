import React from "react";
import PrivateRoute from '../src/privateRoute';
import Login from '../src/login/index';
import Dashboard from '../src/dashboard/index';
import UserInfo from '../src/user-info/index';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

export const routes = [
    {
        exact: true,
        path: "/users",
        component: Dashboard,
    },
    {
        exact: true,
        path: "/users/id",
        component: UserInfo,
    }
];

class MyRoute extends React.Component {
    state = {
        routes: [...routes],
    };

    render() {
        const {routes} = this.state;
        return (

            <div className="main_container">
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    {
                        routes && routes.map((route, index) => {
                                return (
                                    <PrivateRoute key={index} exact={route.exact} path={route.path}
                                                  component={route.component}/>
                                )
                            }
                        )
                    }
                    <Redirect from='/' to='/login' />
                </Switch>
            </div>
        );
    }
}

export default MyRoute;