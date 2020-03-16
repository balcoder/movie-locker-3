import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './scss/GenreList.scss';




function GenreList({genreIds}) {       
    let links = genreIds.map(val => (
    <li
     key={val.id}
     data-id={val.id}
     >
    <Link 
    to={`/genre/${val.id}`}
    className="genre-link"    
    data-genre-id={val.id}>
    {val.name}
    </Link> 
    </li>
    ))
    return (
      <div className="genre-list">        
        <ul>{links}</ul>             
      </div>
    );

}



export default GenreList;
