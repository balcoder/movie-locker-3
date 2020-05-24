import React, { useState, useEffect } from 'react';
import { KEY } from '../movie-locker.config';
import { formatMoney } from '../helpers/helper';


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
    //let imageUrl = `--image-url: url(&quot;${IMGURL}w1280${movie.backdrop_path};)`
    //let imgaeUrl2 = `${IMGURL}w1280${movie.backdrop_path}` 
    
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
      <div className="movie-container__background" style={movie.backdrop_path ? {backgroundImage: `url(${IMGURL}w1280${movie.backdrop_path})` } : {backgoundColor: 'white'}}></div>
        <div className="movie-container__overlay"></div>      
        <div className="movie-container__content">         
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>                       
          
          <div className="movie-mid-section">            
            <img className="movie-img" src={movie.poster_path ?  `${IMGURL}w342${movie.poster_path}` : "" } alt="movie poster" />
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

export default Movie;