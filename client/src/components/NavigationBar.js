import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userLoginActions from '../actions/userLoginActions';

class NavigationBar extends React.Component {
  getUsernameText = () => {
    if (Object.keys(this.props.user).length === 0) {
      return <div style={{ display: 'none' }} />;
    }
    return <div className="userHeader" ><span className="usernameText">{this.props.user.DISPLAYNAME}</span><img src={this.props.user.PHOTO} alt="PP" /></div>;
  }

  getMenuItems = () => (
    <ul>
      <li><Link to="/home" >HOME</Link></li>
      <li><Link to="/movies" >MOVIES</Link></li>
      <li><Link to="/theatres" >THEATRES</Link></li>

      {Object.keys(this.props.user).length !== 0 ? <li><Link to="/login" onClick={() => this.props.logoutUser()}>LOGOUT</Link></li> : <li><Link to="/login" >LOGIN</Link></li> }

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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(userLoginActions.logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
