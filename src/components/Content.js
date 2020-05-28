import React from 'react';
import { Switch,  Route } from "react-router-dom";
import GenreList from './GenreList';
import Home from './Home';
import Movie from './Movie';
import PropTypes from 'prop-types';


function Content( props ) {
  return (
    <div className="content">   
      <GenreList
      {...props}
       />
      <Switch>        
        <Route  exact path="/(|movie-locker-3)" render={({match }) => ( 
              <Home
              {...match}
              {...props} />
            )}
          />       
        <Route  path="/genre/:id" render={({match }) => (
              <Home
              {...match}
              {...props}/>
            )}
          />      
        <Route path="/movie/:id" render={(routeProps) => (
              <Movie 
              {...routeProps}
              props />
            )}
          />           
      </Switch>     
    </div>
  );
}

Content.propTypes = {
  popular: PropTypes.arrayOf(PropTypes.object),
  currentView: PropTypes.arrayOf(PropTypes.object),
  genreIds: PropTypes.arrayOf(PropTypes.object),
  numPages: PropTypes.number,
  currentPage: PropTypes.number,
  handleClickPage:  PropTypes.func, 
  handleUpdateView:  PropTypes.func, 
}

export default Content;