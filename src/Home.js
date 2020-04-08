import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Fade, Zoom } from 'react-reveal';
import getPage from './helper';
import * as apiCalls from './api';
// import './scss/MovieGallery.scss'

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

componentDidUpdate(prevProps) {  
  if(this.props.params.id === undefined || this.props.params.id === prevProps.params.id) {   
    return;
  }  
 this.props.handleUpdateView(this.props.params.id)
}
  

  renderPagelinks() {
    let pageNumbers = [];
    for(let i = 1; i <= this.props.numPages; i++) {
      pageNumbers.push(
        <li
        // className="li-page-num"
        className={this.props.currentPage == i ? 'li-page-num__active' : 'li-page-num'}
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
    let movies = noBlankImages.map((movie) => {
    return (       
      <li 
      className="gallery-item"
      key={movie.id}
      >
        <Link to={`/movie/${movie.id}`}>
        <img
          src={`${baseUrlW154}${movie.poster_path}`}
          alt={`${movie.title} cover`}
          className="gallery-img"
          />
        <p className="gallery-caption">{movie.original_title}</p>
        </Link>        
        
      </li>        
      );
    }); 
    return (
      <Zoom >
        <div className="movie-gallery">
        <ul className="pageLinks">
            {pageNumbers}
          </ul>
          <ul className="gallery">
          {movies}
          </ul> 
          
      </div>
      </Zoom>
      
    );
  }
  
}

export default Home;