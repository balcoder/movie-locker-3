import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

function GenreList({ genreIds }) {       
  let links = genreIds.map((val, index) => {
    if(index === 0) { // make first one active
      return (
        <li
         key={val.id}
         data-id={val.id}
         >
        <NavLink 
        exact to={`/genre/${val.id}`}
        activeClassName="active"
        className="genre-link"    
        data-genre-id={val.id}    
        >
        {val.name}
        </NavLink> 
        </li>
        )
    } else {
      return (
        <li
         key={val.id}
         data-id={val.id}
         >
        <NavLink 
        exact to={`/genre/${val.id}`}       
        className="genre-link"    
        data-genre-id={val.id}    
        >
        {val.name}
        </NavLink> 
        </li>
        )
    }
  })
  return (
    <div className="genre-list">        
      <ul>{links}</ul>             
    </div>
  );

}

GenreList.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.object)
}
export default GenreList;
