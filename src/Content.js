import React from 'react';
import { Switch,  Route } from "react-router-dom";
import './scss/Content.scss';
import GenreList from './GenreList';
import Home from './Home';
import Movie from './Movie';


function Content( props ) { 

  return (
    <div className="content">   
      <GenreList
      {...props}
       />
      <Switch>
      <Route  exact path="/" render={({match }) => (
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