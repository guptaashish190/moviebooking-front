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
import EditDB from './EditDB';
import NewAdmin from './Admin/newAdmin';
import ViewMovies from './EditDB/viewMovies';
import AddTheatre from './EditDB/addTheatre';
import ViewTheatre from './EditDB/viewTheatres';
import EditMovie from './EditDB/editMovie';
import EditTheatre from './EditDB/editTheatre';
import AddMovie from './EditDB/addMovie';

import '../styles/style.scss';
import EditTheatreMovies from './EditDB/editTheatreMovies';

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
          <Route exact path="/editDB" component={protectAdminRouteHOC(EditDB)} />
          <Route exact path="/admin/new" component={NewAdmin} />
          <Route exact path="/editDB/viewMovies" component={protectAdminRouteHOC(ViewMovies)} />
          <Route exact path="/editDB/addMovie" component={protectAdminRouteHOC(AddMovie)} />
          <Route exact path="/editDB/viewTheatres" component={protectAdminRouteHOC(ViewTheatre)} />
          <Route exact path="/editDB/addTheatre" component={protectAdminRouteHOC(AddTheatre)} />
          <Route exact path="/editDB/editMovie" component={protectAdminRouteHOC(EditMovie)} />
          <Route exact path="/editDB/editTheatre" component={protectAdminRouteHOC(EditTheatre)} />
          <Route exact path="/editDB/editTheatreMovies" component={protectAdminRouteHOC(EditTheatreMovies)} />

        </div>
      </Router>
    );
  }
}

export default App;
