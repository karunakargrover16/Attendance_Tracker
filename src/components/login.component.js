import React, {Component } from 'react';
import axios from 'axios';

export default class Login extends Component{

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        sessionStorage.setItem("email",this.state.email);
        axios.post('http://localhost:5000/users/login', user)
        .then(res =>{
            if(res.data.token)
            {
                localStorage.setItem('token',res.data.token)
                this.props.history.push('/')
            }
            else{
                alert(res.data);
            }
        });

    }


    render(){
        return(
        <div>
            <h3>Login.....</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                        <label>Email : </label>
                        <input type="email"
                        className="form-control"
                        required = "true"
                        value={this.setState.email}
                        onChange={this.onChangeEmail}
                     /></div>
                 <div className="form-group">
                        <label>Password : </label>
                        <input type="password"
                        className="form-control"
                        required = "true"
                        value={this.setState.password}
                        onChange={this.onChangePassword}
                     /></div>
                     <div className="form-group">
                         <input type="submit" value="Login" className="btn btn-primary" />
                     </div>
            </form>
            </div>
        )
    }
}