import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

class Login extends React.Component {
  state = {
    adminname: '',
    password: '',
    err: null,
  }

  componentWillMount() {
    const token = window.localStorage.getItem('adminToken');
    if (token) {
      this.props.history.push('/admin');
    }
    return true;
  }
  onChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  }

  onSubmitLocal = () => {
    axios.post(`${config.bserver}/auth/local/admin`, { username: this.state.adminname, password: this.state.password }).then((res) => {
      if (!res.data.token) {
        this.setState({
          err: 'Admin credentials error',
        });
      } else {
        window.localStorage.setItem('adminToken', res.data.token);
        this.props.history.push('/admin');
      }
    });
  }
  render() {
    return (
      <div className="login-container">
        <div>
          {this.state.err ? <span className="error">{this.state.err}</span> : ''}
          <input name="adminname" className="textfield" onChange={e => this.onChange(e, 'adminname')} type="text" placeholder="Admin Username" />
          <input name="password" className="textfield" onChange={e => this.onChange(e, 'password')} type="password" placeholder="Admin Password" />
          <input onClick={() => this.onSubmitLocal()} className="login-button" type="button" value="LOGIN" />
        </div>
        <a className="new-admin" href={`${config.bserver}/</div>admin/new`} >New Admin</a>
      </div>
    );
  }
}
export default withRouter(Login);
