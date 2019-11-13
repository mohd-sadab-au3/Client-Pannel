import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import Input from '../../../components/UI/Input/Input';
import PropTypes from 'prop-types'


class AddClient extends Component {

    state = {

        firstName: "",
        lastName: "",
        email: "",
        balance: "",
        phone: ""

    }

    inputChangeHandler = (e) => (this.setState({ [e.target.name]: e.target.value }));

    submitHandler = (e) => {
        e.preventDefault();

        const newValue = this.state;
        if (!newValue.balance) {
            newValue.balance = 0;
        }
        const { firestore, history } = this.props;

        firestore.add({ collection: "clients" }, newValue).then(() => history.push("/"));



    }


    render() {
        const { disableBalanceOnAdd } = this.props.settings;
        console.log(disableBalanceOnAdd);

        const Form = (
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
                <Input type="number"
                    inputChange={this.inputChangeHandler}
                    value={this.state.phone} name="phone"
                    label="Phone"
                />
                <Input
                    inputChange={this.inputChangeHandler}
                    value={this.state.balance} name="balance"
                    label="Balance"
                    required={false}
                    disabled={disableBalanceOnAdd}
                />
                <input type="submit" className="btn btn-block btn-primary" />
            </form>
        )
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6">
                        <Link className="btn btn-link" to="/">
                            <i className="fas fa-arrow-circle-left"> Go back to dashboard</i>
                        </Link>
                    </div>
                </div>
                <div className="card mb-5">
                    <div className="card-header">
                        Add Client
                    </div>
                    <div className="card-body">
                        {Form}
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {

    return {
        settings: state.settings
    }
}
export default compose(
    firestoreConnect(),
    connect(mapStateToProps)
)(AddClient);