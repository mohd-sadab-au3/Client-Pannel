import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ClientDetails extends Component {
    state = {
        upadtedBalance: '',
        showUpdatedBalance: false,
    }
    inputChangeHandler = () => {
        this.setState((prevstate) => ({ showUpdatedBalance: !prevstate.showUpdatedBalance }))
    }

    updateBalanceHandler = (e) => this.setState({ [e.target.name]: e.target.value });

    deleteHandler = () => {

        const { firestore, client, history } = this.props;

        firestore.delete({ collection: "clients", doc: client.id }).then(() => history.push("/"));

    }

    submitHandler = (e) => {

        e.preventDefault();

        const { firestore, client } = this.props;
        const clientUpdate = {
            balance: parseFloat(this.state.updatedBalance)
        }
        firestore.update({ collection: 'clients', doc: client.id }, clientUpdate).then(() => {

            this.setState({ showUpdatedBalance: false });
        });



    }
    render() {
        const { client } = this.props;
        let showUpdate = null;

        if (this.state.showUpdatedBalance) {
            showUpdate = (
                <form onSubmit={this.submitHandler}>
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control"
                            onChange={this.updateBalanceHandler}
                            value={this.state.name}
                            placeholder="Enter Balance"
                            name="updatedBalance"
                            required
                        />
                        <div className="input-group-append">

                            <input type="submit" value="Update" className="btn btn-outline-dark" />

                        </div>


                    </div>
                </form>
            )
        }

        if (client) {
            return (
                <div>
                    <div className="row">

                        <div className="col-md-6 col-6">
                            <Link className="btn btn-link" to="/">
                                <i className="fas fa-arrow-circle-left"> Back To DashBoard</i>
                            </Link>
                        </div>
                        <div className="col-6">
                            <div className="btn-group btn-group-sm float-right">
                                <Link className="btn btn-dark " to={`/client/edit/${client.id}`}>Edit</Link>
                                <button className="btn btn-danger" onClick={this.deleteHandler}>Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-6 col-md-8 mt-1">

                                    ID:{' ' + client.id}

                                </div>
                                <div className="col-6 col-md-4">
                                    <p className="pull-right">
                                        Balance: <span className="text-primary">
                                            {parseFloat(client.balance).toFixed(2)}
                                            <i className="fas fa-rupee-sign"></i>
                                        </span>{' '}
                                        <button className="btn"
                                            onClick={this.inputChangeHandler}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                    </p>
                                    {showUpdate}
                                </div>

                            </div>
                        </div>

                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Contact-Email:{' ' + client.email}
                                </li>
                                <li className="list-group-item">
                                    Contact-No:{' ' + client.phone}
                                </li>

                            </ul>

                        </div>
                    </div>

                </div>
            );
        }
        else {
            return <Spinner />
        }
    }
}

ClientDetails.propTypes = {

    firestore: PropTypes.object.isRequired
};
const mapStateToProps = (state, props) => {
    const { ordered } = state.firestore
    return {
        client: ordered.client && ordered.client[0]
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
)(ClientDetails);