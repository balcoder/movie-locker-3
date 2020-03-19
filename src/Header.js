import React, { Component } from 'react';
import './scss/Header.scss';
import searchIcon from './magnifying-glass.svg'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      searchTerm: ''
    }

    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    
  }
  onChangeSelect(event) {
    this.setState({selected: event.target.value});
    this.props.handleSelect( event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSearch(this.state.searchTerm);
  }

  onSearch(event) {
    event.preventDefault();
    this.setState({searchTerm: event.target.value});
    
   
    
  }

  
  render() {
    return (
      <div className="header">
        <div className="logo"><a href="/">Movie<span>Locker</span></a>
          
        </div>
        <form
          onSubmit={this.handleSubmit}
          className="search">
          <input
           type="text"
           className="search__input"
           placeholder="Search..."
           value={this.state.searchTerm}
           onChange={this.onSearch}/>
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
         <form className="select-form" onSubmit={this.handleSubmit}>         
            <select className="select-view" value={this.state.value} onChange={this.onChangeSelect}>            
              <option value="In Cinema Now">In Cinema Now</option>
              <option value="Top Rated">Top Rated</option>             
              <option value="Upcoming">Upcoming</option>
            </select>         
        </form>
      </div>
    );
  }
  
}

export default Header;