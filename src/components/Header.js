import React, { useState, useEffect } from 'react';
//import { Redirect, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import './scss/Header.scss';
import searchIcon from '../magnifying-glass.svg';

function Header(props) {

  const [selected, setSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [toHome, setToHome] = useState(false);

  //const history = useHistory();
    
  
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
      <div className="logo"><a href="/">Movie<span>Locker</span></a></div>      
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
          {/* <svg className="search__icon">
            <use href="magnifying-glass"></use>
          </svg> */}
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
  




export default Header;


