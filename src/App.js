import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {}
    //console.log("This is my Initializer");

    // const movies = [
    //   {id: 0, poster_src: "https://ia.media-imdb.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg", title: "Avengers: Infinity War", overview: "As the ....."},
    //   {id: 1, poster_src: "https://ia.media-imdb.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg", title: "The Avengers", overview: "This is second movie overview"},
      
    // ]

    // var movieRows = [];

    // movies.forEach((movie) => {
    //   console.log(movie.id);
    //   const movieRow = <MovieRow movie={movie}/>
    //   movieRows.push(movieRow);
    // })

    // this.state = {rows: movieRows};

    this.performSearch("Avengers");

  }

  performSearch(searchTerm){
    console.log("Perform search using movieDB");
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=d025ac25cb4a5d6c52bc62bf2a859515&query=" + searchTerm; 
    $.ajax({
      url: urlString,
      success: (searchResult) => {
        console.log("Fetched data successfully");
        const result = searchResult.results;

        var movieRows = [];

        result.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185/" + movie.poster_path;
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow);
        });

        this.setState({rows: movieRows})

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event){
    console.log(this);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="45" src="clapperboard.svg" />
              </td>
              <td width="7" />
              <td>
                <h2>MoviesDB Search</h2>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 20,
          display: 'block',
          width: '100%',
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 8
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search terms" />

        {this.state.rows}

      </div>
    );
  }
}

export default App;
