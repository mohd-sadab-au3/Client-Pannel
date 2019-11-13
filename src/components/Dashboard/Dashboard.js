import React from 'react'
import { Link } from 'react-router-dom';
import Clients from '../../containers/Clients/Clients';

const Dashboard = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-10">
                    <Clients />
                </div>
                <div className="col-md-2">
                    <Link className="btn btn-success btn-block btn-sm" to="/client/add">
                        <i className="fas fa-plus "> New</i>
                    </Link>
                </div>

            </div>


        </div>
    )
}

export default Dashboard
