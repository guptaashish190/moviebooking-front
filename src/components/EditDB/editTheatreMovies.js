import React from 'react';
import shortID from 'shortid';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import config from '../../../config';

class EditTheatreMovies extends React.Component {
    state = {
      name: '',
      location: '',
      id: '',
      movies: [],
      moviesData: [],
      allmovies: [],
    }
    componentWillMount() {
      const { id } = queryString.parse(location.search);
      this.setState({
        id,
      });
      axios.get(`${config.bserver}/editdb/getTheatrefromID`, { params: { ID: id } }).then((res) => {
        this.setState({
          name: res.data.NAME,
          location: res.data.LOCATION,
          movies: res.data.MOVIES,
        });
      });

      axios.get(`${config.bserver}/editdb/getMovies`).then((res) => {
        this.setState({
          allmovies: res.data,
        }, () => {
          for (let i = 0; i < this.state.movies.length; i += 1) {
            let movieData;
            axios.get(`${config.bserver}/editdb/getMoviefromID`, { params: { ID: this.state.movies[i].ID } }).then((res1) => {
              movieData = res1.data;
              this.setState({
                moviesData: [...this.state.moviesData, movieData],
              });
            });
          }
        });
      });
    }
    getMovies = () => (
      <table>
        <thead>
          <tr>
            <th>SNo.</th>
            <th>MOVIE NAME</th>
            <th>MOVIE ID</th>
            <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {this.state.moviesData.map((movie, index) => (
            <tr key={shortID.generate()}>
              <td>{index + 1}</td>
              <td>{movie.NAME}</td>
              <td>{movie.ID}</td>
              <td><button onClick={() => this.remove(movie.ID)}>X</button></td>
            </tr>
                      ))}
        </tbody>
      </table>
    )


    getAllMovies = () => (
      this.state.allmovies.map(movie => (
        <option key={shortID.generate()} value={movie.ID}>{movie.NAME}</option>
      ))
    )

    addMovieToTheatre = () => {
      let e = document.getElementById('movie-select-dropdown');
      if (e.options[e.selectedIndex]) {
        let selectedMovieID = e.options[e.selectedIndex].value;
        if (!this.state.movies.find(movie => movie.ID === selectedMovieID)) {
          const finalMovies = [...this.state.movies,
            {
              ID: selectedMovieID,
              TIMES: [
                {
                  TIME: '10:00AM',
                  SEATSBOOKED: [],
                },
                {
                  TIME: '5:00PM',
                  SEATSBOOKED: [],
                },
                {
                  TIME: '9:00PM',
                  SEATSBOOKED: [],
                },
              ],
            }];
          const theatre = {
            NAME: this.state.name,
            LOCATION: this.state.location,
            ID: this.state.id,
            MOVIES: finalMovies,
          };
          axios.post(`${config.bserver}/editdb/theatres/edit`, { theatre }).then(() => {
            window.location.reload();
          });
        }
      }
    }

    remove = (id) => {
      const initMovies = this.state.movies;
      const finalMovies = initMovies.filter(movie => movie.ID !== id);
      const theatre = {
        NAME: this.state.name,
        LOCATION: this.state.location,
        MOVIES: finalMovies,
        ID: this.state.id,
      };
      axios.post(`${config.bserver}/editdb/theatres/edit`, { theatre }).then(() => {
        window.location.reload();
      });
    }

    render() {
      return (
        <div className="theatre-movies-container">
          <div className="heading">{`Movies in Theatre ID: ${this.state.id}`}</div>
          {this.getMovies()}
          <div className="add-movies-theatre">
            <select id="movie-select-dropdown">
              {this.getAllMovies()}
            </select>
            <button onClick={() => this.addMovieToTheatre()}>Add Selected Movie To Theatre</button>
          </div>
        </div>
      );
    }
}


export default withRouter(EditTheatreMovies);

