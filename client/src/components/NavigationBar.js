import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userLoginActions from '../actions/userLoginActions';
import adminLoginActions from '../actions/adminLoginActions';

class NavigationBar extends React.Component {
  getUsernameText = () => {
    console.log(this.props.admin);
    if (Object.keys(this.props.user).length !== 0) {
      return <div className="userHeader" ><span className="usernameText">{this.props.user.DISPLAYNAME}</span><img src={this.props.user.PHOTO} alt="PP" /></div>;
    } else if (Object.keys(this.props.admin).length !== 0) {
      return <div className="adminHeader" ><span className="usernameText">Admin: {this.props.admin.DISPLAYNAME}</span></div>;
    }
    return <div style={{ display: 'none' }} />;
  }

  getLogoutButton = () => {
    if (Object.keys(this.props.user).length !== 0) {
      return (<li><Link to="/login" onClick={() => this.props.logoutUser()}>LOGOUT</Link></li>);
    } else if (Object.keys(this.props.admin).length !== 0) {
      return (<li><Link to="/login" onClick={() => this.props.logoutAdmin()}>LOGOUT</Link></li>);
    }
    return (<li><Link to="/login" >LOGIN</Link></li>);
  }

  getMenuItems = () => (
    <ul>
      <li><Link to="/home" >HOME</Link></li>
      {Object.keys(this.props.user).length !== 0 ? <li><Link to="/movies" >MOVIES</Link></li> : ''}
      {Object.keys(this.props.user).length !== 0 ? <li><Link to="/theatres" >THEATRES</Link></li> : ''}
      {Object.keys(this.props.admin).length !== 0 ? <li><Link to="/editDB" >MODIFY DB</Link></li> : ''}
      {this.getLogoutButton()}
      <li><Link to="/about" >ABOUT</Link></li>
    </ul>
  )

  render() {
    return (
      <div className="navigation-bar">
        <span>showTime</span>
        {this.getUsernameText()}
        {this.getMenuItems()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.userLoginReducer.user,
    admin: state.adminLoginReducer.admin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(userLoginActions.logoutUser()),
    logoutAdmin: () => dispatch(adminLoginActions.logoutAdmin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
