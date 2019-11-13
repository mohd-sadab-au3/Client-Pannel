import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ClientUpdate extends Component {

    state = {

        firstName: "",
        lastName: "",
        email: "",
        balance: "",
        phone: ""

    }

    inputChangeHandler = (e) => {
        (this.setState({ [e.target.name]: e.target.value }));
    }

    submitHandler = (e) => {
        e.preventDefault();
        const newValue = this.state;

        if (!newValue.balance) {
            newValue.balance = '0';
        }

        const { firestore, history } = this.props;

        firestore.update({ collection: "clients", doc: this.props.client.id }, newValue).then(() => history.push("/"));

    }

    //if you want to control input via state use value defaultValue is used for dealing with uncontrolled input see the docs for handling un controlled input
    componentDidUpdate() {

        if (!this.state.firstName) {
            this.setState({ ...this.props.client });
        }

    }

    render() {
        const { client } = this.props;
        const { disableBalanceOnEdit } = this.props.settings;
        if (client) {
            return (
                <div className="card">
                    <h5 className="card-header">Edit Info</h5>
                    <div className="card-body">
                        <form onSubmit={this.submitHandler}>
                            <Input
                                inputChange={this.inputChangeHandler}
                                value={this.state.firstName} name="firstName"
                                label="First Name"
                            />
                            <Input
                                inputChange={this.inputChangeHandler}
                                value={this.state.lastName} name="lastName"
                                label="Last Name"
                            />
                            <Input
                                inputChange={this.inputChangeHandler}
                                value={this.state.email} name="email"
                                label="Email"
                                type="email"
                                required={false}
                            />
                            <Input
                                inputChange={this.inputChangeHandler}
                                value={this.state.phone} name="phone"
                                label="Phone"
                            />
                            <Input
                                inputChange={this.inputChangeHandler}
                                value={this.state.balance} name="balance"
                                label="Balance"
                                required={false}
                                disabled={disableBalanceOnEdit}
                            />
                            <input type="submit" className="btn btn-block btn-primary" />
                        </form>
                    </div>
                </div>
            );
        }
        else {

            return <Spinner />
        }
    }
}

ClientUpdate.propTypes = {

    firestore: PropTypes.object.isRequired
};
const mapStateToProps = (state, props) => {
    const { ordered } = state.firestore
    return {
        client: ordered.client && ordered.client[0],
        settings: state.settings
    }
}

const path = props => ([
    {
        collection: "clients", storeAs: "client", doc: props.match.params.id
    }
])
export default compose(
    firestoreConnect(path),
    connect(mapStateToProps)
)(ClientUpdate);