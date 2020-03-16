import React from 'react';
import { Switch,  Route , useParams} from "react-router-dom";
import './scss/Content.scss';
import GenreList from './GenreList';
import Home from './Home';
import Movie from './Movie';
import MovieGallery from './MovieGallery';

function Content( props ) {  
  return (
    <div className="content">   
      <GenreList
      genreIds={props.genreIds}
       />
      <Switch>
      <Route exact path="/" render={({match }) => (
            <Home
             {...match}
             popular={props.popular} />
          )}
        />             
        <Route path="/genre/:id" render={({match }) => (
            <MovieGallery
             {...match}
             {...props} />
          )}
        />
         <Route 
          path="/movie/:id"
          render={(routeProps) => (
          <Movie {...routeProps} props />
          )}
        />           
      </Switch>     
      </div>
  );
}



export default Content;