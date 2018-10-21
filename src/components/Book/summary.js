import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class TicketSummary extends React.Component {
  state = {
    movieid: '',
    theatreid: '',
    time: '',
    theatre: '',
    selectedseats: '',
    todaysDate: '',
    movie: '',
  }


  componentWillMount() {
    const {
      movieid, theatreid, time, selectedseats,
    } = queryString.parse(location.search);
    axios.get('http://localhost:3005/editdb/getTheatrefromID', { params: { ID: theatreid } }).then((res) => {
      this.setState({
        theatreid,
        movieid,
        theatre: res.data,
        time: Number(time),
        selectedseats,
        todaysDate: this.getData(),
      });
    });

    axios.get('http://localhost:3005/editdb/getMoviefromID', { params: { ID: movieid } }).then((res) => {
      this.setState({
        movie: res.data,
      });
    });
  }

  getData = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    today = `${mm}/${dd}/${yyyy}`;
    return (today);
  }

  bookTickets = () => {
    const ticketInfo = {
      THEATREID: this.state.theatreid,
      MOVIEID: this.state.movieid,
      SEATS: this.state.selectedseats,
      TIME: this.state.time,
      GOOGLEID: this.props.user.GOOGLEID,
      DATE: this.state.todaysDate,
    };

    axios.post('http://localhost:3005/editdb/booktickets', { TICKETINFO: ticketInfo }).then((res) => {
      this.props.history.push(`/bookticket/booking?ticketid=${res.data._id}`);
    });
  }

  render() {
    return (
      <div className="ticket-summary" >
        <div>
          THEATRE: <span>{this.state.theatre.NAME}</span>
        </div>
        <div>
          LOCATION: <span>{this.state.theatre.LOCATION}</span>
        </div>
        <div>
          MOVIE: <span>{this.state.movie.NAME}</span>
        </div>
        <div>
          DATE: <span>{this.state.todaysDate}</span>
        </div>
        <div>
          TIME: <span>{this.state.time}</span>
        </div>
        <div>
          SEATS: <span>{this.state.selectedseats}</span>
        </div>
        <button onClick={() => this.bookTickets()}>BOOK TICKETS</button>
      </div>
    );
  }
}


export default withRouter(TicketSummary);
