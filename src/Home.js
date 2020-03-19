import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import getPage from './helper';
import * as apiCalls from './api';
import './scss/MovieGallery.scss'

const baseUrlW154 = "http://image.tmdb.org/t/p/w154/";

class Home extends Component {
 constructor(props) {
   super(props);
   this.state = {
     popular: [],
     currentView: []
    
     
   }
  
   this.onClickPage = this.onClickPage.bind(this);  
 }

 onClickPage(e) {
  let pageNum = e.target.id;  
  let nextView = getPage(pageNum, this.props.popular);  
  return nextView;
} 

 // initial state setup
 async loadPopularCurrent() {
  try {    
    let popular =  await apiCalls.getPopular(this.state.numPages);    
    let currentView= getPage(this.props.currentPage, popular);        
    this.setState({ popular, currentView });
  } catch (err) {
    console.error(err);
  }
}

// get a list of movies with a genre id
async loadGenresWithIds(id) {
  try {    
    let genreList =  await apiCalls.getGenres(id);     
    let currentView = getPage(this.props.currentPage, genreList); 
    console.log('loadGenresWithIds', id, currentView);

    this.onUpdateView(currentView);
  } catch (err) {
    console.error(err);
  }
}

componentDidUpdate(prevProps) {
  
  if(this.props.params.id === undefined || this.props.params.id === prevProps.params.id) {
    console.log('componentDidUpdate if undedfined')
    return;
  }
  //console.log('componentDidUpdate', this.props.params.id);
 this.props.handleUpdateView(this.props.params.id)
}
  

  renderPagelinks() {
    let pageNumbers = [];
    for(let i = 1; i <= this.props.numPages; i++) {
      pageNumbers.push(
        <li
        className="li-page-num"
        key={`${i}-${this.props.currentPage}`}
        id={i}
        onClick={this.props.handleClickPage}
      ><span className="span-page-num">{i}</span></li>
      )
    }
    return (pageNumbers);
  }

  render() {    
    let pageNumbers = this.renderPagelinks();    
    let noBlankImages = this.props.currentView.filter(movie => movie.poster_path);
    // let movies = this.state.currentView.map((movie) => {
      let movies = noBlankImages.map((movie) => {
      return (       
        <li 
        className="gallery-item"
        key={movie.id}
        >
          <Link to={`/movie/${movie.id}`}>
          <img
            src={`${baseUrlW154}${movie.poster_path}`}
            alt={`${movie.title} cover image`}
            className="gallery-img"
            />
          <p className="gallery-caption">{movie.original_title}</p>
          </Link>        
          
        </li>        
        );
      }); 
      return (
        <div className="movie-gallery">
          <ul className="pageLinks">
             {pageNumbers}
           </ul>
           <ul className="gallery">
           {movies}
           </ul> 
           
        </div>
      );
  }
  
}

export default Home;