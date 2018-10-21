import React from 'react';
import shortID from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import theatreActions from '../../actions/theatreActions';
import config from '../../../config';

class AddTheatre extends React.Component {
    state = {
      Tname: '',
      TLocation: '',
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

    addTheatre = () => {
      if (this.state.Tname && this.state.TLocation) {
        const theatre = {
          NAME: this.state.Tname,
          LOCATION: this.state.TLocation,
          ID: shortID.generate(),
          MOVIES: [],
        };
        axios.post(`${config.bserver}/editdb/theatres/add`, { theatre }).then(() => {
          this.props.history.push('/editdb');
        });
      }
    }

    render() {
      return (
        <div className="add-theatre-container">
          <span>Add Theatre</span>
          <div className="add-theatre">
            <input type="text" placeholder="Name" onChange={e => this.onChangeHandler(e, 'Tname')} />
            <input type="text" placeholder="Location" onChange={e => this.onChangeHandler(e, 'TLocation')} />
            <button onClick={() => this.addTheatre()}>Add!</button>
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

