import React, { useState, useEffect } from 'react';
import {Fade, Zoom } from 'react-reveal';
import { KEY } from './movie-locker.config';
// import './scss/Movie.scss';


const BASEURL = "https://api.themoviedb.org/3/movie/";
const ENDURL = `?api_key=${KEY}&language=en-US`;
const IMGURL = "http://image.tmdb.org/t/p/";
// const POSTERSIZES = {
//   posterSizes: [
//   "w92",
//   "w154",
//   "w185",
//   "w342",
//   "w500",
//   "w780",
//   "original"] 
// };
function Movie({ match, history}) {
  
  const movieId = match.params.id;

  // the useState hook is a way to provide state to functional components
  const [movie, setMovie] = useState([]); 
  const [movieUrl, setMovieUrl] = useState('');
  const [imageUrl, setImageUrl ] = useState('');
  const [gotMovie, setGotMovie ] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getMovie(movieId);
  });  

  const getMovie = async (id) => { 
    if(gotMovie) {
      return;
    }   
    let movie = await fetch(`${BASEURL}${id}${ENDURL}&append_to_response=videos`).then(res => res.json());
    let imageUrl = `--image-url: url(&quot;${IMGURL}w1280${movie.backdrop_path};)`
    let imgaeUrl2 = `${IMGURL}w1280${movie.backdrop_path}` 
    
    if(movie.videos.results.length < 1) {
      setMovieUrl(''); 
    } else {
    let movieUrl =  `https://www.youtube.com/watch?v=${movie.videos.results[0].key}`;
    setMovieUrl(movieUrl); 
    } 
    setImageUrl(imageUrl);      
    setMovie(movie);
    setGotMovie(true);

  }
    return (    
      <div className="movie-container"  >    
      <div className="movie-container__background" style={{backgroundImage: `url(${IMGURL}w1280${movie.backdrop_path})` }}></div>      
        <div className="movie-container__overlay"></div>      
        <div className="movie-container__content">         
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>                       
          
          <div className="movie-mid-section">
            <img className="movie-img" src={ `${IMGURL}w342${movie.poster_path}`} alt="movie poster" />
            <div className="movie-stats">
              <div>{`Rating: ${movie.vote_average}`}</div>
              <div>{`Runtime: ${movie.runtime}`}</div>
              <div>{`Budget: $${formatMoney(movie.budget)}`}</div>
            </div>
          </div>
          
          <div className="movie-buttons">
              <button
                className="btn"
                onClick={history.goBack}
                >
              Go Back
              </button>
              {movieUrl && <button className="btn">
              <a href={movieUrl} target="_blank"  rel="noopener noreferrer">Trailer</a>
              </button> }
                      
            </div>
          
          
          
        </div>       
      </div>   
    
  ); 
}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

export default Movie;