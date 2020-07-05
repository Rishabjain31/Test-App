import React from "react";
import {withRouter} from 'react-router-dom';
import './style.scss';

function Header(props) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.history.push('/login');
    };

    return (
        <div className="header">
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default withRouter(Header);