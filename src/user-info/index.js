import React from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import './style.scss';

class UserInfo extends React.Component {
    state = {
        data: null
    };

    componentDidMount() {
        const {location} = this.props;
        const id = location.search && location.search.split('?')[1];
        axios.get(`https://reqres.in/api/users/${parseInt(id)}`).then(response => {
            if (response.data) {
                this.setState({
                    data: {...response.data.data, ...response.data.ad}
                });
            }
        })
    }

    render() {
        const {data} = this.state;
        return (
            <div className="user_info">
                <img src={(data && data.avatar)} alt="User Image" />
                <div className='user_name'>
                    <span>{(!!data && data.first_name) + (!!data && data.last_name)}</span>
                </div>
                <p>{!!data && data.company}</p>
                <p>{!!data && data.text}</p>
                <p>{!!data && data.email}</p>
            </div>
        );
    }
}

export default withRouter(UserInfo);