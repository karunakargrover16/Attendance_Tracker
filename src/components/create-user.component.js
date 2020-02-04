import React, {Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component{

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

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
        .then(res =>{
            this.props.history.push('/')
        });
        

        this.setState({
            email: '',
            password: ''
        })

    }


    render(){
        return(
        <div>
            <h3>Create New User Here</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                        <label>Email : </label>
                        <input type="email"
                        className="form-control"
                        value={this.setState.email}
                        onChange={this.onChangeEmail}
                     /></div>
                 <div className="form-group">
                        <label>Password : </label>
                        <input type="password"
                        required
                        className="form-control"
                        value={this.setState.password}
                        onChange={this.onChangePassword}
                     /></div>
                     <div className="form-group">
                         <input type="submit" value="Create User" className="btn btn-primary" />
                     </div>
            </form>
            <button><a href="/login">Login Here</a></button>
            </div>
        )
    }
}