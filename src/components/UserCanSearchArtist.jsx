import React, { Component } from "react";
import axios from "axios";
 class UserCanSearchArtist extends Component {
  state = {
    query2: ""
  };
  onSubmitHandler = async e => {
    try {
      e.preventDefault();
      let response = await axios.get("http://localhost:3000/api/v1/artists", {
        params: {
          q: e.target.elements.query.value
        }
      });
      this.setState({
        artists: response.data.artists
      });
    } catch (error) {
      this.setState({
        errorMessage: error.response.data.error_message
      });
    }
  };
  render() {
    let results;
    let message; 
    if (this.state.errorMessage) {
      message = <p id="errorMessage">{this.state.errorMessage}</p>;
    }
    if (this.state.artists) {
      results = this.state.artists.map(artist => {
        return (
          <div id={"artist-" + artist.spotify_id} key={artist.spotify_id}>
            <p id="artistName">{artist.name}</p>{" "}
            <p id="songName">{artist.track}</p>
          </div>
        );
      });
    }

    return (
      <>
        <form onSubmit={this.onSubmitHandler}>
          <input id="search-field" name="query2" />
          <button type="submit" id="search">
            Search Track
          </button>
        </form>
        <div>
          {results}
          {message}
        </div>
      </>
    );
  }
}
export default UserCanSearchArtist;
