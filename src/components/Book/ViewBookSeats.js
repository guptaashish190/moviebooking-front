import React from 'react';
import axios from 'axios';
import shortID from 'shortid';
import queryString from 'query-string';
import classnames from 'classnames';
import config from '../../../config';

class ViewBookSeats extends React.Component {
  state = {
    movieid: '',
    theatreid: '',
    time: '',
    theatre: '',
    selectedSeats: [],
  }

  componentWillMount() {
    const { movieid, theatreid, time } = queryString.parse(location.search);
    console.log(movieid, theatreid, time);
    this.setState({
      movieid,
      theatreid,
      time: Number(time),
    });

    axios.get(`${config.bserver}/editdb/getTheatrefromID`, { params: { ID: theatreid } }).then((res) => {
      this.setState({
        theatre: res.data,
      });
    });
  }


  getSeats = () => {
    if (this.state.theatre) {
      const movieAvailability = this.state.theatre.MOVIES.find(movie => movie.ID === this.state.movieid);
      let time = '';
      console.log(this.state.time, 10, this.state.time === 10);
      if (this.state.time === 10) {
        time = '10:00AM';
      } else if (this.state.time === 5) {
        time = '5:00PM';
      } else if (this.state.time === 9) {
        time = '9:00PM';
      }
      const seatsBooked = movieAvailability.TIMES.find(ctime => ctime.TIME === time).SEATSBOOKED;
      let seats = [];
      for (let i = 0; i < 196; i += 1) {
        if (seatsBooked.indexOf(`${i}`) === -1) {
          seats.push(<button onClick={() => this.selectClick(i)} className={classnames({ 'available-seat': true, 'selected-seat': this.state.selectedSeats.indexOf(i) !== -1 })} key={shortID.generate()}>{i}</button>);
        } else {
          seats.push(<button className="unavailable-seat" key={shortID.generate()}disabled>{i}</button>);
        }
      }
      return seats;
    }
    return [];
  }


  getSelectedSeats = () => (this.state.selectedSeats.map(seat => (<span key={shortID.generate()}>{seat}</span>)))

  getUrl = () => (`/bookticket/summary?movieid=${this.state.movieid}&theatreid=${this.state.theatreid}&time=${this.state.time}&selectedseats=${this.state.selectedSeats.join(',')}`)

  selectClick = (i) => {
    if (this.state.selectedSeats.indexOf(i) === -1) {
      this.setState({
        selectedSeats: [...this.state.selectedSeats, i],
      });
    } else {
      this.setState({
        selectedSeats: this.state.selectedSeats.filter(seat => i !== seat),
      });
    }
  }


  render() {
    this.getSeats();
    return (
      <div className="book-view-seats" >
        <div className="heading">Seats Available</div>
        <div className="seat-grid">
          {this.getSeats()}
        </div>
        <div className="status">
          {this.getSelectedSeats()}
        </div>
        <div className="submit">
          <a href={this.getUrl()} >Next Step</a>
        </div>
      </div>
    );
  }
}


export default ViewBookSeats;
