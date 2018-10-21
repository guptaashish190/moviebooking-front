import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import config from '../../../config';

class TicketSummary extends React.Component {
  state = {
    ticket: '',
    movie: '',
    theatre: '',
  }


  componentWillMount() {
    const { ticketid } = queryString.parse(location.search);
    axios.get(`${config.bserver}/editdb/getTicketByID`, { params: { ticketid } }).then((res) => {
      this.setState({
        ticket: res.data,
      }, () => {
        axios.get(`${config.bserver}/editdb/getTheatrefromID`, { params: { ID: this.state.ticket.THEATREID } }).then((th) => {
          this.setState({
            theatre: th.data,
          });
        });

        axios.get(`${config.bserver}/editdb/getMoviefromID`, { params: { ID: this.state.ticket.MOVIEID } }).then((mov) => {
          this.setState({
            movie: mov.data,
          });
        });
      });
    });
  }

  getTime = (timeint) => {
    if (timeint === 5) {
      return '5:00PM';
    } else if (timeint === 10) {
      return '10:00AM';
    }
    return '9:00PM';
  }

  render() {
    return (
      <div className="ticket-booking">
        <div className="success">YOUR TICKET</div>
        <div className="ticket">
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
          TIME: <span>{this.getTime(this.state.ticket.TIME)}</span>
          </div>
          <div>
          DATE: <span>{this.state.ticket.DATE}</span>
          </div>
          <div>
          SEATS: <span>{this.state.ticket.SEATS}</span>
          </div>
        </div>
        <div><button onClick={() => { this.props.history.push('/user/home'); }}>HOME</button></div>
      </div>
    );
  }
}


export default withRouter(TicketSummary);
