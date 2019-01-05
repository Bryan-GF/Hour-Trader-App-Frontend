import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import { fetchUser, toggleLoginStatus} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userInfo: {
        username: '',
        password: ''
      }
    }
  }

  loginHandler = (ev) => {
    ev.preventDefault();
    return axios
      .post('https://hourlybgf.herokuapp.com/api/login', this.state.userInfo)
      .then(res => {
        if(res.status = 200) {
          this.props.fetchUser;
          this.props.toggleLoginStatus
          this.props.history.push('/myoffers')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  changeHandler = (ev) => {
    this.setState({userInfo: {
      ...this.state.userInfo,
      [ev.target.name]: ev.target.value
    }})
  }

  render() {
    return (
      <div className="App">
        <Route path='/' render ={(props) => (
          <Login {...props} changeHandler={this.changeHandler} loginHandler={this.loginHandler}/> 
        )}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user
  };
};

export default withRouter(connect(
  mapStateToProps,
  { fetchUser, toggleLoginStatus}, 
)(App));
