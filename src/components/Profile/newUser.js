import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import shortID from 'shortid';
import config from '../../../config';

class NewUser extends React.Component {
  constructor(props) {
    super(props);

    const token = window.localStorage.getItem('newUserToken');
    if (!token) {
      this.props.history.push('/login');
    }
    const headers = {
      headers: { authorization: `Bearer ${token}` },
    };
    axios.get(`${config.bserver}/auth/verifyToken`, headers)
      .then((res) => {
        this.setState({
          userInfo: res.data.user.user,
        });
      })
      .catch(() => this.props.history.push('/login'));
  }

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    age: '',
    email: '',
    errors: [],
  }
  componentWillMount() {
    const token = window.localStorage.getItem('newUserToken');
    const headers = {
      headers: { authorization: `Bearer ${token}` },
    };
    axios.get(`${config.bserver}/auth/verifyToken`, headers)
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => this.props.history.push('/login'));
  }

  onChangeHandler = (e, type) => {
    if (type === 'username') {
      if (e.target.value.length > 7) {
        axios.post(`${config.bserver}/profile/new/validateUsername`, { username: e.target.value }).then((response) => {
          if (!response.data.valid) {
            this.setState({
              errors: [...this.state.errors, 'Username taken'],
            });
          } else {
            this.setState({
              errors: this.state.errors.filter(elem => elem !== 'Username taken'),
            });
          }
        });
      } else {
        this.setState({
          errors: this.state.errors.filter(elem => elem !== 'Username taken'),
        });
      }
    }

    if (type === 'age') {
      const { errors } = this.state;
      this.setState({
        age: e.target.value,
      });
      // if (!Number.isInteger(Number(e.target.value)) && errors.indexOf('Please enter a valid age') === -1) {
      //   this.setState({
      //     errors: [...errors, 'Please enter a valid age'],
      //   });
      // } else if ((Number(this.state.age) <= 0 || Number(this.state.age) >= 110) && errors.indexOf('Please enter a valid age') === -1) {
      //   this.setState({
      //     errors: [...errors, 'Please enter a valid age'],
      //   });
      // } else if ((Number(this.state.age) > 0 || Number(this.state.age) < 110) && this.state.age.length > 0) {
      //   console.log('valid');
      //   this.setState({
      //     errors: errors.filter(elem => elem !== 'Please enter a valid age'),
      //   });
      // }
    } else {
      this.setState({
        [type]: e.target.value,
      }, () => {
        const { errors } = this.state;
        if (this.state.passwordConfirmation !== this.state.password && errors.indexOf('Password do not match') === -1) {
          this.setState({
            errors: [...errors, 'Password do not match'],
          });
        } else if (this.state.passwordConfirmation === this.state.password) {
          this.setState({
            errors: errors.filter(elem => elem !== 'Password do not match'),
          });
        }
      });
    }
  }

  onSubmit = () => {
    const userInfo = {
      ...this.state.userInfo,
      USERNAME: this.state.username,
      PASSWORD: this.state.password,
      AGE: Number(this.state.age),
      EMAIL: this.state.email,
    };
    this.props.setLoading(true);
    axios.post(`${config.bserver}/profile/new/addUser`, { userInfo }).then((res) => {
      this.props.setLoading(false);
      if (res.data.status === 'ok') {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.removeItem('newUserToken');
        this.props.history.push('/profile');
      }
    });
  }
  getErrorElements = () => this.state.errors.map(elem => <li key={shortID.generate()}>{elem}</li>)

  render() {
    return (
      <div className="newUserDialog-container">
        <div className="newUserDialog" >
          <ul>
            {this.getErrorElements()}
          </ul>
          <input placeholder="Choose a username" value={this.state.username} type="text" onChange={e => this.onChangeHandler(e, 'username')} />
          <input placeholder="Choose a password" value={this.state.password} type="password" onChange={e => this.onChangeHandler(e, 'password')} />
          <input placeholder="Confirm password" value={this.state.passwordConfirmation} type="password" onChange={e => this.onChangeHandler(e, 'passwordConfirmation')} />
          <input placeholder="Age" value={this.state.age} type="age" onChange={e => this.onChangeHandler(e, 'age')} />
          <input placeholder="E-mail" value={this.state.email} type="email" onChange={e => this.onChangeHandler(e, 'email')} />
          <button type="button" onClick={() => this.onSubmit()}>Done</button>
        </div>
      </div>
    );
  }
}

export default withRouter(NewUser);
