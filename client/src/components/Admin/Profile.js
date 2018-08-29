import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class AdminProfile extends React.Component {
  render() {
    return (<h1>Admin Profile {this.props.admin.ADMINNAME}</h1>);
  }
}
export default withRouter(AdminProfile);
