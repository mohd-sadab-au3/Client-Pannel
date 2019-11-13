import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../../components/UI/Spinner/Spinner';
import PropTypes from 'prop-types'

class Clients extends Component {

    state = {
        totalbal: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { clients } = nextProps;

        if (clients) {
            const totalbal = clients.reduce((bal, client) => {
                return bal + parseFloat(client.balance)
            }, 0)

            return {
                totalbal: totalbal.toFixed(2)
            }
        }

        return null;

    }


    render() {
        const { clients } = this.props;
        const { totalbal } = this.state;
        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2> <i className="fas fa-users"> Clients</i> </h2>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-right text-secondary">
                                TotalOwed{' '}
                                <span className="text-primary">{totalbal} <i className="fas fa-rupee-sign"></i></span>
                            </h5>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(info => (
                                <tr key={info.id}>
                                    <td>{info.firstName} {info.lastName}</td>
                                    <td>{info.email}</td>
                                    <td>{info.balance}</td>
                                    <td>
                                        <Link className="btn btn-secondary btn-sm " to={`client/${info.id}`}>
                                            <i className="fas fa-arrow-circle-right">Details</i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div className="container mt-5">
                    <h4>Loading...</h4>
                    <Spinner />
                </div>
            )
        }
    }
}

//or {collection:'clients'}

Clients.propTypes = {
    clients: PropTypes.array
}

const mapStateToProps = (state, props) => ({
    clients: state.firestore.ordered.clients
})

export default compose(firestoreConnect([{ collection: "clients" }]),
    connect(mapStateToProps)
)(Clients);