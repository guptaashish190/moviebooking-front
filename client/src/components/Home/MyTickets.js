import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import shortID from 'shortid';
// import { connect } from 'react-redux';

class MyTicket extends React.Component {
  state = {
    ticket: '',
    tickets: [],
  }


  componentWillMount() {
    if (Object.keys(this.props.user).length !== 0) {
      console.log(this.props.user);
      axios.get('http://localhost:3005/editdb/getUserTickets', { params: { GOOGLEID: this.props.user.GOOGLEID } }).then((res) => {
        this.setState({
          tickets: [...res.data],
        });
      });
    }
  }

  getTickets = () => (this.state.tickets.map(ticket => (
    <li key={shortID.generate()}>
      <div>
        <span>Ticket ID: <span className="info">{ticket._id}</span></span>
        <span>Date: <span className="info"> {ticket.DATE}</span></span>
        <span>Time: <span className="info"> {ticket.TIME}</span></span>
        <span>MovieID: <span className="info">{ticket.MOVIEID}</span></span>
        <span>TheatreID: <span className="info"> {ticket.THEATREID}</span></span>
        <a href={`/bookticket/booking?ticketid=${ticket._id}`} >VIEW TICKET</a>
      </div>
    </li>
  )))

  render() {
    return (
      <div className="my-tickets">
        <ul>
          {this.getTickets()}
        </ul>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     user: state.userLoginReducer.user,
//   };
// }

export default MyTicket;
