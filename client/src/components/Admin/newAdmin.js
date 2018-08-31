import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import shortID from 'shortid';

class NewUser extends React.Component {
  state = {
    adminName: '',
    password: '',
    passwordConfirmation: '',
    age: '',
    email: '',
    errors: [],
    adminKey: '',
    displayName: '',
  }

  onChangeHandler = (e, type) => {
    if (type === 'adminName') {
      if (e.target.value.length > 7) {
        this.setState({
          errors: this.state.errors.filter(elem => elem !== 'Username should be more than 7 letters'),
        });

        axios.post('http://localhost:3005/admin/new/validateAdminName', { ADMINNAME: e.target.value }).then((response) => {
          if (!response.data.valid && this.state.errors.indexOf('Username should be more than 7 letters') === -1) {
            this.setState({
              errors: [...this.state.errors, 'Admin username already exists'],
            });
          } else {
            this.setState({
              errors: this.state.errors.filter(elem => elem !== 'Admin username already exists'),
            });
          }
        });
      } else if (this.state.errors.indexOf('Username should be more than 7 letters') === -1) {
        const errors = [...this.state.errors, 'Username should be more than 7 letters'];
        this.setState({
          errors,
        }, () => {
          this.setState({
            errors: this.state.errors.filter(elem => elem !== 'Admin username already exists'),
          });
        });
      }
    }

    if (type === 'age') {
      this.setState({
        age: e.target.value,
      });
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
    const adminInfo = {
      ADMINNAME: this.state.adminName,
      DISPLAYNAME: this.state.displayName,
      PASSWORD: this.state.password,
      AGE: Number(this.state.age),
      EMAIL: this.state.email,
      ADMINKEY: this.state.adminKey,
    };
    if (this.state.errors.length === 0 && this.state.adminName !== '' && this.state.password !== '' && this.state.age !== '' && this.state.email !== '') {
      this.setState({
        errors: this.state.errors.filter(elem => elem !== 'Please fill the form correctly'),
      });
      axios.post('http://localhost:3005/admin/new/addAdmin', { adminInfo }).then((res) => {
        if (res.data.status === 'ok') {
          window.localStorage.setItem('adminToken', res.data.token);
          this.props.history.push('/admin');
        } else {
          alert('Admin Key is incorrect');
        }
      });
    } else {
      this.setState({
        errors: [...this.state.errors, 'Please fill the form correctly'],
      });
    }
  }
  getErrorElements = () => this.state.errors.map(elem => <li key={shortID.generate()}>{elem}</li>)

  render() {
    return (
      <div className="newUserDialog-container">
        <div className="newUserDialog" >
          <ul>
            {this.getErrorElements()}
          </ul>
          <input placeholder="Display Name" value={this.state.displayName} type="text" onChange={e => this.onChangeHandler(e, 'displayName')} />
          <input placeholder="Choose a username" value={this.state.adminName} type="text" onChange={e => this.onChangeHandler(e, 'adminName')} />
          <input placeholder="Choose a password" value={this.state.password} type="password" onChange={e => this.onChangeHandler(e, 'password')} />
          <input placeholder="Confirm password" value={this.state.passwordConfirmation} type="password" onChange={e => this.onChangeHandler(e, 'passwordConfirmation')} />
          <input placeholder="Age" value={this.state.age} type="age" onChange={e => this.onChangeHandler(e, 'age')} />
          <input placeholder="E-mail" value={this.state.email} type="email" onChange={e => this.onChangeHandler(e, 'email')} />
          <input placeholder="Admin Key" value={this.state.adminKey} type="adminKey" onChange={e => this.onChangeHandler(e, 'adminKey')} />
          <button type="button" onClick={() => this.onSubmit()}>SUBMIT</button>
        </div>
      </div>
    );
  }
}

export default withRouter(NewUser);
