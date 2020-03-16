import React, { Component } from 'react';
import './scss/Header.scss';
import searchIcon from './magnifying-glass.svg'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Top Rated',
      searchTerm: ''
    }

    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    
  }
  handleChangeSelect(event) {
    this.setState({selected: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
   
    
  }

  
  render() {
    return (
      <div className="header">
        <div className="logo"><a href="/">Movie<span>Locker</span></a>
          
        </div>
        <form className="search">
          <input
           type="text"
           className="search__input"
           placeholder="Search..."
           onChange={this.handleSearch}/>
          <button 
           type="submit"
           className="search__button"
           >
           <img src={searchIcon} className="search__icon"/>
           {/* <svg className="search__icon">
              <use href="magnifying-glass"></use>
           </svg> */}
           </button>
        </form>
         <form className="select-view" onSubmit={this.handleSubmit}>         
            <select value={this.state.value} onChange={this.handleChangeSelect}>            
              <option value="In Cinema Now">In Cinema Now</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>         
        </form>
      </div>
    );
  }
  
}

export default Header;