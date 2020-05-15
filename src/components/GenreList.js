import React from 'react';
import { NavLink, Link } from "react-router-dom";

function GenreList({ genreIds }) {       
  let links = genreIds.map((val, index) => {
    if(index === 0) {
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

// function GenreList({ genreIds }) {       
//     let links = genreIds.map((val, index) => (
//     <li
//      key={val.id}
//      data-id={val.id}
//      >
//     <Link 
//     to={`/genre/${val.id}`}    
//     className="genre-link"    
//     data-genre-id={val.id}    
//     >
//     {val.name}
//     </Link> 
//     </li>
//     ))
//     return (
//       <div className="genre-list">        
//         <ul>{links}</ul>             
//       </div>
//     );

// }


export default GenreList;
