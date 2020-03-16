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
     currentView: [],
     numPages: 10,
     currentPage: 1
   }

   this.loadPopularCurrent();
   this.handleClickPage = this.handleClickPage.bind(this);  
 }

 handleClickPage(e) {
  let pageNum = e.target.id
  debugger
  let nextView = getPage(pageNum, this.state.popular);
  
  this.setState({currentPage: pageNum, currentView: nextView});
}  

 async loadPopularCurrent() {
  try {

    let popular =  await apiCalls.getPopular(this.state.numPages);
    
    let currentView= getPage(this.state.currentPage, popular);        
    this.setState({ popular, currentView });
  } catch (err) {
    console.error(err);
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
    console.log('pageNumbers',pageNumbers);
    let noBlankImages = this.state.currentView.filter(movie => movie.poster_path);
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

export default Home;