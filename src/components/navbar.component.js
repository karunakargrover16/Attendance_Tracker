import React , {Component } from 'react';
import { Link,withRouter } from 'react-router-dom';

class Navbar extends Component {

    logOut = ()=>{
        localStorage.clear();
        this.props.history.push('/users/login')
    }
    render(){
        const login = <li className="navbar-item">
        <Link to="/users/login" className="nav-link">Log In</Link>
    </li>
    const logout = <li className="navbar-item">
                    <Link onClick={this.logOut} className="nav-link">Log Out</Link>
                    </li>
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Attendance Tracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add New Course</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Sign Up</Link>
                        </li>
                        {
                            localStorage.token ? logout : login
                            
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar)