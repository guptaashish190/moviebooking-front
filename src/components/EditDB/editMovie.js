import React from 'react';
import shortID from 'shortid';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import config from '../../../config';

class AddMovie extends React.Component {
    state = {
      name: '',
      photo: '',
      languages: [],
      selectedLanguage: '',
      description: '',
      ID: '',
    }
    componentWillMount() {
      this.props.setLoading(true);
      axios.get(`${config.bserver}/editdb/getMoviefromID`, { params: { ID: queryString.parse(location.search).id } }).then((res) => {
        this.props.setLoading(false);
        this.setState({
          name: res.data.NAME,
          photo: res.data.PHOTO,
          selectedLanguage: res.data.LANGUAGEID,
          description: res.data.DESCRIPTION,
          ID: res.data.ID,
        });
      });

      axios.get(`${config.bserver}/editdb/getLanguages`).then((res) => {
        this.setState({
          languages: res.data,
        });
      });
    }
    onChangeHandler = (e, type) => {
      this.setState({
        [type]: e.target.value,
      });
    }

    onLanguageSelect = (e) => {
      this.setState({
        selectedLanguage: e.target.value,
      });
    }

    editMovie = () => {
      if (this.state.name && this.state.photo && this.state.description) {
        const movie = {
          NAME: this.state.name,
          PHOTO: this.state.photo,
          THEATRES: [],
          LANGUAGEID: this.state.selectedLanguage,
          DESCRIPTION: this.state.description,
          ID: this.state.ID,
        };
        axios.post(`${config.bserver}/editdb/movies/edit`, { movie }).then(() => {
          this.props.history.push('/editdb/viewMovies');
        });
      }
    }

    render() {
      return (
        <div className="add-movie-container">
          <img className="photo-url" src={this.state.photo} alt="urlphoto" />
          <div className="add-movie">
            <span>Edit Movie</span>
            <input type="text" placeholder="Name" value={this.state.name} onChange={e => this.onChangeHandler(e, 'name')} />
            <input type="text" placeholder="Photo" value={this.state.photo} onChange={e => this.onChangeHandler(e, 'photo')} />
            <input type="text" placeholder="Description" value={this.state.description} onChange={e => this.onChangeHandler(e, 'description')} />

            <select value={this.state.selectedLanguage} onChange={e => this.onLanguageSelect(e)}>
              {this.state.languages.map(language => <option key={shortID.generate()} value={language.ID}>{language.LANGUAGE}</option>)}
            </select>
            <button onClick={() => this.editMovie()}>Edit!</button>
          </div>
        </div>
      );
    }
}


export default withRouter(AddMovie);

