import React from 'react';
import axios from 'axios';
import shortID from 'shortid';

class Home extends React.Component {
  state = {
    movies: [],
  }

  componentWillMount() {
    axios.get('http://localhost:3005/editdb/getMovies').then((res) => {
      this.setState({
        movies: res.data,
      });
    });
  }

  getMovieThumbnails = () => (this.state.movies.map(movie => (
    <li>
      <img key={shortID.generate()} src={movie.PHOTO} alt="thm" />
      <div>
        <div className="movie-heading">{movie.NAME}</div>
        <div><a href={`/viewMovie/?movieid=${movie.ID}`} >VIEW</a></div>
      </div>
    </li>
  )))

  render() {
    return (
      <div className="home">
        <ul className="thumbnails">
          {this.getMovieThumbnails()}
        </ul>
      </div>
    );
  }
}


export default Home;
