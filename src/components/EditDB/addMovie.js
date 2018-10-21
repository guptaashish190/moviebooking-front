import React from 'react';
import shortID from 'shortid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class AddMovie extends React.Component {
    state = {
      name: '',
      photo: '',
      languages: [],
      selectedLanguage: '',
      description: '',
    }
    componentWillMount() {
      axios.get('http://localhost:3005/editdb/getLanguages').then((res) => {
        this.setState({
          languages: res.data,
          selectedLanguage: res.data[0].ID,
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

    addMovie = () => {
      if (this.state.name && this.state.photo) {
        const movie = {
          NAME: this.state.name,
          PHOTO: this.state.photo,
          THEATRES: [],
          LANGUAGEID: this.state.selectedLanguage,
          DESCRIPTION: this.state.description,
          ID: shortID.generate(),
        };
        axios.post('http://localhost:3005/editdb/movies/add', { movie }).then(() => {
          this.props.history.push('/editdb/viewMovies');
        });
      }
    }

    render() {
      return (
        <div className="add-movie-container">
          <img className="photo-url" src={this.state.photo} alt="urlphoto" />
          <div className="add-movie">
            <span>Add Movie</span>
            <input type="text" placeholder="Name" onChange={e => this.onChangeHandler(e, 'name')} />
            <input type="text" placeholder="Photo" onChange={e => this.onChangeHandler(e, 'photo')} />
            <input type="text" placeholder="Description" onChange={e => this.onChangeHandler(e, 'description')} />

            <select value={this.state.selectedLanguage} onChange={e => this.onLanguageSelect(e)}>
              {this.state.languages.map(language => <option key={shortID.generate()} value={language.ID}>{language.LANGUAGE}</option>)}
            </select>
            <button onClick={() => this.addMovie()}>Add!</button>
          </div>
        </div>
      );
    }
}


export default withRouter(AddMovie);

