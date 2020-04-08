import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getPage from './helper';
import * as apiCalls from './api';
// import './scss/MovieGallery.scss'

const baseUrlW154 = "http://image.tmdb.org/t/p/w154/";

class MovieGallery extends Component {
  
  constructor(props) {
  super(props); 
  this.state = {    
    genres: [],
    numPages: 5,
    currentPage: 1,
    currentView: []      
  };
    
    this.handleClickPage = this.handleClickPage.bind(this);  
  }

  
  handleClickPage(e) {
    let pageNum = e.target.id;    
    let nextView = getPage(pageNum, this.state.genres)
    
    this.setState({currentPage: pageNum, currentView: nextView});
  }   

  // get a list of movies with a genre id
  async loadGenresWithIds(id) {
    try {
      let genreList =  await apiCalls.getGenres(id);     
      let currentView = getPage(this.state.currentPage, genreList);       
      this.setState({genres: genreList, currentView: currentView});
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {    
    this.loadGenresWithIds(this.props.params.id);  
  }

  componentDidUpdate(prevProps) {
    if(prevProps.params.id !== this.props.params.id) {
      this.loadGenresWithIds(this.props.params.id);  
    } 
   
  }
  
  renderPagelinks() {
    let pageNumbers = [];
    for(let i = 1; i <= this.state.numPages; i++) {
      pageNumbers.push(
        <li
        key={i}
        id={i}
        onClick={this.handleClickPage}
      >{i}</li>
      )
    }
    return (pageNumbers);
  }
  
 
  render() {
    
    let pageNumbers = this.renderPagelinks();
    let noBlankImages = this.state.currentView.filter(movie => movie.poster_path);
    let movies = noBlankImages.map((movie) => {     
      return (       
        <li 
        className="gallery-item"
        key={movie.id}
        >
          <Link to={`/movie/${movie.id}`}>
          <img
            src={`${baseUrlW154}${movie.poster_path}`}
            className="gallery-img"
            />
          <p className="gallery-caption">{movie.original_title}</p>
          </Link>        
          
        </li>        
        );
      });
    return (
      <div className="movie-gallery">
         <ul className="gallery">
         {movies}
         </ul> 
         <ul className="pageLinks">
           {pageNumbers}
         </ul>
      </div>
    );
  }
}

export default MovieGallery;