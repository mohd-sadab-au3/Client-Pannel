import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class Navigation extends Component {

    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.auth.uid) {
            return {
                isAuthenticated: true
            }
        }

        return { isAuthenticated: false }
    }

    logOutHandler = () => {

        const { firebase } = this.props;

        firebase.logout();

    }


    render() {
        const { isAuthenticated } = this.state;
        const { auth } = this.props;
        const { disableRegistration } = this.props.settings;
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-primary mb-4">
                <div className="container">
                    <NavLink exact className="navbar-brand" to="/">Client-Pannel</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#NavbarId">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="NavbarId">
                        <ul className="navbar-nav mr-auto ">
                            {isAuthenticated ?
                                (

                                    <li className="nav-item">
                                        <NavLink exact className="nav-link text-white"
                                            to="/">Dashboard</NavLink>
                                    </li>
                                )
                                : null
                            }
                        </ul>
                        <ul className="navbar-nav ml-auto ">
                            {
                                isAuthenticated ?
                                    (
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink exact className="nav-link text-white"
                                                    to="/">{auth.email}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink exact className="nav-link text-white"
                                                    to="/settings">Settings</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <button className="btn nav-link text-white"
                                                    onClick={this.logOutHandler}>Logout</button>
                                            </li>
                                        </React.Fragment>


                                    ) : null

                            }
                        </ul>


                        {
                            !isAuthenticated && !disableRegistration ? (

                                <ul className="navbar-nav ml-auto ">
                                    <li className="nav-item">
                                        <NavLink exact className="nav-link text-white"
                                            to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact className="nav-link text-white"
                                            to="/register">Register</NavLink>
                                    </li>
                                </ul>

                            )
                                : null
                        }
                    </div>

                </div>
            </nav>
        );
    }
}

Navigation.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
        settings: state.settings
    }))

)(Navigation);
