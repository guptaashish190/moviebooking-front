import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import config from '../../../config';

class Home extends React.Component {
  state = {
    movie: {},
  }

  componentWillMount() {
    axios.get(`${config.bserver}/editdb/getMoviefromID`, { params: { ID: queryString.parse(location.search).movieid } }).then((res) => {
      this.setState({
        movie: res.data,
      });
    });
  }

  render() {
    return (
      <div className="view-movie">
        <img src={this.state.movie.PHOTO} alt="photo1" />
        <div className="movie-info">
          <div className="heading">
            {this.state.movie.NAME}
          </div>
          <div className="desc">
            {this.state.movie.DESCRIPTION}
          </div>
          <div className="book">
            <a href={`/bookticket/viewtheatres?movieid=${this.state.movie.ID}`}>Book Tickets</a>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;
