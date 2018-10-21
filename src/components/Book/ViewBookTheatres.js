import React from 'react';
import axios from 'axios';
import shortID from 'shortid';
import queryString from 'query-string';
import config from '../../../config';

class ViewBookTheatres extends React.Component {
  state = {
    theatres: undefined,
    movieID: '',
  }

  componentWillMount() {
    this.props.setLoading(true);
    axios.get(`${config.bserver}/editdb/getTheatres`).then((res) => {
      this.props.setLoading(false);
      this.setState({
        theatres: res.data,
      }, () => {
        this.setState({
          movieID: queryString.parse(location.search).movieid,
        });
      });
    });
  }

  getTheatreTDs = () => {
    const { theatres } = this.state;
    let filteredTheatres = [];
    if (theatres && this.state.movieID !== '') {
      filteredTheatres = theatres.filter((theatre) => {
        if (theatre.MOVIES.findIndex(movie => movie.ID === this.state.movieID) !== -1) {
          return true;
        }
        return false;
      });
    }

    return (filteredTheatres.map(theatre => (
      <tr key={shortID.generate()}>
        <td>{theatre.NAME}</td>
        <td>{theatre.LOCATION}</td>
        <td>
          <a href={`/bookticket/viewBookSeats/?movieid=${this.state.movieID}&theatreid=${theatre.ID}&time=${10}`}>10:00AM</a>
          <a href={`/bookticket/viewBookSeats/?movieid=${this.state.movieID}&theatreid=${theatre.ID}&time=${5}`}>05:00PM</a>
          <a href={`/bookticket/viewBookSeats/?movieid=${this.state.movieID}&theatreid=${theatre.ID}&time=${9}`}>09:00PM</a>
        </td>
      </tr>
    )));
  }

  render() {
    return (
      <div className="book-view-theatres" >
        <table>
          <thead>
            <tr>
              <th>THEATRE NAME</th>
              <th>THEATRE LOCATION</th>
              <th>BOOK</th>
            </tr>
          </thead>
          <tbody>
            {this.getTheatreTDs()}
          </tbody>
        </table>
      </div>
    );
  }
}


export default ViewBookTheatres;
