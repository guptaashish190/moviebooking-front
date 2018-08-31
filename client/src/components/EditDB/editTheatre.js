import React from 'react';
import shortID from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import theatreActions from '../../actions/theatreActions';

class AddTheatre extends React.Component {
    state = {
      name: '',
      location: '',
      id: '',
    }

    componentWillMount() {
      const { id } = queryString.parse(location.search);
      axios.get('http://localhost:3005/editdb/getTheatrefromID', { params: { ID: id } }).then((res) => {
        this.setState({
          name: res.data.NAME,
          location: res.data.LOCATION,
          id: res.data.ID,
        });
      });
    }

    onChangeHandler = (e, type) => {
      this.setState({
        [type]: e.target.value,
      });
    }

    getTheatres = () => (
      <ul>
        {this.props.theatres.map(theatre => <li>{theatre}</li>)}
      </ul>
    )

    editTheatre = () => {
      if (this.state.name && this.state.location) {
        const theatre = {
          NAME: this.state.name,
          LOCATION: this.state.location,
          ID: this.state.id,
          MOVIES: [],
        };
        axios.post('http://localhost:3005/editdb/theatres/edit', { theatre }).then(() => {
          this.props.history.push('/editdb/viewTheatres');
        });
      }
    }

    render() {
      return (
        <div className="add-theatre-container">
          <span>Edit Theatre</span>
          <div className="add-theatre">
            <input type="text" value={this.state.name} placeholder="Name" onChange={e => this.onChangeHandler(e, 'name')} />
            <input type="text" value={this.state.location} placeholder="Location" onChange={e => this.onChangeHandler(e, 'location')} />
            <button onClick={() => this.editTheatre()}>Edit!</button>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    theatres: state.theatresReducer.theatres,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTheatre: theatre => dispatch(theatreActions.addTheatre(theatre)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddTheatre));

