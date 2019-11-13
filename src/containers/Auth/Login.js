import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import Input from '../../components/UI/Input/Input';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: false

    }

    onChangeHandler = (e) => {

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })

    }
    formSubmitHandler = (e) => {

        e.preventDefault();

        const { firebase } = this.props;

        const { email, password } = this.state;

        firebase.login({
            email,
            password
        }).then(() => this.setState({ error: false })).catch(() => this.setState({ error: true }));


    }

    render() {

        const { error } = this.state;
        const errorMsg = (
            <div className="alert alert-danger mt-3 mx-1">
                Invalid Email or Password
            </div>
        )

        return (
            <div className="row">

                <div className="col-md-6 col-8 pb-4 pt-3 mx-auto">
                    <div className="card">
                        <h5 className="card-header">
                            <span className="text-primary">
                                <i className="fas fa-lock"> Login</i>

                            </span>
                        </h5>
                        {error ? errorMsg : null}
                        <div className="card-body">
                            <form onSubmit={this.formSubmitHandler}>
                                <Input type="email"
                                    value={this.state.email}
                                    label="Email"
                                    name="email"
                                    inputChange={this.onChangeHandler}
                                    placeholder="Enter Email..."
                                />
                                <Input type="password"
                                    value={this.state.password}
                                    label="Password"
                                    name="password"
                                    inputChange={this.onChangeHandler}
                                    placeholder="Enter Password..."
                                />

                                <input type="submit" value="Login" className="btn btn-block btn-primary" />

                            </form>

                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

Login.propTypes = {

    firebase: PropTypes.object.isRequired

};

export default firestoreConnect()(Login);