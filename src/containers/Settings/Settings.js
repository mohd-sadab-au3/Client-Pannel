import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class Settings extends Component {


    disableBalanceOnAddHandler = () => {

        this.props.disableOnAdd();
    }
    disableBalanceOnEditHandler = () => {

        this.props.disableOnEdit();
    }

    disableRegistrationHandler = () => {
        this.props.disableRegistration();
    }

    render() {
        const { disableBalanceOnAdd, disableBalanceOnEdit, disableRegistration } = this.props.settings;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6 col-6">
                        <Link className="btn btn-link" to="/">
                            <i className="fas fa-arrow-circle-left"> Back To Dashboard</i>
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Edit Settings</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="disableBalanceOnAdd">Disable Balance On Add</label>{' '}
                                <input type="checkbox"
                                    name="disableBalanceOnAdd"
                                    onChange={this.disableBalanceOnAddHandler}
                                    checked={!!disableBalanceOnAdd}
                                    label="Disable Balance On Add"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="disableBalanceOnEdit">Disable Balance On Edit</label>{' '}
                                <input type="checkbox"
                                    name="disableBalanceOnEdit"
                                    onChange={this.disableBalanceOnEditHandler}
                                    checked={!!disableBalanceOnEdit}
                                    label="Disable Balance On Edit"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="disableRegistration">Disable Registration</label>{' '}
                                <input type="checkbox"
                                    name="disableRegistration"
                                    onChange={this.disableRegistrationHandler}
                                    checked={!!disableRegistration}
                                    label="Disable Balance On Add"
                                />
                            </div>
                        </form>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    }

}

const mapDispatchToProps = dispatch => {

    return {

        disableOnAdd: () => dispatch(actions.disableBalanceOnAdd()),
        disableOnEdit: () => dispatch(actions.disableBalanceOnEdit()),
        disableRegistration: () => dispatch(actions.disableRegistration())

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);