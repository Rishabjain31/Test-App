import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './style.scss';

class Login extends Component {
    state = {
        userName: null,
        password: null,
        errors: {
            userName: '',
            password: ''
        },
        error: false,
    };

    submitHandler = (event) => {
        event.preventDefault();
        let body = {
            email: this.state.userName,
            password: this.state.password
        };
        if(this.state.userName && this.state.password ){
            axios.post('https://reqres.in/api/login', body).then(response => {
                localStorage.setItem('token', JSON.stringify(response.data));
                this.props.history.push('/users');
            })
        } else{
            if(!this.state.userName){
                this.setState({errors:{userName: "Please enter valid email", password:''}, error: true});
            } else{
                this.setState({errors:{userName:'', password: "Please enter valid password"}, error: true});
            }
        }
    };

    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({error: false});
        let errors = this.state.errors;
        switch (name) {
            case 'userName':
                errors.userName = '';
                break;
            case 'password':
                errors.password = '';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});

    };


    render() {
        return (
            <div className='login_container'>
                <div className="form-group email">
                    <label htmlFor="input">Email</label>
                    <input type="email" name="userName" id="input"
                           placeholder="Email" onChange={this.handleChange}/>
                    {this.state.errors.userName &&
                    <span className='error'>{this.state.errors.userName}</span>}
                </div>
                <div className="form-group password">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password"
                           onChange={this.handleChange}/>

                    {this.state.errors.password &&
                    <span className='error'>{this.state.errors.password}</span>}
                </div>
                <div className='login_btn'>
                    <button onClick={this.submitHandler}>Login</button>
                </div>
            </div>
        );
    }
}


export default (withRouter(Login));
