import React from 'react';
import axios from 'axios';
import shortID from 'shortid';
// import { connect } from 'react-redux';

class AllTickets extends React.Component {
  state = {
    tickets: [],
  }


  componentWillMount() {
    axios.get('http://localhost:3005/editdb/getAllTickets').then((res) => {
      this.setState({
        tickets: [...res.data],
      });
    });
  }

  getTickets = () => (this.state.tickets.map(ticket => (
    <li key={shortID.generate()}>
      <div>
        <span>Ticket ID: <span className="info">{ticket._id}</span></span>
        <span>Date: <span className="info"> {ticket.DATE}</span></span>
        <span>Time: <span className="info"> {ticket.TIME}</span></span>
        <span>MovieID: <span className="info">{ticket.MOVIEID}</span></span>
        <span>TheatreID: <span className="info"> {ticket.THEATREID}</span></span>
        <span>User-GoogleID: <span className="info"> {ticket.GOOGLEID}</span></span>
      </div>
    </li>
  )))

  render() {
    return (
      <div className="all-tickets">
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

export default AllTickets;
