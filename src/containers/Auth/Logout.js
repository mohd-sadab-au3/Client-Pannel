import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import Input from '../../components/UI/Input/Input';

class Logout extends Component {

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




    render() {
        return (
            <div>

            </div>
        );
    }
}

Logout.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))

)(Logout);