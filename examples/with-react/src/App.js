import React, { Component } from 'react';
import { BrowserRouter, MemoryRouter, Link, Route } from 'react-router-dom';
import dynamic from 'lissom/dynamic';
// import async from 'lissom/async';
import logo from './files/logo.svg';
import AsyncCompoent from './async';

import './styles/app.less';

const DynamicComponent = dynamic(() => import('./dynamic'));

// @async(['/', '/dynamic'])
export default class App extends Component {
  static async getInitialProps(ctx) {
    const { location } = ctx;
    // console.log('ctx');
    // console.log('pathname: ', pathname);
    // console.log('location: ', location);
    const value = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          async_value: 1,
        });
      }, 1000);
    });
    return { ...value, location };
  }

  static loadComponent() {
    return <h1>loading</h1>;
  }

  onClick = e => {
    e.preventDefault();
    console.log('click');
  };

  render() {
    // console.log('example props', this.props);
    let Router = BrowserRouter;
    let routeProps = {};
    if (checkServer()) {
      Router = MemoryRouter;
      const { location } = this.props;
      const { pathname, search } = location;
      routeProps = {
        initialEntries: [{ pathname, search }],
      };
    }

    return (
      <div className="App">
        <header className="App-header">
          <Router {...routeProps}>
            <React.Fragment>
              <div className="App-logo">
                <img src={logo} className="App-logo-img" alt="logo" />
              </div>
              <ul className="link-ul">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/dynamic">dynamic</Link>
                </li>
                <li>
                  <Link to="/async">async</Link>
                </li>
              </ul>
              <Route exact path="/" component={Home} />
              <Route path="/dynamic" component={DynamicComponent} />
              <Route path="/async" component={AsyncCompoent} />
            </React.Fragment>
          </Router>
        </header>
      </div>
    );
  }
}

class Home extends Component {
  componentWillMount() {
    console.log('willMount');
  }

  componentWillUnmount() {
    console.log('willUnmount');
  }

  render() {
    const { onClick } = this.props;
    console.log(this.props);

    return (
      <div onClick={onClick} style={{ height: 50, justifyContent: 'center' }}>
        <p style={{ color: 'aqua', fontSize: 24 }}>Lissom</p>
      </div>
    );
  }
}

export const checkServer = () =>
  Object.prototype.toString.call(global.process) === '[object process]';
