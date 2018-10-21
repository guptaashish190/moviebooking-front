import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    err: null,
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.props.history.push('/profile');
    }
    return true;
  }
  onChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  }

  onSubmitLocal = () => {
    this.props.setLoading(true);
    axios.post(`${config.bserver}/auth/local`, { username: this.state.username, password: this.state.password }).then((res) => {
      this.props.setLoading(false);
      if (!res.data.token) {
        this.setState({
          err: 'User credentials error',
        });
      } else {
        window.localStorage.setItem('token', res.data.token);
        this.props.history.push('/profile');
      }
    });
  }
  render() {
    return (
      <div className="login-container">
        <div>
          {this.state.err ? <span className="error">{this.state.err}</span> : ''}
          <input name="username" className="textfield" onChange={e => this.onChange(e, 'username')} type="text" placeholder="Username" />
          <input name="password" className="textfield" onChange={e => this.onChange(e, 'password')} type="password" placeholder="Password" />
          <input onClick={() => this.onSubmitLocal()} className="login-button" type="button" value="LOGIN" />
        </div>
        <a className="loginBtn loginBtn--google" href={`${config.bserver}/auth/google`} >Login Using Google</a>
      </div>
    );
  }
}
export default withRouter(Login);
