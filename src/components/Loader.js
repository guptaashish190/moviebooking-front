import React from 'react';
import { connect } from 'react-redux';

class Loading extends React.Component {
  render() {
    return (
      <div className="loader-container" style={{ display: this.props.loading ? 'flex' : 'none' }}>
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.generalReducer.loading,
});

export default connect(mapStateToProps)(Loading);
