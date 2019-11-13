import React from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store, { rrfProps } from './redux/store/store';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import AddClient from './containers/Clients/AddClient/AddClient';
import ClientDetails from './containers/Clients/ClientDetails/ClientDetails';
import ClientUpdate from './containers/Clients/ClientUpdate/ClientUpdate';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './HOC/RouteGuard/RouteGuard';
import Settings from './containers/Settings/Settings';

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
                <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                <Route exact path="/client/edit/:id" component={UserIsAuthenticated(ClientUpdate)} />
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
