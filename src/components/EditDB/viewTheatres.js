import React from 'react';
import shortID from 'shortid';
import axios from 'axios';
import config from '../../../config';

class ViewTheatres extends React.Component {
    state = {
      theatres: [],
    }
    componentWillMount() {
      this.props.setLoading(true);
      axios.get(`${config.bserver}/editdb/getTheatres`).then((res) => {
        this.props.setLoading(false);
        this.setState({
          theatres: res.data,
        });
      });
    }
    getTheatres = () => (
      <table>
        <thead>
          <tr>
            <th>SNo.</th>
            <th>THEATRE NAME</th>
            <th>THEATRE LOCATION</th>
            <th>THEATRE ID</th>
            <th>MOVIES</th>
            <th>EDIT</th>
            <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {this.state.theatres.map((theatre, index) => (
            <tr key={shortID.generate()}>
              <td>{index + 1}</td>
              <td>{theatre.NAME}</td>
              <td>{theatre.LOCATION}</td>
              <td>{theatre.ID}</td>
              <td tid={theatre.ID}><a href={`/editDB/editTheatreMovies/?id=${theatre.ID}`}>VIEW</a></td>
              <td><a href={`/editDB/editTheatre/?id=${theatre.ID}`}>EDIT</a></td>
              <td><button onClick={() => this.remove(theatre.ID)}>X</button></td>
            </tr>
        ))}
        </tbody>
      </table>
    )
    remove = (id) => {
      axios.post(`${config.bserver}/editdb/theatres/removebyid`, { ID: id }).then(() => {
        window.location.reload();
      });
    }

    render() {
      return (
        <div className="edit-db-container">
          <div className="heading">Current Database</div>
          <div className="add-buttons">
            <a href="/editDB/addTheatre">Add Theatre</a>
          </div>
          {this.getTheatres()}
        </div>
      );
    }
}


export default ViewTheatres;

