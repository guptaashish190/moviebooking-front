import React from 'react';
import { connect } from 'react-redux';
import shortID from 'shortid';
import axios from 'axios';
import theatreActions from '../../actions/theatreActions';

class EditDB extends React.Component {
  render() {
    return (
      <div className="edit-options">
        <a href="editDB/viewTheatres">Edit Theatres</a>
        <a href="editDB/viewMovies">Edit Movie</a>
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
    removeTheatre: theatreID => dispatch(theatreActions.removeTheatre(theatreID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDB);

