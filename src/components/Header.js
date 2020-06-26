import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import searchIcon from '../magnifying-glass.svg';
import PropTypes from 'prop-types';

function Header(props) {
  //using array destructuring to give different names to state variables
  const [selected, setSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [toHome, setToHome] = useState(false); 
  
  function onChangeSelect(event) {
    setSelected(event.target.value);   
    props.handleSelect( event.target.value);
    setToHome(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSearch(searchTerm);
    setToHome(true);
  }

  function onSearch(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);    
  }

  //useEffect serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes
  useEffect(() => {    
    return () => {      
      setToHome(false);
    };
  });
  
  // Redirect to Home component if movie search or selected drop down is performed  
  if(toHome) {
    return <Redirect to='/' />
  }
 
  return (
    <div className="header">
      <div className="logo"><a href="/movie-locker-3/">Movie<span>Locker</span></a></div>      
      <form
        onSubmit={handleSubmit}
        className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearch}/>
        <button 
          type="submit"
          className="search__button"
          >
          <img src={searchIcon} className="search__icon" alt=""/>          
          </button>
      </form>
        <form className="select-form">         
          <select className="select-view" defaultValue={selected} onChange={onChangeSelect}>            
            <option value="In Cinema Now">In Cinema</option>
            <option value="Top Rated">Top Rated</option>             
            <option value="Upcoming">Upcoming</option>
          </select>         
      </form>
    </div>
  );
}

Header.propTypes = {
  handleSelect: PropTypes.func,
  handleSearch: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default Header;


