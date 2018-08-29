import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import NavigationBar from './NavigationBar';
import Login from './Login';
import UserLogin from './Login/UserLogin';
import AdminLogin from './Login/AdminLogin';
import protectRouteHOC from './HOCs/protectRouteHOC';
import Profile from './Profile';
import ProfileRedirect from './Profile/profileRedirect';
import NewUser from './Profile/newUser';
import AdminProfile from './Admin/Profile';
import protectAdminRouteHOC from './HOCs/protectAdminRouteHOC';
import NewAdmin from './Admin/newAdmin';

import '../styles/style.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/userlogin" component={UserLogin} />
          <Route exact path="/login/adminlogin" component={AdminLogin} />
          <Route exact path="/profile" component={protectRouteHOC(Profile)} />
          <Route exact path="/redirect" component={ProfileRedirect} />
          <Route exact path="/profile/new" component={NewUser} />
          <Route exact path="/admin" component={protectAdminRouteHOC(AdminProfile)} />
          <Route exact path="/admin/new" component={NewAdmin} />
        </div>
      </Router>
    );
  }
}

export default App;
