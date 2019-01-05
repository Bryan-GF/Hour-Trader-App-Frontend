import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import MyOffers from './components/myoffers.js';
import { fetchUser, toggleLoginStatus} from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      offers: this.props.offers,
      userInfo: {
        username: '',
        password: ''
      }
    }
  }

  loginHandler = (ev) => {
    ev.preventDefault();
    return axios
      .post('https://hourlybgf.herokuapp.com/api/user/login', this.state.userInfo)
      .then(res => {
        if(res.status = 200 && res.data) {
          localStorage.setItem('user-token', res.data);
          this.props.toggleLoginStatus();
          this.props.history.push('/myoffers')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  logoutHandler = (ev) => {
    ev.preventDefault();
    localStorage.removeItem('user-token')
    this.props.toggleLoginStatus();
    this.props.history.push('/')
  }

  changeHandler = (ev) => {
    this.setState({userInfo: {
      ...this.state.userInfo,
      [ev.target.name]: ev.target.value
    }})
  }

  render() {
    let events = [
      {
        start: '2017-01-06',
        end: '2017-01-08',
        rendering: 'background',
        color: '#00FF00'
      },
    ]
    return (
      <div className="App">
        <Route exact path='/' render ={(props) => (
          <Login {...props} changeHandler={this.changeHandler} loginHandler={this.loginHandler}/> 
        )}/>
        <Route exact path='/myoffers' render = {(props) => (
          <MyOffers {...props} logoutHandler={this.logoutHandler} events={events} />
        )}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user:state.usersReducer.user,
    offers: state.usersReducer.offers
  };
};

export default withRouter(connect(
  mapStateToProps,
  { fetchUser, toggleLoginStatus}, 
)(App));
