import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <Link to="/login/userlogin">
            User Login
        </Link>
        <Link to="/login/adminlogin">
            Admin Login
        </Link>
      </div>
    );
  }
}


export default Login;
