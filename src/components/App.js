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
import ViewMovie from './Home/viewMovie';
import ViewBookTheatres from './Book/ViewBookTheatres';
import ViewBookSeats from './Book/ViewBookSeats';
import TicketSummary from './Book/summary';
import Booking from './Book/Booking';
import MyTickets from './Home/MyTickets';
import Home from './Home';

import '../styles/style.scss';
import EditTheatreMovies from './EditDB/editTheatreMovies';
import AllTickets from './EditDB/ViewAllTickets';

class App extends React.Component {
  render() {
    const NavBar = protectRouteHOC(NavigationBar);
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user/home" component={protectRouteHOC(Home)} />
          <Route exact path="/about" component={Home} />
          <Route exact path="/user/tickets" component={protectRouteHOC(MyTickets)} />
          <Route exact path="/admin/tickets" component={protectAdminRouteHOC(AllTickets)} />
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
          <Route exact path="/viewMovie" component={protectRouteHOC(ViewMovie)} />
          <Route exact path="/bookticket/viewtheatres" component={protectRouteHOC(ViewBookTheatres)} />
          <Route exact path="/bookticket/viewBookSeats" component={protectRouteHOC(ViewBookSeats)} />
          <Route exact path="/bookticket/summary" component={protectRouteHOC(TicketSummary)} />
          <Route exact path="/bookticket/booking" component={protectRouteHOC(Booking)} />


        </div>
      </Router>
    );
  }
}

export default App;
