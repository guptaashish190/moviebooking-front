import React from 'react';
import shortID from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import theatreActions from '../../actions/theatreActions';

class EditMovies extends React.Component {
    state = {
      movies: [],
    }

    componentWillMount() {
      const tid = queryString.parse(location.search).id;

      axios.get('http://localhost:3005/editdb/getMovies').then((res) => {
        console.log(res.data);
        this.setState({
          movies: res.data,
        });
      });
    }


    getMovies = () => (
      <div className="edit-movies-container">
        <div className="heading">Current Movies Database</div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>MOVIE NAME</th>
              <th>LANGUAGEID</th>
              <th>PHOTO</th>
              <th>DESCRIPTION</th>
              <th>EDIT</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={shortID.generate()}>
                <td>{movie.ID}</td>
                <td>{movie.NAME}</td>
                <td>{movie.LANGUAGEID}</td>
                <td><img src={movie.PHOTO} alt="moviepic" /></td>
                <td>{movie.DESCRIPTION}</td>
                <td><a href={`/editDB/editMovie/?id=${movie.ID}`}>EDIT</a></td>
                <td><button onClick={() => this.remove(movie.ID)}>X</button></td>
              </tr>
        ))}
          </tbody>
        </table>
      </div>
    )


    remove = (id) => {
      axios.post('http://localhost:3005/editdb/movies/removebyid', { ID: id }).then(() => {
        window.location.reload();
      });
    }

    render() {
      return (

        <div className="edit-movies-container">
          {this.getMovies()}
          <div className="add-buttons">
            <a href="/editDB/addMovie">Add Movie</a>
          </div>
        </div>

      );
    }
}

export default withRouter(EditMovies);

