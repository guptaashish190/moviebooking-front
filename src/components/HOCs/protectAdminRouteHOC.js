import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import adminLoginActions from '../../actions/adminLoginActions';
import config from '../../../config';
import generalActions from '../../actions/generalActions';

// ROUTE PROTECT HOC

// Protects Enwrapped components
// 1. Check if there exists user in the redux store ..if yes then render the component
// 2. if not then check if there if a token in the localStorage and verify it
// 3. Set the user after the user if fetched
// 4. any error between these steps results in redirection of page to /login

const protectedRouteHOC = (WrappedComponent) => {
  class ProtectedRoute extends React.Component {
    componentWillMount() {
      if (Object.keys(this.props.admin).length !== 0) {
        return true;
      }
      const token = window.localStorage.getItem('adminToken');
      if (token) {
        const headers = {
          headers: { authorization: `Bearer ${token}` },
        };
        axios.get(`${config.bserver}/auth/verifyToken`, headers).then((response) => {
          if (Object.keys(this.props.admin).length === 0) {
            this.props.setAdmin(response.data.user);
          }
        });
        return true;
      }
      this.props.history.push('/login');
      return false;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  function mapStateToProps(state) {
    return {
      admin: state.adminLoginReducer.admin,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      setAdmin: admin => dispatch(adminLoginActions.setAdmin(admin)),
      setLoading: load => dispatch(generalActions.setLoading(load)),
    };
  }
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute));
};

export default protectedRouteHOC;
