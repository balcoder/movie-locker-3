import React, { useState, useEffect } from 'react';
import './scss/Movie.scss';
import { Link } from 'react-router-dom';

const BASEURL = "https://api.themoviedb.org/3/movie/";
const ENDURL = "?api_key=16c19602a7121938cf7c160b35c37cea&language=en-US";
const IMGURL = "http://image.tmdb.org/t/p/";
const POSTERSIZES = {
  posterSizes: [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"] 
};
function Movie({ match, history}) {
  
  const movieId = match.params.id;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getMovie(movieId);
  }, []);


  const [movie, setMovie] = useState([]); // the useState hook is a way to provide state to functional components
  const [movieUrl, setMovieUrl] = useState('');

  const getMovie = async (id) => {    
    let movie = await fetch(`${BASEURL}${id}${ENDURL}&append_to_response=videos`).then(res => res.json());
    console.log('MovieURL:::::',movie.videos.results[0].key);
    let movieUrl =  `https://www.youtube.com/watch?v=${movie.videos.results[0].key}`
    setMovieUrl(movieUrl);   
    setMovie(movie);

  }

  return (    
      <div className="movie-container" >
        <div className="movie-overlay" style={{backgroundImage: `url(${IMGURL}w1280${movie.backdrop_path})` }}></div>
        <div className="movie-content" style={{backgroundImage: `url(${IMGURL}w1280${movie.poster_path})` }}>
          <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <button
            className="btn"
            onClick={history.goBack}
            >
          Go Back
          </button>
          <button className="btn">
          <a href={movieUrl} target="_blank">Trailer</a>
          </button>
          
          </div>
          
          
        </div>       
      </div>
    
  );
}





export default Movie;