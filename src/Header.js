import React, { Component } from 'react';
import './scss/Header.scss';
import searchIcon from './magnifying-glass.svg'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Top Rated'}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div className="header">
        <div className="logo">
          Movie<span>Locker</span>
        </div>
        <form className="search">
          <input
           type="text"
           className="search__input"
           placeholder="Search..."/>
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
         <form onSubmit={this.handleSubmit}>         
            {/* <select value={this.state.value} onChange={this.handleChange}> */}
            <select value="Top Rated" >
              <option value="In Cinema Now">In Cinema Now</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>         
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  
}

export default Header;